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
            modalTab: 0,
            modalType: "",
            selectedMatchcode: undefined,
            JSON_DATA: JSON_STRUCTURE,
            MATCHCODE: [],
            customDropDown: [
                [
                    {
                        CODIGO: 'Sr',
                        DESCRIPCION: 'Sr.'
                    },
                    {
                        CODIGO: 'Sra',
                        DESCRIPCION: 'Sra.'
                    },
                    {
                        CODIGO: 'Empr',
                        DESCRIPCION: 'Empresa'
                    },
                ]
            ],
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
                }, () => { this.forceUpdate() });

                await this.loadMatchcodes(['IDIO', 'TCOM', 'PAIS', 'UHOR', 'MONE']);
            } else {
                alert('Error: ', data.MESSAGE);
                return;
            }

        } else {
            alert('Error de conexión con el servidor.');
            return;
        }
    }

    loadMatchcodes(MC) {
        return new Promise(async (resolve, reject) => {
            let MATCHCODE = [];

            for (let i = 0; i < MC.length; i++) {
                let data = {
                    GROUP_MANDT: "100",
                    GROUP_MC: `GETB_MM_${MC[i]}`,
                    GROUP_CBO: []
                }

                let res = await axios.post(`http://${SERVER.IP}:${SERVER.PORT}/api/mm/findMC`, data)
                    .catch((err) => {
                        console.log(err);
                        return;
                    });

                if (res) {
                    data = res.data;

                    if (data.V_TYPE_MESSAGE !== 'E') {
                        MATCHCODE = [...MATCHCODE, ...data["VSC_DATA"]];
                    } else {
                        alert('Error: ', data.MESSAGE);
                        reject();
                    }

                } else {
                    alert('Error de conexión con el servidor.');
                    reject();
                }
            }

            this.setState({
                MATCHCODE: [...this.state.MATCHCODE, ...MATCHCODE],
                loading: false
            }, () => { this.forceUpdate() });

            // window.dispatchEvent(new CustomEvent('loadingScreen', { loading: false }));

            resolve();
        })

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

    setSelectedModalValue(e) {
        let field = this.state.lastInputFocused.className.split(' ').find(x => x.startsWith('GECL'));

        let table = this.state.tableIndex !== undefined ? `LST_GETB_MM_${field.substr(5, 4)}` : `GETB_MM_${field.substr(5, 4)}`;

        let value = e;

        if (this.state.tableIndex !== undefined) {
            if (this.state.isModalActive) {
                this.state.lastInputFocused.value = value;
            } else {
                this.updateJSON(table, field, value, this.state.tableIndex);
                this.setState({ tableIndex: undefined });
            }
        } else {
            this.updateJSON(table, field, value);
        }

        // if (this.state.isModalActive) {
        //     window.dispatchEvent(new Event('mcChangeEvent'));
        // }
    }

    renderMatchCode(lastInput, mcClass, index = undefined) {
        if (mcClass) {
            let data = this.state.MATCHCODE.find(x => x.TABLA.substr(6, 4) === mcClass.substr(5, 4));

            if (data !== undefined) {
                let title = data["TITULO"];
                let GETB = Object.keys(data).find(x => x.startsWith('GETB'));
                data = data[GETB];

                this.setState({
                    lastInputFocused: lastInput,
                    selectedMatchcode: {
                        title,
                        data
                    },
                    tableIndex: index,
                    modalType: "matchcode"
                }, () => { this.forceUpdate() })
            }
        }
    }

    modalContent() {
        return (
            <Fragment>
                {/* Modal Tab 0 */}
                <Article class={(this.state.modalTab === 0 ? 'd-flex' : 'd-none') + " flex-wrap flex-column"}>
                    <SubTitle title="Modificar Vista: Sociedad" />
                    <Article width="auto" class="d-flex justify-content-start">
                        <input type="button" className="btn btn-info btn-sm mx-2" data-backdrop="static" data-keyboard="false" data-toggle={this.state.selected !== undefined ? "" : "modal"} data-target="#modal2" value="Grabar" onClick={() => { }} />
                        <input type="button" className="btn btn-info btn-sm mx-2" value="Cancelar" />
                        <input type="button" className="btn btn-info btn-sm mx-2" value="Dirección" onClick={() => { this.setState({ modalTab: 1 }, () => { this.forceUpdate() }) }} />
                    </Article>
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_BUKRS")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_BUKRS"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_BUTXT")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_BUTXT"]} onChange={this.updateJSON.bind(this)} />
                    </Article>

                    <SubTitle title="Otros datos" />
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_ORT01")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_ORT01"]} onChange={this.updateJSON.bind(this)} disabled />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_LAND1")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_LAND1"]} onChange={this.updateJSON.bind(this)} disabled />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_WAERS")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_WAERS"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_MONE_WAERS" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_SOFI_SPRAS")} value={this.state.JSON_DATA["GETB_MM_SOFI"]["GECL_SOFI_SPRAS"]} onChange={this.updateJSON.bind(this)} disabled />
                    </Article>
                </Article>


                {/* Modal Tab 1 */}
                <Article class={(this.state.modalTab === 1 ? 'd-flex' : 'd-none') + " flex-wrap flex-column"}>
                    <SubTitle title="Modificar Vista: Sociedad" />
                    <Article width="auto" class="d-flex justify-content-start">
                        <input type="button" className="btn btn-info btn-sm mx-2" value="Volver" onClick={() => { this.setState({ modalTab: 0 }, () => { this.forceUpdate() }) }} />
                    </Article>
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Article class="mt-2">
                            <DropDown width="100%" data={this.state.customDropDown[0]} class="GECL_CEDI_TITLE" onChange={this.updateJSON.bind(this)} />
                        </Article>
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_NAME1")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_NAME1"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_NAME2")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_NAME2"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_NAME3")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_NAME3"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_NAME4")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_NAME4"]} onChange={this.updateJSON.bind(this)} />
                    </Article>

                    <SubTitle title="Conceptos búsqueda" />
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_SORT1")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_SORT1"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_SORT2")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_SORT2"]} onChange={this.updateJSON.bind(this)} />
                    </Article>

                    <SubTitle title="Dirección" />
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_STREET")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_STREET"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_STREETCODE")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_STREETCODE"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_POST_CODE1")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_POST_CODE1"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_CITY1")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_CITY1"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_COUNTRY")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_COUNTRY"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_PAIS_LAND1" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }}
                            onEnter={(event) => {
                                const target = event.target;
                                const MC_MM_PAIS = this.state.MATCHCODE.find(x => x.TABLA === 'MC_MM_PAIS');

                                if (MC_MM_PAIS && target) {
                                    const reg = MC_MM_PAIS["GETB_MM_PAIS"].find(x => x.CODIGO.trim() === target.value.trim());

                                    if(reg !== undefined){
                                        event.target.disabled = true;
                                        event.target.parentElement.querySelector('.MC').disabled = true;
    
                                        document.getElementsByClassName('GECL_CEDI_REGION')[0].focus();
                                        document.getElementsByClassName('GECL_CEDI_REGION')[0].disabled = false;
                                        document.getElementsByClassName('GECL_CEDI_REGION')[0].parentElement.querySelector('.MC').disabled = false;

                                        this.setState({loading:true});
                                        this.loadMatchcodes(['REGI']);
                                    } else{
                                        window.dispatchEvent(new CustomEvent('showMessage', { detail: {message:'El código de país ingresado es inválido.',type:'danger'} }));                                        
                                    }
                                }
                            }} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_REGION")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_REGION"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_REGI_BLAND" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} disabled />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_TIME_ZONE")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_TIME_ZONE"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UHOR_TZONE" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                    </Article>

                    <SubTitle title="Apartado correos" />
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_PO_BOX")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_PO_BOX"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_POST_CODE2")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_POST_CODE2"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_POST_CODE3")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_POST_CODE3"]} onChange={this.updateJSON.bind(this)} />
                    </Article>

                    <SubTitle title="Comunicación" />
                    <Article width="100%" class="d-flex flex-wrap flex-column">
                        <Article class="mt-2">
                            <DropDown width="100%" class="GECL_CEDI_LANGU" name="GECL_IDIO_SPRAS" onChange={this.updateJSON.bind(this)} />
                        </Article>
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_TEL_NUMBER")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_TEL_NUMBER"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_TEL_EXTENS")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_TEL_EXTENS"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_FAX_NUMBER")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_FAX_NUMBER"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_FAX_EXTENS")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_FAX_EXTENS"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CECE_SMTP_ADDR")} value={this.state.JSON_DATA["GETB_MM_CECE"]["GECL_CECE_SMTP_ADDR"]} onChange={this.updateJSON.bind(this)} />
                        <Article class="mt-2">
                            <DropDown width="100%" class="GECL_CEDI_DEFLT_COMM" name="GECL_TCOM_COMM_TYPE" onChange={this.updateJSON.bind(this)} />
                        </Article>
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_EXTENSION1")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_EXTENSION1"]} onChange={this.updateJSON.bind(this)} />
                        <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CEDI_EXTENSION2")} value={this.state.JSON_DATA["GETB_MM_CEDI"]["GECL_CEDI_EXTENSION2"]} onChange={this.updateJSON.bind(this)} />
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

                <Modal modalType={this.state.modalType} data={this.state.selectedMatchcode} changeLastInput={(e) => { this.setSelectedModalValue(e) }}>
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
                    (<div style={{ height: "100%", zIndex:'1060', top:'0' }} className="loading w-100 d-flex justify-content-center align-items-center position-fixed bg-white">
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