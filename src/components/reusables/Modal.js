import React, { Fragment } from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            title: this.props.title !== undefined ? this.props.title : '',
            data: this.props.data,
            selected: undefined,
            modalType: this.props.modalType,
            isModalActive: false
        }
    }

    componentWillReceiveProps() {
        if (this.props.data !== undefined) {
            let data = [];

            this.props.data["data"].forEach(d => {
                let data2 = {
                    CODIGO: d["CODIGO"],
                    DESCRIPCION: d["DESCRIPCION"]
                };

                data.push(data2);
            })

            this.setState({
                title: this.props.data["title"],
                data,
                loading: false,
                modalType: this.props.modalType
            })
        } else if(this.props.modalType !== undefined){
            let isModalActive = this.props.modalType === 'modal' || this.state.isModalActive ? true : false;

            this.setState({
                modalType: this.props.modalType,
                loading: false,
                isModalActive
            })
        }
    }

    matchcodeTable() {
        return (
            <Fragment>
                <div className="w-100 p-2">
                    <h5 className="h5">{this.state.title}</h5>
                    <hr />
                </div>
                <input className="form-control" placeholder="Buscar..." onChange={(e) => this.searchCode(e.target)} />
                <div className="overflow-auto my-2" style={{ maxHeight: "230px" }}>
                    <table className={"table table-bordered table-hover table-sm"}>
                        <thead className="thead-light">
                            <tr>
                                <th className="sticky-top" style={{ width: "38px", top: "-1px" }}></th>
                                <th className="sticky-top" style={{ top: "-1px" }}>Código</th>
                                <th className="sticky-top" style={{ top: "-1px" }}>Descripción</th>
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
                                                    return (<td key={ind} className={this.state.selected === i ? "bg-secondary text-white" : ""}>{e[f]}</td>)
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between">
                    <input type="button" className="btn btn-success mx-2" value="Confirmar" aria-label="Confirm" onClick={(event) => { this.sendCode(event) }} />
                    <input type="button" className="btn btn-danger mx-2" value="Cancelar" data-dismiss="modal" aria-label="Close" onClick={(e) => { this.cleanMatchcodeTable(e) }} />
                </div>
            </Fragment>
        )
    }

    sendCode(event) {
        if (this.state.selected !== undefined) {
            if (event.target.dataset.dismiss !== undefined) {
                let code = event.target.parentElement.previousSibling // div
                    .children[0] // table
                    .children[1] // tbody
                    .children[this.state.selected] // selected tr
                    .children[1] // td
                    .innerText; // code

                this.props.changeLastInput(code);
                event.target.removeAttribute('data-dismiss', 'modal');
                this.cleanMatchcodeTable(event);
            } else {
                event.target.setAttribute('data-dismiss', 'modal');
                event.target.click();
            }
        } else {
            event.preventDefault();
            event.stopPropagation();
            alert('Debe seleccionar un registro.');
        }
    }

    cleanMatchcodeTable(e) {
        e.target.parentElement.parentElement.children[1].value = '';
        this.searchCode(e.target.parentElement.parentElement.children[1]);
        this.setState({ selected: undefined });
    }

    searchCode(event) {
        var input, filter, table, tr, td, td2, i, txtValue, txtValue2;
        input = event;
        filter = input.value.toUpperCase();
        table = input.nextSibling.children[0]; // table
        tr = table.children[1].getElementsByTagName("tr"); // tbody tr
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td2 = tr[i].getElementsByTagName("td")[2];
            if (td || td2) {
                txtValue = td.textContent || td.innerText;
                txtValue2 = td2.textContent || td2.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    content() {
        return (
            <Fragment>
                {
                    this.state.modalType === "modal" ? this.props.children : this.matchcodeTable()
                }
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <div className="modal fade" id="modal" tabIndex="-1" role="dialog">
                    <div className={"modal-dialog modal-dialog-centered" + (this.state.modalType === "modal" ? " modal-lg" : "")} role="document">

                        {/* <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> }
                        </div> */}

                        {
                            this.state.loading ? (
                                <div className={this.state.loading ? "w-100 h-100 d-flex justify-content-center align-items-center" : "w-0 h-0"}>
                                    <img style={{ width: "300px", height: "160px" }} src={"https://i.pinimg.com/originals/46/18/55/461855b29ae2060f319f225529145f7c.gif"} alt="loading" />
                                </div>
                            ) : (
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            {
                                                this.content()
                                            }
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Modal;