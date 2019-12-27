import React, { Fragment } from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title !== undefined ? this.props.title : '',
            name: this.props.name !== undefined ? this.props.name : '',
            actions: this.props.actions !== undefined ? this.props.actions : '',
            readonly: this.props.readonly !== undefined ? this.props.readonly : '',
            validation: this.props.validation !== undefined ? this.props.validation : [],
            fit: this.props.fit !== undefined ? this.props.fit : '',
            options: this.props.options,
            selected: undefined,
            data: undefined,
            mcActive: undefined,
            lastFocusInput: undefined,
            originData: []
        }


        // listener events
        window.addEventListener('mcChangeEvent', () => {
            let data = this.state.data;
            let trArr = [...document.getElementById('modal2').querySelector('table').querySelectorAll('tbody tr')];

            trArr.forEach((e, i) => {
                const eleArr = [...e.querySelectorAll('[class*=GECL]')];
                eleArr.forEach((f) => {
                    if (!f.className.includes('MC')) {
                        let className = f.className.split(' ').find(x => x.startsWith('GECL'));
                        let value = f.value;
                        data[i] = { ...data[i], [className]: value }
                    }
                })
            })

            if (JSON.stringify(data) !== JSON.stringify(this.state.data)) {
                this.setState({ data }, () => { this.forceUpdate() });
            }
        })

        window.addEventListener('closeModal', () => {
            if (this.validation()) {
                if (document.getElementsByClassName('closeModal')[0].dataset.dismiss === undefined) {
                    this.props.saveData(this.state.name, this.state.data);
                    document.getElementsByClassName('closeModal')[0].setAttribute('data-dismiss', 'modal');
                    document.getElementsByClassName('closeModal')[0].click();
                } else {
                    document.getElementsByClassName('closeModal')[0].removeAttribute('data-dismiss', 'modal');
                }
            }
        })
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

        let nodes = Array.prototype.slice.call(event.target.parentElement.parentElement.parentElement.parentElement.children);
        let row = event.target.parentElement.parentElement.parentElement;
        let fieldIndex = nodes.indexOf(row);

        if (document.getElementById('modal2').style.display === 'none') {
            if (this.props.onChange !== undefined) {
                this.props.onChange(tableName, fieldName, fieldValue, fieldIndex);
            }
        } else {
            let data = this.state.data;
            data[fieldIndex] = { ...data[fieldIndex], [fieldName]: fieldValue }
            this.setState({ data }, () => { this.forceUpdate() })
        }
    }

    componentWillMount() {
        this.setState({
            data: this.props.data
        })

        let data = this.props.data;

        let keys = this.state.options.map((f) => {
            if (f["pk"] !== undefined && f["pk"] === true) {
                return f["class"];
            }
        })

        keys = keys.filter(x => x !== undefined);

        if (keys.length) {
            let equals = 0;

            this.props.data.map((e, i) => {
                keys.forEach(x => {
                    if ((e[x] + "").trim() == '' && !i) {
                        equals++;
                    }
                })
            })

            if (!equals) {
                this.setState({
                    originData: data
                })
            }
        } else {
            this.setState({
                originData: data
            })
        }
        // El componente originData no debe actualizarse :v
    }

    componentDidMount() {
        this.sortData(this.state.data);
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps() {
    }

    sortData(messyData) {
        let data = [];

        messyData.forEach(d => {
            let data2 = {};
            this.state.options.forEach(o => {
                if (!o["description"]) {
                    data2 = { ...data2, [o["class"]]: d[o["class"]] }
                }
            })
            data.push(data2);
        })

        if (JSON.stringify(data) !== JSON.stringify(this.state.data)) {
            this.setState({
                data
            }, () => { this.forceUpdate() })
        }
    }

    objectsAreSame(a, b) {
        var objectsAreSame = true;
        if (a.length === b.length) {
            a.forEach((x, i) => {
                if (objectsAreSame) {
                    Object.keys(x).forEach(y => {
                        if (a[i][y] !== b[i][y]) {
                            objectsAreSame = false;
                            return objectsAreSame;
                        }
                    })
                }
            })
        } else {
            objectsAreSame = false;
        }

        return objectsAreSame;
    }

    editableTable() {
        return (
            <div className="overflow-auto" style={{ maxHeight: "230px" }}>
                <table className={this.state.name + " table table-bordered table-sm"} style={this.state.fit !== '' ? { width: "auto" } : {}}>
                    <thead className="thead-light">
                        <tr>
                            <th className="sticky-top" style={{ width: "38px", top: "-1px" }}></th>
                            {
                                this.state.options.map((e, i) => {
                                    if (e.header !== undefined && !e.description) return (
                                        <Fragment>
                                            <th key={i} className="sticky-top" style={{ top: "-1px" }}>{e.header}</th>
                                            {
                                                this.state.options.filter(x => x.description !== undefined).find(y => y.position === i)
                                                    ? <th key={i + 100} className="sticky-top" style={{ top: "-1px" }}>{
                                                        this.state.options.filter(x => x.description !== undefined).find(y => y.position === i)["header"]
                                                    }</th>
                                                    : ''
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="p-0"><input type="button" className="btn btn-secondary w-100" onClick={() => { this.state.selected === i ? this.setState({ selected: undefined }) : this.setState({ selected: i }) }} /></td>
                                        {
                                            Object.keys(e).map((f, ind) => {
                                                return (
                                                    <Fragment>
                                                        <td key={ind} className={(this.state.options[ind]["header"] === undefined ? "d-none " : "") + "p-0" + (this.state.options[ind]["type"] !== undefined ? (this.state.selected === i && this.state.options[ind]["type"] === 'checkbox' ? " bg-secondary text-white" : "") : "")} style={this.state.options[ind]["type"] === 'checkbox' ? { display: "flex", justifyContent: "center", alignItems: "center" } : {}} key={ind}>
                                                            <div className="d-flex">
                                                                <input className={f + " form-control " + (this.state.selected === i ? "bg-secondary text-white" : "")}
                                                                    type={this.state.options[ind]["type"] !== undefined ? this.state.options[ind]["type"] : 'text'}
                                                                    value={this.state.data[i][f]}
                                                                    checked={this.state.data[i][f] === 'X' ? true : false}
                                                                    style={this.state.options[ind]["header"] === undefined ? ({ display: "none" }) : (this.state.options[ind]["type"] !== undefined ? (this.state.options[ind]["type"] === 'checkbox' ? { width: "25px", height: "36px" } : {}) : {})}
                                                                    data-pk={this.state.options[ind]["pk"] !== undefined ? this.state.options[ind]["pk"] ? true : false : ''}
                                                                    disabled={this.state.options[ind]["pk"] !== undefined
                                                                        ? (this.state.options[ind]["pk"]
                                                                            ? ((this.state.data[i][f] !== '' ? (this.state.originData[i] !== undefined ? (this.state.data[i][f] === this.state.originData[i][f] ? true : false) : (i !== this.state.data.length - 1)) : false)
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
                                                                    placeholder={this.state.options[ind]["pk"] !== undefined ? "Campo clave" : ""}
                                                                    maxLength={this.state.validation.find(x => x.GECL_CAMP_NAME === f) !== undefined
                                                                        ? this.state.validation.find(x => x.GECL_CAMP_NAME === f)["GECL_DOMI_LENG"]
                                                                        : ""}
                                                                    onChange={(x) => this.onFieldChange(x)}
                                                                    onFocus={(e) => { !e.target.disabled && this.state.options[ind]["matchcode"] !== undefined ? this.setState({ mcActive: { row: i, col: ind } }) : this.setState({ mcActive: undefined }) }} />

                                                                {
                                                                    this.state.options[ind]["matchcode"] !== undefined && 
                                                                    (<input type="button"
                                                                        className={this.state.options[ind]["matchcode"] + " MC btn btn-outline-secondary"}
                                                                        value="MC"
                                                                        style={(this.state.mcActive !== undefined ? (this.state.mcActive["row"] === i && this.state.mcActive["col"] === ind ? true : false) : false) ? {} : {display:"none"}}
                                                                        onClick={(e) => {
                                                                            this.props.changeFocus(e.target.previousSibling, e.target.className.split(' ').find(x => x.startsWith('GECL')), i);
                                                                            this.setState({ lastFocusInput: e.target.previousSibling });
                                                                            document.getElementById('modal2').style.display = "none";
                                                                            // document.getElementById('modal').classList.add('show');
                                                                        }}
                                                                        data-backdrop="static"
                                                                        data-keyboard="false"
                                                                        data-toggle="modal"
                                                                        data-target="#modal"
                                                                    // data-dismiss="modal"
                                                                    />)
                                                                }

                                                            </div>
                                                        </td>
                                                        {
                                                            this.state.options.filter(x => x.description !== undefined).find(y => y.position === ind)
                                                                ? this.descriptionColumn(i, ind, this.state.options.filter(x => x.description !== undefined).find(y => y.position === ind))
                                                                : ''
                                                        }
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    descriptionColumn(i, ind, e) {
        return (
            <td className="p-0" key={ind + 100}>
                <div className="d-flex">
                    <input className={"form-control " + (this.state.selected === i ? "bg-secondary text-white" : "")}
                        value={e["description"].find(z => z.CODIGO === this.state.data[i][e["class"]])
                            ? e["description"].find(z => z.CODIGO === this.state.data[i][e["class"]])["DESCRIPCION"]
                            : ''}
                        disabled />
                </div>
            </td>
        )
    }

    readonlyTable() {
        return (
            <div className="overflow-auto" style={{ maxHeight: "230px" }}>
                <table className={"table table-bordered table-hover table-sm"} style={this.state.fit !== '' ? { width: "auto" } : {}}>
                    <thead className="thead-light">
                        <tr>
                            <th className="sticky-top" style={{ width: "38px", top: "-1px" }}></th>
                            {
                                this.state.options.map((e, i) => {
                                    if (e.header !== undefined) return (<th key={i} className="sticky-top" style={{ top: "-1px" }}>{e.header}</th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="p-0"><input type="button" className="btn btn-secondary w-100" onClick={() => { this.state.selected === i ? this.setState({ selected: undefined }) : this.setState({ selected: i }) }} /></td>
                                        {
                                            Object.keys(e).map((f, ind) => {
                                                return (<td key={ind}
                                                    className={(this.state.options[ind]["type"] !== undefined
                                                        ? (this.state.options[ind]["type"] === 'checkbox'
                                                            ? "p-0"
                                                            : "")
                                                        : "") + (this.state.selected === i ? " bg-secondary text-white" : "")}
                                                    style={this.state.options[ind]["header"] === undefined
                                                        ? { display: "none" }
                                                        : (this.state.options[ind]["type"] !== undefined
                                                            ? (this.state.options[ind]["type"] === 'checkbox'
                                                                ? { display: "flex", justifyContent: "center", alignItems: "center" }
                                                                : {})
                                                            : {})}>
                                                    {this.state.options[ind]["type"] !== undefined
                                                        ? (this.state.options[ind]["type"] === 'checkbox'
                                                            ? (<input type="checkbox" style={{ width: "25px", height: "36px" }} checked={this.state.data[i][f] === 'X' ? true : false} disabled />)
                                                            : e[f])
                                                        : e[f]
                                                    }
                                                </td>)
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
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
            let nullValues = 0;

            let lastRowKeys = keys.map(x => { return (lastRow[x] + "").trim() });

            this.state.data.forEach((e, i) => {
                if (i !== this.state.data.length - 1) {
                    if (e["IND_TRANSC"] !== 'D') {
                        let currentRowKeys = keys.map(x => { return (e[x] + "").trim() });

                        if (JSON.stringify(lastRowKeys) == JSON.stringify(currentRowKeys)) {
                            equals++;
                        }
                    }
                } else {
                    if (!lastRowKeys.find(x => x !== '')) {
                        nullValues++;
                    }
                }
            })

            if (nullValues) {
                alert('Los campos claves ingresados no deben estar vacíos.');
                // let trCollection = document.getElementById('addButton')
                //     .parentNode // div
                //     .previousSibling // table
                //     .children[1] // tbody
                //     .lastChild // last tr
                //     .children; // html collection

                // let commonArray = [];
                // commonArray = [...trCollection];

                // let lastPKCells = commonArray.filter(x => x.children[0].dataset.pk !== undefined && x.children[0].dataset.pk !== '');

                // if(lastPKCells.length){

                // }

                return false;
            }

            if (equals) {
                alert('Los valores claves ingresados no deben repetirse');
                return false;
            } else {
                return true;
            }
        }
    }

    appendRow(e) {
        if (this.validation(e)) {
            let data = {};

            this.state.options.forEach((f) => {
                if (f["class"].startsWith('GECL') && !f["description"]) {
                    data[f["class"]] = ''
                }
            })

            data["IND_TRANSC"] = 'I';

            if (document.getElementById('modal2').style.display === 'none') {
                let tableName = Object.keys(data).find(x => x.startsWith('GECL')).substr(5, 4);

                tableName = `LST_GETB_MM_${tableName}`;

                this.props.onChange(tableName, data);
            } else {
                this.setState({ data: [...this.state.data, data] });
            }
        }
    }

    removeRow(e) {
        let trElements = document.getElementsByClassName(this.state.name)[0]
            .children[1] // tbody
            .children;

        let rows = [...trElements];

        if (rows.filter(x => x.style.display !== "none").length === 1) {
            return;
        }

        if (this.state.selected !== undefined) {
            let keys = this.state.options.map((f) => {
                if (f["pk"] !== undefined && f["pk"] === true) {
                    return f["class"];
                }
            })

            keys = keys.filter(x => x !== undefined);

            if (keys.length) {
                let equals = 0;

                let selectedRow = this.state.data[this.state.selected];

                let selectedRowKeys = keys.map(x => { return (selectedRow[x] + "").trim() });

                this.state.data.forEach((e, i) => {
                    if (e["IND_TRANSC"] !== 'I') {
                        let currentRowKeys = keys.map(x => { return (e[x] + "").trim() });

                        if (JSON.stringify(selectedRowKeys) === JSON.stringify(currentRowKeys)) {
                            equals++;
                        }
                    }
                })

                if (equals) {
                    let selectedRowElement = document.getElementsByClassName(this.state.name)[0]
                        .children[1] // tbody
                        .children[this.state.selected]; // selectedRow

                    selectedRowElement.style.display = "none";

                    if (document.getElementById('modal2').style.display === 'none') {
                        this.props.onChange(this.state.name, "IND_TRANSC", "D", this.state.selected);
                    } else {
                        let data = this.state.data;
                        data[this.state.selected] = { ...data[this.state.selected], IND_TRANSC: "D" };
                        this.setState({data});
                    }

                    this.setState({
                        selected: undefined
                    })
                } else {
                    if (document.getElementById('modal2').style.display === 'none') {
                        this.props.onChange(this.state.name, "_REMOVE", "NONE", this.state.selected);
                    } else {
                        let data = this.state.data;
                        delete data[this.state.selected];
                        data = data.filter(x => x !== undefined);
                        this.setState({data});
                    }

                    this.setState({
                        selected: undefined
                    })
                }
            } else {
                if (document.getElementById('modal2').style.display === 'none') {
                    this.props.onChange(this.state.name, "_REMOVE", "NONE", this.state.selected);
                } else {
                    let data = this.state.data;
                    delete data[this.state.selected];
                    data = data.filter(x => x !== undefined);
                    this.setState({data});
                }

                this.setState({
                    selected: undefined
                })
            }
        } else {
            alert("Debe seleccionar una fila.");
        }
    }



    render() {
        return (
            <Fragment>
                {
                    this.state.readonly !== '' ? this.readonlyTable() : this.editableTable()
                }
                {
                    this.state.actions !== '' && this.state.readonly === '' &&
                    (
                        <div className="d-flex">
                            <input type="button" className="btn btn-success mx-1" value="Agregar" onClick={(e) => { this.appendRow(e) }} />
                            <input type="button" className="btn btn-danger mx-1" value="Eliminar" onClick={(e) => { this.removeRow(e) }} />
                        </div>
                    )
                }
            </Fragment>
        )
    }
}

export default Table;