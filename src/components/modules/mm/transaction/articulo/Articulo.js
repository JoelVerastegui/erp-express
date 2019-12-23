import React, { Fragment } from 'react';

import JSON_STRUCTURE from './Articulo.json';
import MC_STRUCTURE from './MC.json';

import { SERVER } from '../../../../../config/config';
import Field from '../../../../reusables/Field';
import Article from '../../../../reusables/Article';
import DropDown from '../../../../reusables/DropDown';
import SubTitle from '../../../../reusables/SubTitle';
import Modal from '../../../../reusables/Modal';
import Table from '../../../../reusables/Table';

const axios = require('axios');

class Articulo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isMobile: 650,
            isTablet: 700,
            section: 1,
            tab: 1,
            tabTitle: 'Datos generales',
            modalTab: 1,
            modalTabTitle: 'Unidades de medida',
            lastInputFocused: undefined,
            JSON_DATA: JSON_STRUCTURE,
            VALIDATION: [{
                GECL_ELDA_SHLPNAME: "UMB",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 16,
                GECL_CAMP_NAME: "GECL_ARTI_MEINS"
            },
            {
                GECL_ELDA_SHLPNAME: "Grp. Artículo",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_MATKL"
            },
            {
                GECL_ELDA_SHLPNAME: "Suj. Lote",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 1,
                GECL_CAMP_NAME: "GECL_ARTI_XCHPF"
            },
            {
                GECL_ELDA_SHLPNAME: "N°Artí­culo antiguo",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_BISMT"
            },
            {
                GECL_ELDA_SHLPNAME: "Grupo artí­c. ext.",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_EXTWG"
            },
            {
                GECL_ELDA_SHLPNAME: "Sector",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_SPART"
            },
            {
                GECL_ELDA_SHLPNAME: "Status Artículo",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_MSTAE"
            },
            {
                GECL_ELDA_SHLPNAME: "Jquí­a.productos",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_PRDHA"
            },
            {
                GECL_ELDA_SHLPNAME: "Válido de",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_MSTDE"
            },
            {
                GECL_ELDA_SHLPNAME: "Sector",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_MTPOS_MARA"
            },
            {
                GECL_ELDA_SHLPNAME: "Grupo Autorizaciones",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_BEGRU"
            },
            {
                GECL_ELDA_SHLPNAME: "Peso Bruto",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_BRGEW"
            },
            {
                GECL_ELDA_SHLPNAME: "Unidad de peso",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_GEWEI"
            },
            {
                GECL_ELDA_SHLPNAME: "Volumen",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_VOLUM"
            },
            {
                GECL_ELDA_SHLPNAME: "Unidad de volumen",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_VOLEH"
            },
            {
                GECL_ELDA_SHLPNAME: "Peso neto",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_NTGEW"
            },
            {
                GECL_ELDA_SHLPNAME: "Tamaño/Dimens.",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_GROES"
            },
            {
                GECL_ELDA_SHLPNAME: "Código GTIN",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_EAN11"
            },
            {
                GECL_ELDA_SHLPNAME: "Tipo EAN",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 20,
                GECL_CAMP_NAME: "GECL_ARTI_NUMTP"
            },
            {
                GECL_ELDA_SHLPNAME: "Código Artículo",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 4,
                GECL_CAMP_NAME: "GECL_ARUM_MEINH"
            }],
            MATCHCODE: MC_STRUCTURE,
            modalType: "",
            selectedMatchcode: undefined,
            tableIndex: undefined,
            data: [
                {
                    "CODIGO": "c006",
                    "DESCRIPCION": "4"
                },
                {
                    "CODIGO": "c007",
                    "DESCRIPCION": "Prueba"
                },
                {
                    "CODIGO": "CTR ",
                    "DESCRIPCION": "Centro1"
                },
                {
                    "CODIGO": "CTR2",
                    "DESCRIPCION": "CENT1"
                },
                {
                    "CODIGO": "CTR3",
                    "DESCRIPCION": "Cent1"
                },
                {
                    "CODIGO": "GRE2",
                    "DESCRIPCION": "EBIM MATRIZ 2"
                },
                {
                    "CODIGO": "OML1",
                    "DESCRIPCION": "OML CENTRO 1"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                },
                {
                    "CODIGO": "RCC1",
                    "DESCRIPCION": "Centro San Isidro"
                }
            ]
        }


        window.addEventListener('click', (e) => {
            // alert(e);
        }, false)
    }

    async componentDidMount() {
        // let tables = Object.keys(this.state.JSON_DATA);
        // tables = tables.map(e => { if (e.includes('GETB')) return e.substr(-12) });
        // tables = tables.filter(x => x !== undefined);
        // tables = [...new Set(tables)];

        // let lstgetb = "";

        // tables.forEach((e, i) => {
        //     lstgetb += e;
        //     if (i !== tables.length - 1) {
        //         lstgetb += ',';
        //     }
        // })


        // /* ===== VALIDATION ===== */
        // let res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/sys/listCAMP?lstgetb=${lstgetb}`)
        //     .catch((err) => {
        //         console.log(err);
        //         return;
        //     });

        // if (res) {
        //     let data = res.data;

        //     if (data.V_TYPE_MESSAGE !== 'E') {
        //         console.log(data);
        //         this.setState({
        //             VALIDATION: data
        //         })
        //     } else {
        //         alert('Error: ', data.MESSAGE);
        //         return;
        //     }

        // } else {
        //     alert('Error de conexión con el servidor.');
        //     return;
        // }



        // /* ===== MATCHCODES ===== */
        // this.getMatchcodes();
    }

    async getMatchcodes() {
        let mcElements = [...document.getElementsByClassName('MC')];

        let mcClasses = mcElements.map(f => { return (f.className.split(' ').find(x => x.startsWith('GECL')).substr(5, 4)) });

        mcClasses = [...new Set(mcClasses)]; // Remove duplicates

        let mcState = this.state.MATCHCODE;

        if (mcState.length) {
            mcClasses = mcClasses.filter(x => mcState.find(f => f.TABLA.substr(6, 4) === x) === undefined);
        }

        if (mcClasses.length) {
            let MATCHCODE = [];

            for (let i = 0; i < mcClasses.length; i++) {
                let data = {
                    GROUP_MANDT: "100",
                    GROUP_MC: `GETB_MM_${mcClasses[i]}`,
                    GROUP_CBO: []
                }

                let res = await axios.post(`http://${SERVER.IP}:${SERVER.PORT}/api/mm/findMC`, data)
                    .catch((err) => {
                        console.log(err);
                        return;
                    });

                if (res) {
                    let data2 = res.data;

                    if (data2.V_TYPE_MESSAGE !== 'E') {
                        MATCHCODE.push(data2["VSC_DATA"]);
                    } else {
                        alert('Error: ', data2.MESSAGE);
                        return;
                    }

                } else {
                    alert('Error de conexión con el servidor.');
                    return;
                }
            }

            this.setState({
                MATCHCODE: [...this.state.MATCHCODE, MATCHCODE],
                loading: false
            });
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

    /* ===== SECTION RENDERS ===== */
    changeSection(n) {
        this.setState({
            section: n
        })
    }
    section1 = () => {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: "350px" }}>
                    <h1 className="h1 text-muted">Articulo</h1>
                    <Article class="d-flex justify-content-center p-2">
                        <Field width="100%" label="Artículo" fieldClass="input-group" class="GECL_ARTI_MATNR" matchcode="GECL_CENT_BUKRS" />
                    </Article>
                    <Article class="d-flex justify-content-center p-2">
                        <DropDown width="100%" data={this.state.data} class="GECL_MATI_MATNR" />
                    </Article>
                    <Article class="d-flex justify-content-center p-4">
                        <input type="button" className="btn btn-success" value="Crear" onClick={() => { this.changeSection(2) }} />
                    </Article>
                </div>
            </div>
        )
    }
    section2 = () => {
        return (
            <Fragment>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: "350px" }}>
                        <h1 className="h3 text-muted">Niveles de organización</h1>
                        <Article class="d-flex justify-content-center p-2">
                            <Field width="100%" label="Centro" fieldClass="input-group" class="GECL_ARCE_WERKS" matchcode="GECL_CENT_WERKS" />
                        </Article>
                        <Article class="d-flex justify-content-center p-2">
                            <Field width="100%" label="Org. Ventas" fieldClass="input-group" class="GECL_ARDV_VKORG" matchcode="GECL_ORVE_VKORG" />
                        </Article>
                        <Article class="d-flex justify-content-center p-2">
                            <Field width="100%" label="Canal de distribución" fieldClass="input-group" class="GECL_ARDV_VTWEG" matchcode="GECL_CADI_VTWEG" />
                        </Article>
                        <Article class="d-flex justify-content-between p-4">
                            <input type="button" className="btn btn-success" value="Seleccionar" onClick={() => { this.changeSection(4) }} />
                            <input type="button" className="btn btn-danger" value="Cancelar" onClick={() => { this.changeSection(1) }} />
                        </Article>
                    </div>
                </div>
            </Fragment>
        )
    }
    section3 = () => {
        return (
            <Fragment>

            </Fragment>
        )
    }
    section4 = () => {
        return (
            <div className="h-100 d-flex flex-column px-3">
                <Article class="d-flex flex-wrap p-3 justify-content-between align-items-center">
                    <h4 className="h4 text-muted font-weight-normal m-0">Articulo</h4>
                    <Article width="auto" class="d-flex justify-content-start">
                        <input type="button" className="showModal btn btn-info btn-sm mx-2" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#modal2" value="Datos Adicionales" onClick={() => { this.setState({ modalType: "modal" }, () => { this.forceUpdate() }); this.renderAditional(); }} />
                        <input type="button" className="btn btn-secondary btn-sm mx-2" value="Guardar" />
                        <input type="button" className="btn btn-secondary btn-sm mx-2" value="Retornar" />
                    </Article>
                </Article>
                <hr className="my-2" />
                <Article class="d-flex py-2">
                    <ul className="nav-tabs mb-1 d-flex" style={{ overflowX: "auto", overflowY: "hidden", listStyleType: "none" }}>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 1 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Datos Base 1" onClick={(e) => { this.changeTab(1, e) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 2 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Compras" onClick={(e) => { this.changeTab(2, e) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 3 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Organización Ventas 1" onClick={(e) => { this.changeTab(3, e) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 4 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Organización Ventas 2" onClick={(e) => { this.changeTab(4, e) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 5 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Com.ext.Importación" onClick={(e) => { this.changeTab(5, e) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 6 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Ventas:Gnral./Centro" onClick={(e) => { this.changeTab(6, e) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 7 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Contabilidad 1" onClick={(e) => { this.changeTab(7, e) }} />
                        </li>
                    </ul>
                </Article>

                <Article class="bg-primary p-1 d-flex justify-content-start align-self-center">
                    <h6 className="h6 text-white font-weight-normal m-0">{this.state.tabTitle}</h6>
                </Article>

                <Article class="border border-primary p-4 overflow-auto px-3">
                    {this.renderTab(this.state.tab)}
                </Article>
            </div>
        )
    }

    /* ===== TAB RENDERS ===== */
    changeTab(t, e) {
        this.setState({
            tab: t,
            tabTitle: e.target.value
        })
    }
    renderTab(t) {
        switch (t) {
            case 1: return (this.tab1());
            case 2: return (this.tab2());
            case 3: return (this.tab3());
            case 4: return (this.tab4());
            case 5: return (this.tab5());
            case 6: return (this.tab6());
            default: return (this.tab7());
        }
    }
    tab1 = () => {
        return (
            <Fragment>
                <Article class="d-flex flex-wrap flex-column">
                    <SubTitle title="Datos Generales" />
                    <Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MEINS")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MEINS"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_ARTI_MSEHI" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MATKL")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MATKL"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_CENT_MATKL" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BISMT")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BISMT"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_EXTWG")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_EXTWG"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_SPART")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_SPART"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_SECO_SPART" />
                        </Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MSTAE")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MSTAE"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_STMA_MMSTA" />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_PRDHA")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_PRDHA"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MSTDE")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MSTDE"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MTPOS_MARA")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MTPOS_MARA"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_TIPO_MTPOS" />
                        </Article>
                    </Article>

                    <br />

                    <SubTitle title="Grupo de Autorización material" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BEGRU")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BEGRU"]} onChange={this.updateJSON.bind(this)} />

                    <br />

                    <SubTitle title="Dimensiones/EAN" />
                    <Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BRGEW")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BRGEW"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_GEWEI")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_GEWEI"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UMED_MSEHI" />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_VOLUM")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_VOLUM"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_VOLEH")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_VOLEH"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UMED_MSEHI" />
                        </Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_NTGEW")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_NTGEW"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_GROES")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_GROES"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_EAN11")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_EAN11"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_NUMTP")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_NUMTP"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_GTIN_NUMTP" />
                        </Article>
                    </Article>
                </Article>
            </Fragment>
        )
    }
    tab2 = () => {
        return (
            <Fragment>
                <Article class="d-flex flex-wrap flex-column">
                    <Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_MATNR")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_MATNR"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_MATNR")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_WERKS"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTB_MAKTX")} value={this.state.JSON_DATA["GETB_MM_ARTB"]["GECL_ARTB_MAKTX"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_CENT_NAME1")} value={this.state.JSON_DATA["GETB_MM_CENT"]["GECL_CENT_NAME1"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                    </Article>

                    <SubTitle title="Datos Generales" />
                    <Article>
                        <Article width={window.innerWidth <= this.state.isTablet ? "100%" : "50%"} class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MEINS")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MEINS"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_ARTI_MSEHI" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_EKGRP")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_EKGRP"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_GRCO_EKGRP" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_MMSTA")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_MMSTA"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_STMA_MMSTA" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_MFRGR")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_MFRGR"]} onChange={this.updateJSON.bind(this)} />
                            <Field type="checkbox" validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_XCHPF")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_XCHPF"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BSTME")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BSTME"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                        <Article width={window.innerWidth <= this.state.isTablet ? "100%" : "50%"} class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MATKL")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MATKL"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_GRME_MATKL" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_MMSTD")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_MMSTD"]} onChange={this.updateJSON.bind(this)} />
                            <Field type="checkbox" validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_NRFHG")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_NRFHG"]} onChange={this.updateJSON.bind(this)} />
                            <Field type="checkbox" validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_KAUTB")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_KAUTB"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_TAKLV")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_TAKLV"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_CLFI_TAXKM" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                        </Article>
                    </Article>

                    <SubTitle title="Otros Datos/ Datos Fabricante" />
                    <Article>
                        <Article width={window.innerWidth <= this.state.isTablet ? "100%" : "50%"} class="d-flex flex-wrap flex-column">
                            <Field type="checkbox" validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARCE_KORDB")} value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_KORDB"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                    </Article>
                </Article>
            </Fragment>
        )
    }
    tab3 = () => {
        return (
            <Fragment>
                <Article class="d-flex flex-wrap flex-column">
                    <Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_MATNR")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_MATNR"]} onChange={this.updateJSON.bind(this)} disabled />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_VKORG")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_VKORG"]} onChange={this.updateJSON.bind(this)} disabled />
                        </Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTB_MAKTX")} value={this.state.JSON_DATA["GETB_MM_ARTB"]["GECL_ARTB_MAKTX"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_VTWEG")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_VTWEG"]} onChange={this.updateJSON.bind(this)} disabled />
                        </Article>
                    </Article>

                    <SubTitle title="Datos Generales" />
                    <Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MEINS")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MEINS"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UMED_MSEHI" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_VRKME")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_VRKME"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MSTAV")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MSTAV"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_STVE_VMSTA" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_DWERK")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_DWERK"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MATKL")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MATKL"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_GRME_MATKL" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                        </Article>
                        <Article width="50%" class="d-flex flex-wrap flex-column">
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_SPART")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_SPART"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_SECO_SPART" changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_VAVME")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_VAVME"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MSTDV")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MSTDV"]} onChange={this.updateJSON.bind(this)} />
                            <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARDV_VMSTD")} value={this.state.JSON_DATA["GETB_MM_ARDV"]["GECL_ARDV_VMSTD"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                    </Article>
                </Article>
            </Fragment>
        )
    }
    tab4 = () => {
        return (
            <h1 className="h1">Organización Ventas 2</h1>
        )
    }
    tab5 = () => {
        return (
            <h1 className="h1">Com.ext.Importación</h1>
        )
    }
    tab6 = () => {
        return (
            <h1 className="h1">Ventas:Gnral./Centro</h1>
        )
    }
    tab7 = () => {
        return (
            <h1 className="h1">Contabilidad 1</h1>
        )
    }

    setSelectedModalValue(e) {
        let field = this.state.lastInputFocused.className.split(' ').find(x => x.startsWith('GECL'));

        let table = this.state.tableIndex !== undefined ? `LST_GETB_MM_${field.substr(5, 4)}` : `GETB_MM_${field.substr(5, 4)}`;

        let value = e;

        if (this.state.tableIndex !== undefined) {
            // this.updateJSON(table, field, value, this.state.tableIndex);
            // this.setState({ tableIndex: undefined });
            this.state.lastInputFocused.value = value;
            window.dispatchEvent(new Event('mcChangeEvent'));
        } else {
            this.updateJSON(table, field, value);
        }
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

    renderAditional() {
        return (
            <Fragment>
                <Article class="d-flex flex-wrap flex-column">
                    <SubTitle title="Datos Adicionales" />

                    <Article class="d-flex py-2">
                        <ul className="nav-tabs mb-1 d-flex" style={{ overflowX: "auto", overflowY: "hidden", listStyleType: "none" }}>
                            <li className="nav-item">
                                <input type="button" className={this.state.modalTab === 1 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Unidades de medida" onClick={(e) => { this.setState({ modalTab: 1, modalTabTitle: e.target.value }, () => { this.forceUpdate() }) }} />
                            </li>
                            <li className="nav-item">
                                <input type="button" className={this.state.modalTab === 2 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="EANs adicionales" onClick={(e) => { this.setState({ modalTab: 2, modalTabTitle: e.target.value }, () => { this.forceUpdate() }) }} />
                            </li>
                        </ul>
                    </Article>

                    <Article class="bg-primary p-1 d-flex justify-content-start align-self-center">
                        <h6 className="h6 text-white font-weight-normal m-0">{this.state.modalTabTitle}</h6>
                    </Article>

                    <Article class="border border-primary p-4 overflow-auto px-3">
                        {this.state.modalTab === 1 ? this.modalTab1() : this.modalTab2()}
                    </Article>

                    <Article class="d-flex justify-content-end">
                        <input type="button" className="closeModal btn btn-secondary mx-2 my-1" value="Cerrar" aria-label="Close" onClick={() => { window.dispatchEvent(new Event('closeModal')); }} />
                    </Article>
                </Article>
            </Fragment>
        )
    }

    /* ===== MODALTAB RENDERS ===== */
    modalTab1() {
        return (
            <Fragment>
                <Article class="d-flex flex-wrap flex-column">
                    <Field disabled validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARUM_MATNR")} value={this.state.JSON_DATA["GETB_MM_ARUM"]["GECL_ARUM_MATNR"]} onChange={this.updateJSON.bind(this)} changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTB_MAKTX")} value={this.state.JSON_DATA["GETB_MM_ARTB"]["GECL_ARTB_MAKTX"]} onChange={this.updateJSON.bind(this)} changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                </Article>

                <SubTitle title="Datos de Valoración Generales" />
                <Table actions
                    name="LST_GETB_MM_ARUM"
                    validation={this.state.VALIDATION.filter(x => x.GECL_CAMP_NAME.startsWith('GECL_ARUM'))}
                    data={this.state.JSON_DATA["LST_GETB_MM_ARUM"]}
                    onChange={this.updateJSON.bind(this)}
                    changeFocus={(lastInput, mcClass, index) => { this.renderMatchCode(lastInput, mcClass, index) }}
                    saveData={(table, data) => {
                        this.setState({
                            JSON_DATA: {
                                ...this.state.JSON_DATA,
                                [table]: data
                            },
                            modalType: ''
                        })
                    }}
                    options={[
                        {
                            header: 'UMA',
                            class: 'GECL_ARUM_MEINH',
                            pk: true,
                            matchcode: "GECL_UMED_MSEHI"
                        }, {
                            header: 'X',
                            class: 'GECL_ARUM_UMREN'
                        }, {
                            header: 'Y',
                            class: 'GECL_ARUM_UMREZ'
                        }, {
                            header: 'UMB',
                            class: 'GECL_ARUM_MSEHI',
                            matchcode: 'GECL_UMED_MSEHI'
                        }, {
                            class: 'IND_TRANSC'
                        }, {
                            header: 'Texto Unidad Medida',
                            class: 'GECL_ARUM_MEINH',
                            description: this.state.MATCHCODE.find(x => x.TABLA.startsWith('MC_MM_UMED'))[Object.keys(this.state.MATCHCODE.find(x => x.TABLA.startsWith('MC_MM_UMED'))).find(f => f.startsWith('GETB'))] || undefined,
                            position: 1
                        }, {
                            header: 'Texto Unidad Medida',
                            class: 'GECL_ARUM_MSEHI',
                            description: this.state.MATCHCODE.find(x => x.TABLA.startsWith('MC_MM_UMED'))[Object.keys(this.state.MATCHCODE.find(x => x.TABLA.startsWith('MC_MM_UMED'))).find(f => f.startsWith('GETB'))] || undefined,
                            position: 3
                        }
                    ]} />
            </Fragment>
        )
    }
    modalTab2() {
        return (
            <Fragment>
                <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_AREM_MATNR")} value={this.state.JSON_DATA["GETB_MM_AREM"]["GECL_AREM_MATNR"]} onChange={this.updateJSON.bind(this)} changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTB_MAKTX")} value={this.state.JSON_DATA["GETB_MM_ARTB"]["GECL_ARTB_MAKTX"]} onChange={this.updateJSON.bind(this)} changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
                <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTB_MAKTX")} value={this.state.JSON_DATA["GETB_MM_ARTB"]["GECL_ARTB_MAKTX"]} onChange={this.updateJSON.bind(this)} changeFocus={(lastInput, mcClass) => { this.renderMatchCode(lastInput, mcClass) }} />
            </Fragment>
        )
    }

    content = () => {
        return (
            <Fragment>
                {this.state.section === 1 && this.section1()}
                {this.state.section === 2 && this.section2()}
                {this.state.section === 3 && this.section3()}
                {this.state.section === 4 && this.section4()}

                <Modal modalType={this.state.modalType} data={this.state.selectedMatchcode} changeLastInput={(e) => { this.setSelectedModalValue(e) }}>
                    {this.state.modalType === 'modal' && this.renderAditional()}
                </Modal>
            </Fragment>
        )
    }

    render() {
        let msg = this.state.JSON_DATA["LST_GETB_MM_ARUM"][0]["GECL_ARUM_UMREN"];
        // alert(msg);

        return (
            <Fragment>
                {this.state.loading
                    ? (<div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <img style={{ width: "300px", height: "160px" }} src={"https://i.pinimg.com/originals/46/18/55/461855b29ae2060f319f225529145f7c.gif"} alt="loading" />
                    </div>)
                    : (this.content())
                }
            </Fragment>
        )
    }
}

export default Articulo;

