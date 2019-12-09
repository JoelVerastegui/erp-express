import React, { Fragment } from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readonly: this.props.readonly !== undefined ? this.props.readonly : '',
            fit: this.props.fit !== undefined ? this.props.fit : '',
            options: this.props.options,
            data: this.props.data
        }
    }

    onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        let fieldName = event.target.className;
        let fieldValue = event.target.type !== 'checkbox' ? event.target.value : event.target.checked;

        if (event.target.type === 'checkbox') {
            fieldValue = fieldValue ? 'X' : '';
        }

        fieldName = fieldName.split(' ').find(x => x.startsWith('GECL'));

        let tableName = `LST_GETB_MM_${fieldName.substr(5, 4)}`;

        let nodes = Array.prototype.slice.call(event.target.parentElement.parentElement.parentElement.children);
        let row = event.target.parentElement.parentElement;
        let fieldIndex = nodes.indexOf(row);

        if (this.props.onChange != undefined) {
            this.props.onChange(tableName, fieldName, fieldValue, fieldIndex);
            this.forceUpdate();
        }
    }

    componentDidMount() {
        this.sortData(this.state.data);
    }

    componentWillReceiveProps() {
        this.sortData(this.props.data);
    }

    sortData(messyData) {
        let data = [];

        messyData.forEach(d => {
            let data2 = {};
            this.state.options.forEach(o => {
                data2 = { ...data2, [o["class"]]: d[o["class"]] }
            })
            data.push(data2);
        })

        this.setState({
            data
        })
    }

    editableTable() {
        return (
            <table className="table table-bordered" style={this.state.fit !== '' ? { width: "auto" } : {}}>
                <thead className="thead-light">
                    <tr>
                        {
                            this.state.options.map((e, i) => {
                                if (e.header !== undefined) return (<th key={i}>{e.header}</th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map((e, i) => {
                            return (
                                <tr key={i}>
                                    {
                                        Object.keys(e).map((f, ind) => {
                                            return (<td className="p-0" key={ind}>
                                                <input className={f + " form-control"}
                                                    type={this.state.options[ind]["type"] !== undefined ? this.state.options[ind]["type"] : 'text'}
                                                    value={this.state.data[i][f]}
                                                    style={this.state.options[ind]["header"] === undefined ? { display: "none" } : {}}
                                                    data-pk={this.state.options[ind]["pk"] !== undefined ? this.state.options[ind]["pk"] ? true : false : ''}
                                                    disabled={this.state.options[ind]["disabled"] !== undefined ? this.state.options[ind]["disabled"] ? true : false : false}
                                                    onChange={(x) => this.onFieldChange(x)} />
                                            </td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    readonlyTable() {
        return (
            <table className="table table-bordered table-hover" style={this.state.fit !== '' ? { width: "auto" } : {}}>
                <thead className="thead-light">
                    <tr>
                        {
                            this.state.options.map((e, i) => {
                                if (e.header !== undefined) return (<th key={i}>{e.header}</th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map((e, i) => {
                            return (
                                <tr key={i}>
                                    {
                                        Object.keys(e).map((f, ind) => {
                                            return (<td key={ind}
                                                style={this.state.options[ind]["header"] === undefined ? { display: "none" } : {}}>
                                                {e[f]}
                                            </td>)
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.readonly !== '' ? this.readonlyTable() : this.editableTable()
                }
            </Fragment>
        )
    }
}

export default Table;