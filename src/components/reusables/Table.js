import React, { Fragment } from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readonly: this.props.readonly !== undefined ? this.props.readonly : '',
            fit: this.props.fit !== undefined ? this.props.fit : '',
            options: this.props.options,
            data: this.props.data,
            originData: []
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
        }
    }

    componentWillMount() {
        let data = this.state.data;

        this.setState({
            originData: data
        })
        // El componente originData no debe actualizarse :v
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
                                                    disabled={this.state.options[ind]["pk"] !== undefined
                                                        ? (this.state.options[ind]["pk"]
                                                            ? ((this.state.data[i][f] !== '' ? (this.state.originData[i] !== undefined ? (this.state.data[i][f] === this.state.originData[i][f] ? true : false) : i !== this.state.data.length - 1) : false)
                                                                ? true
                                                                : false)
                                                            : (this.state.options[ind]["disabled"] !== undefined
                                                                ? (this.state.options[ind]["disabled"]
                                                                    ? true
                                                                    : false)
                                                                : false))
                                                        : (this.state.options[ind]["disabled"] !== undefined
                                                            ? (this.state.options[ind]["disabled"] ? true : false)
                                                            : false)
                                                    }
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

    validation() {
        let keys = this.state.options.map((f) => {
            if (f["pk"] !== undefined && f["pk"] === true) {
                return f["class"];
            }
        })

        keys = keys.filter(x => x !== undefined);

        let lastRow = this.state.data[this.state.data.length - 1];

        if (keys.length) {
            let equals = 0;

            let lastRowKeys = keys.map(x => { return (lastRow[x] + "").trim() });

            this.state.data.map((e, i) => {
                if (i !== this.state.data.length - 1) {
                    let currentRowKeys = keys.map(x => { return (e[x] + "").trim() });

                    if (JSON.stringify(lastRowKeys) == JSON.stringify(currentRowKeys)) {
                        equals++;
                    }
                }
            })

            if (equals) {
                alert('Los valores claves ingresados no deben repetirse');
                return false;
            } else {
                return true;
            }
        }
    }

    appendRow() {
        if (this.validation()) {
            let data = {};

            this.state.options.forEach((f) => {
                if (f["class"].startsWith('GECL')) {
                    data[f["class"]] = ''
                }
            })

            data["IND_TRANSC"] = 'I';

            let tableName = Object.keys(data).find(x => x.startsWith('GECL')).substr(5, 4);

            tableName = `LST_GETB_MM_${tableName}`;

            this.props.onChange(tableName, data);
        }
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.readonly !== '' ? this.readonlyTable() : this.editableTable()
                }
                <div className="d-flex">
                    <input type="button" className="btn btn-success mx-1" value="Agregar" onClick={(e) => { this.appendRow(e) }} />
                    <input type="button" className="btn btn-danger mx-1" value="Eliminar" />
                </div>
            </Fragment>
        )
    }
}

export default Table;