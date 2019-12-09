import React, { Fragment } from 'react';

import JSON_STRUCTURE from './Articulo.json';

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
            JSON_DATA: JSON_STRUCTURE,
            VALIDATION: [{
                GECL_ELDA_SHLPNAME: "UMB",
                GECL_DOMI_DATATYPE: "char",
                GECL_DOMI_LENG: 16,
                GECL_CAMP_NAME: "GECL_ARTI_MEINS"
            },
            {
                GECL_ELDA_SHLPNAME: "Grp. Artículo",
                GECL_DOMI_DATATYPE: "deci",
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
            }],
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
                }
            ]
        }


        window.addEventListener('click', (e) => {
            // alert(e);
        }, false)
    }

    async componentDidMount() {
        // let res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/sys/listCAMP?lstgetb=GETB_MM_ARTI`)
        //     .catch((err) => {
        //         console.log(err);
        //         return;
        //     });

        // if (res) {
        //     let data = res.data;

        //     if (data.V_TYPE_MESSAGE !== 'E') {
        //         console.log(data);
        //         this.setState({
        //             VALIDATION: data,
        //             loading: false
        //         })
        //     } else {
        //         alert('Las credenciales son incorrectas.');
        //     }

        // } else {
        //     alert('Error de conexión con el servidor.');
        // }
    }

    updateJSON(table, field, value, index) {
        if (index !== undefined) {
            let temp = this.state.JSON_DATA[table];

            temp[index] = {...temp[index], [field]: value}

            this.setState({
                JSON_DATA: {
                    ...this.state.JSON_DATA,
                    [table]: temp
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
            })
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
                        <input type="button" className="btn btn-info btn-sm mx-2" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#modal" value="Datos Adicionales" />
                        <input type="button" className="btn btn-secondary btn-sm mx-2" value="Guardar" />
                        <input type="button" className="btn btn-secondary btn-sm mx-2" value="Retornar" />
                    </Article>
                </Article>
                <hr className="my-2" />
                <Article class="d-flex py-2">
                    <ul className="nav-tabs mb-1 d-flex" style={{ overflowX: "auto", overflowY: "hidden", listStyleType: "none" }}>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 1 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Datos Base 1" onClick={() => { this.changeTab(1) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 2 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Compras" onClick={() => { this.changeTab(2) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 3 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Organización Ventas 1" onClick={() => { this.changeTab(3) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 4 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Organización Ventas 2" onClick={() => { this.changeTab(4) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 5 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Com.ext.Importación" onClick={() => { this.changeTab(5) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 6 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Ventas:Gnral./Centro" onClick={() => { this.changeTab(6) }} />
                        </li>
                        <li className="nav-item">
                            <input type="button" className={this.state.tab === 7 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Contabilidad 1" onClick={() => { this.changeTab(7) }} />
                        </li>
                    </ul>
                </Article>

                <Article class="bg-primary p-1 d-flex justify-content-start align-self-center">
                    <h6 className="h6 text-white font-weight-normal m-0">Datos Base 1</h6>
                </Article>

                <Article class="border border-primary p-4 overflow-auto px-3">
                    {this.renderTab(this.state.tab)}
                </Article>
            </div>
        )
    }

    /* ===== TAB RENDERS ===== */
    changeTab(t) {
        this.setState({
            tab: t
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
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MEINS")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MEINS"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UMED_MSEHI" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MATKL")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MATKL"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_GRME_MATKL" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BISMT")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BISMT"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_EXTWG")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_EXTWG"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_SPART")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_SPART"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_SECO_SPART" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MSTAE")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MSTAE"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_STMA_MMSTA" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_PRDHA")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_PRDHA"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MSTDE")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MSTDE"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_MTPOS_MARA")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_MTPOS_MARA"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_TIPO_MTPOS" />

                    <br />

                    <SubTitle title="Grupo de Autorización material" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BEGRU")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BEGRU"]} onChange={this.updateJSON.bind(this)} />

                    <br />

                    <SubTitle title="Dimensiones/EAN" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_BRGEW")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_BRGEW"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_GEWEI")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_GEWEI"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UMED_MSEHI" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_VOLUM")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_VOLUM"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_VOLEH")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_VOLEH"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_UMED_MSEHI" />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_NTGEW")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_NTGEW"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_GROES")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_GROES"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_EAN11")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_EAN11"]} onChange={this.updateJSON.bind(this)} />
                    <Field validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_NUMTP")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_NUMTP"]} onChange={this.updateJSON.bind(this)} matchcode="GECL_GTIN_NUMTP" />
                </Article>
            </Fragment>
        )
    }
    tab2 = () => {
        return (
            <Fragment>
                <Article class="d-flex justify-content-start">
                    <Field width="200px" label="Artículo" class="GECL_ARCE_MATNR" disabled />
                    <Field width="300px" class="GECL_ARTB_MAKTX" />
                </Article>
                <Article class="d-flex justify-content-start">
                    <Field width="100px" label="Centro" class="GECL_ARCE_WERKS" disabled />
                    <Field width="300px" class="GECL_CENT_NAME1" disabled />
                </Article>
                <hr className="my-2" />
                <Article class="d-flex flex-wrap justify-content-between overflow-auto">
                    <Article width={window.innerWidth <= this.state.isTablet ? "100%" : "49.5%"} class="d-flex flex-wrap flex-column">
                        <SubTitle title="Datos Generales" />
                        <Article class={window.innerWidth <= this.state.isMobile ? "d-flex flex-column" : undefined} >
                            <Field width="160px" label="UMB" class="GECL_ARTI_MEINS" matchcode="GECL_UMED_MSEHI" />
                            <Field width="260px" label="Gr.compras" class="GECL_ARCE_EKGRP" matchcode="GECL_GRCO_EKGRP" />
                            <Field width="260px" label="Sts. Art. Centro" class="GECL_ARCE_MMSTA" matchcode="GECL_STMA_MMSTA" />
                            <Field width="260px" maxLength="9" label="GrpPortArt" class="GECL_ARCE_MFRGR" value={this.state.JSON_DATA["GETB_MM_ARCE"]["GECL_ARCE_MFRGR"]} onChange={this.updateJSON.bind(this)} />
                            <Field type="checkbox" width="100%" validation={this.state.VALIDATION.find(x => x.GECL_CAMP_NAME === "GECL_ARTI_XCHPF")} value={this.state.JSON_DATA["GETB_MM_ARTI"]["GECL_ARTI_XCHPF"]} onChange={this.updateJSON.bind(this)} />
                        </Article>
                    </Article>
                    <Article width={window.innerWidth <= this.state.isTablet ? "100%" : "49.5%"} class="d-flex flex-wrap flex-column">

                    </Article>
                </Article>
            </Fragment>
        )
    }
    tab3 = () => {
        return (
            <Fragment>
                <h1 className="h1">Organización Ventas 1</h1>
                <Table data={this.state.JSON_DATA["LST_GETB_MM_ARUM"]} onChange={this.updateJSON.bind(this)} options={[
                    {
                        header: 'Código',
                        class: 'GECL_ARUM_MEINH'
                    }, {
                        header: 'Nombre',
                        class: 'GECL_ARUM_UMREN',
                        pk: false,
                        disabled: false
                    }, {
                        header: 'Descripción',
                        class: 'GECL_ARUM_UMREZ',
                        pk: false
                    }, {
                        header: 'País',
                        class: 'GECL_ARUM_MSEHI',
                        pk: false,
                        disabled: true
                    }, {
                        class: 'IND_TRANSC'
                    }
                ]} />
                {/* Crear una propiedad que reciba un arreglo de objetos de configuracion para los headers */}
                {/* para definir los pk, disabled, etc */}
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

    content = () => {
        return (
            <Fragment>
                {this.state.section === 1 && this.section1()}
                {this.state.section === 2 && this.section2()}
                {this.state.section === 3 && this.section3()}
                {this.state.section === 4 && this.section4()}

                <Modal title="Modal de prueba">
                    <Article>
                        <h1 className="h1">PRUEBA1</h1>
                        <hr />
                        <p>Contenido</p>
                    </Article>
                    <Article>
                        <input type="button" className="btn btn-success" value="Confirmar" />
                        <input type="button" className="btn btn-danger" value="Cancelar" />
                    </Article>
                </Modal>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                {this.state.loading ? (<div className="w-100 h-100 d-flex justify-content-center align-items-center"><img style={{ width: "300px", height: "160px" }} src={"https://i.pinimg.com/originals/46/18/55/461855b29ae2060f319f225529145f7c.gif"} alt="loading" /></div>)
                    : (
                        this.content()
                    )}


            </Fragment>
        )
    }
}

export default Articulo;

