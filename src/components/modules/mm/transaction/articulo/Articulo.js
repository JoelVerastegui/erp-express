import React, { Fragment } from 'react';

import Field from '../../../../reusables/Field';
import Article from '../../../../reusables/Article';
import DropDown from '../../../../reusables/DropDown';
import SubTitle from '../../../../reusables/SubTitle';
import Modal from '../../../../reusables/Modal';

class Articulo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            section: 1,
            tab: 1,
            tabActive: 1,
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
            <div className="h-100 d-flex flex-column">
                <Article>
                    <h3 className="h3 text-muted">Articulo</h3>
                    <Article width="auto" class="d-flex justify-content-start mb-2">
                        <input type="button" className="btn btn-info btn-sm mx-2" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#modal" value="Datos Adicionales" />
                        <input type="button" className="btn btn-secondary btn-sm mx-2" value="Guardar" />
                        <input type="button" className="btn btn-secondary btn-sm mx-2" value="Retornar" />
                    </Article>
                </Article>
                <hr className="my-2" />

                <ul className="nav nav-tabs mb-1">
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 1 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Datos Base 1" onClick={() => { this.changeTab(1) }} />
                    </li>
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 2 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Compras" onClick={() => { this.changeTab(2) }} />
                    </li>
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 3 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Organización Ventas 1" onClick={() => { this.changeTab(3) }} />
                    </li>
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 4 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Organización Ventas 2" onClick={() => { this.changeTab(4) }} />
                    </li>
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 5 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Com.ext.Importación" onClick={() => { this.changeTab(5) }} />
                    </li>
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 6 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Ventas:Gnral./Centro" onClick={() => { this.changeTab(6) }} />
                    </li>
                    <li className="nav-item">
                        <input type="button" className={this.state.tabActive === 7 ? 'nav-link btn-sm active' : 'nav-link btn-sm'} value="Contabilidad 1" onClick={() => { this.changeTab(7) }} />
                    </li>
                </ul>

                {
                    this.renderTab(this.state.tab)
                }
            </div>
        )
    }

    /* ===== TAB RENDERS ===== */
    changeTab(t) {
        this.setState({
            tab: t,
            tabActive: t
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
                <Article class="d-flex justify-content-start">
                    <Field width="200px" label="Artículo" class="GECL_ARTI_MATNR" disabled />
                    <Field width="300px" class="GECL_ARTB_MAKTX" />
                </Article>
                <hr className="my-2" />
                <Article class="d-flex flex-wrap justify-content-between overflow-auto">
                    <Article width="49.5%" class="d-flex flex-wrap flex-column">
                        <SubTitle title="Datos Generales" />
                        <Article>
                            <Field width="160px" label="UMB" class="GECL_ARTI_MEINS" matchcode="GECL_UMED_MSEHI" />
                            <Field width="260px" label="Grupo Artículo" class="GECL_ARTI_MATKL" matchcode="GECL_GRME_MATKL" />
                            <Field width="300px" label="N°Artí­culo antiguo" class="GECL_ARTI_BISMT" />
                            <Field width="200px" label="Grupo artí­c. ext." class="GECL_ARTI_EXTWG" />
                            <Field width="200px" label="Sector" class="GECL_ARTI_SPART" matchcode="GECL_SECO_SPART" />
                            <Field width="200px" label="Status Artículo" class="GECL_ARTI_MSTAE" matchcode="GECL_STMA_MMSTA" />
                            <Field width="200px" label="Jquí­a.productos" class="GECL_ARTI_PRDHA" />
                            <Field width="260px" label="Válido de" class="GECL_ARTI_MSTDE" type="date" />
                            <Field width="200px" label="Sector" class="GECL_ARTI_MTPOS_MARA" matchcode="GECL_TIPO_MTPOS" />
                        </Article>

                        <br />

                        <SubTitle title="Grupo de Autorización material" />
                        <Article>
                            <Field width="200px" label="Grupo Autorizaciones" class="GECL_ARTI_BEGRU" />
                        </Article>
                    </Article>

                    <div className="h-100" style={{ backgroundColor: "#f7f7f9", width: "3px" }}></div>

                    <Article width="49.5%" class="d-flex flex-wrap flex-column">
                        <SubTitle title="Dimensiones/EAN" />
                        <Article>
                            <Field width="160px" label="Peso Bruto" class="GECL_ARTI_BRGEW" type="number" />
                            <Field width="360px" label="Unidad de peso" class="GECL_ARTI_GEWEI" matchcode="GECL_UMED_MSEHI" />
                            <Field width="160px" label="Volumen" class="GECL_ARTI_VOLUM" type="number" />
                            <Field width="360px" label="Unidad de volumen" class="GECL_ARTI_VOLEH" matchcode="GECL_UMED_MSEHI" />
                            <Field width="160px" label="Peso neto" class="GECL_ARTI_NTGEW" type="number" />
                            <Field width="360px" label="Tamaño/Dimens." class="GECL_ARTI_GROES" />
                            <Field width="360px" label="Código GTIN" class="GECL_ARTI_EAN11" />
                            <Field width="360px" label="Tipo EAN" class="GECL_ARTI_NUMTP" matchcode="GECL_GTIN_NUMTP" />
                        </Article>
                    </Article>
                </Article>

            </Fragment>
        )
    }
    tab2 = () => {
        return (
            <h1 className="h1">COMPRAS</h1>
        )
    }
    tab3 = () => {
        return (
            <h1 className="h1">Organización Ventas 1</h1>
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


    render() {
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
                    <p>Contenido :P</p>
                    </Article>
                    <Article>
                        <input type="button" className="btn btn-success" value="Confirmar" />
                        <input type="button" className="btn btn-danger" value="Cancelar" />
                    </Article>
                </Modal>
            </Fragment>
        )
    }
}

export default Articulo;

