import React, { Fragment } from 'react';

import { SERVER } from '../../../../../config/config';
import JSON_STRUCTURE from './Sociedad.json';

import Field from '../../../../reusables/Field';
import Article from '../../../../reusables/Article';
import DropDown from '../../../../reusables/DropDown';
import SubTitle from '../../../../reusables/SubTitle';
import Modal from '../../../../reusables/Modal';
import Table from '../../../../reusables/Table';

const axios = require('axios');

class Sociedad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selected: undefined,
            JSON_DATA: JSON_STRUCTURE,
            VALIDATION: [],
            data: []
        }
    }

    async componentDidMount() {
        let res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/mm/listSOFI`)
            .catch((err) => {
                console.log(err);
                return;
            });

        if (res) {
            let data = res.data;

            this.setState({
                data
            }, () => { this.forceUpdate() })
        } else {
            alert('Error de conexión con el servidor.');
            return;
        }


        /* ===== VALIDATION ===== */
        let tables = Object.keys(this.state.JSON_DATA);
        tables = tables.map(e => { if (e.includes('GETB')) return e.substr(-12) });
        tables = tables.filter(x => x !== undefined);
        tables = [...new Set(tables)];

        let lstgetb = "";

        tables.forEach((e, i) => {
            lstgetb += e;
            if (i !== tables.length - 1) {
                lstgetb += ',';
            }
        })

        res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/sys/listCAMP?lstgetb=${lstgetb}`)
            .catch((err) => {
                console.log(err);
                return;
            });

        if (res) {
            let data = res.data;

            if (data.V_TYPE_MESSAGE !== 'E') {
                this.setState({
                    VALIDATION: data,
                    loading: false
                },()=>{this.forceUpdate()})
            } else {
                alert('Error: ', data.MESSAGE);
                return;
            }

        } else {
            alert('Error de conexión con el servidor.');
            return;
        }
    }

    updateJSON(table, field, value, index) {
        if (typeof field == "string") {
            if (field !== "_REMOVE") {
                if (index !== undefined) {
                    let temp = this.state.JSON_DATA[table];

                    temp[index] = { ...temp[index], [field]: value };

                    this.setState({
                        JSON_DATA: {
                            ...this.state.JSON_DATA,
                            [table]: temp
                        }
                    }, () => {
                        this.forceUpdate();
                        if (this.state.lastInputFocused) {
                            this.state.lastInputFocused.blur();
                            this.state.lastInputFocused.focus();
                            this.setState({ lastInputFocused: undefined })
                        } else {
                            let f = document.activeElement;
                            f.blur(); f.focus();
                        }
                    })
                } else {
                    this.setState({
                        JSON_DATA: {
                            ...this.state.JSON_DATA,
                            [table]: {
                                ...this.state.JSON_DATA[table],
                                [field]: value
                            }
                        }
                    }, () => this.forceUpdate())
                }
            } else {
                let temp = this.state.JSON_DATA[table];
                delete temp[index];
                temp = temp.filter(x => x !== undefined);

                this.setState({
                    JSON_DATA: {
                        ...this.state.JSON_DATA,
                        [table]: temp
                    }
                }, () => this.forceUpdate())
            }
        } else {
            this.setState({
                JSON_DATA: {
                    ...this.state.JSON_DATA,
                    [table]: [...this.state.JSON_DATA[table], field]
                }
            }, () => this.forceUpdate())
        }
    }

    modalContent() {
        return (
            <Fragment>
                <Article class="d-flex flex-wrap flex-column">
                    <SubTitle title="Modificar Vista: Sociedad" />
                    <Article width="auto" class="d-flex justify-content-end">
                        <input type="button" className="btn btn-info btn-sm mx-2" data-backdrop="static" data-keyboard="false" data-toggle={this.state.selected !== undefined ? "" : "modal"} data-target="#modal2" value="Crear" onClick={() => { }} />
                        <input type="button" className="btn btn-info btn-sm mx-2" data-toggle={this.state.selected !== undefined ? "modal" : ""} value="Actualizar" />
                        <input type="button" className="btn btn-info btn-sm mx-2" data-toggle={this.state.selected !== undefined ? "modal" : ""} value="Detalle" />
                    </Article>
                    <Article width="100%">
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_BUKRS")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_BUKRS"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_BUTXT")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_BUTXT"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                    </Article>
                </Article>
            </Fragment>
        )
    }

    content() {
        return (
            <Fragment>
                <div className={"h-100 flex-column px-3 " + (this.state.loading ? 'd-none' : 'd-flex')}>
                    <Article class="d-flex flex-wrap p-3 justify-content-between align-items-center">
                        <h4 className="h4 text-muted font-weight-normal m-0">Sociedad</h4>
                        <Article width="auto" class="d-flex justify-content-start">
                            <input type="button" className={"showModal btn btn-sm mx-2 " + (this.state.selected !== undefined ? "btn-secondary disabled" : "btn-info")} data-backdrop="static" data-keyboard="false" data-toggle={this.state.selected !== undefined ? "" : "modal"} data-target="#modal2" value="Crear" onClick={() => { }} />
                            <input type="button" className={"btn btn-sm mx-2 " + (this.state.selected !== undefined ? "btn-info" : "btn-secondary disabled")} data-toggle={this.state.selected !== undefined ? "modal" : ""} value="Actualizar" />
                            <input type="button" className={"btn btn-sm mx-2 " + (this.state.selected !== undefined ? "btn-info" : "btn-secondary disabled")} data-toggle={this.state.selected !== undefined ? "modal" : ""} value="Detalle" />
                        </Article>
                    </Article>

                    <Table readonly
                        name="LST_GETB_MM_SOFI"
                        data={this.state.data}
                        selected={(s) => { this.setState({ selected: s }) }}
                        options={[
                            {
                                header: 'Sociedad',
                                class: 'GECL_SOFI_BUKRS'
                            }, {
                                header: 'Nombre',
                                class: 'GECL_SOFI_BUTXT'
                            }
                        ]} />
                </div>

                <Modal modalType="modal" data={undefined} changeLastInput={(e) => { this.setSelectedModalValue(e) }}>
                    {this.modalContent()}
                </Modal>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loading &&
                    (<div style={{ height: "100%" }} className="loading w-100 d-flex justify-content-center align-items-center position-fixed bg-white">
                        <img style={{ width: "300px", height: "160px" }} src={"https://i.pinimg.com/originals/46/18/55/461855b29ae2060f319f225529145f7c.gif"} alt="loading" />
                    </div>)
                }
                {
                    this.content()
                }
            </Fragment>
        )
    }
}

export default Sociedad;