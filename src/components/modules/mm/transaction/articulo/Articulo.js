import React, { Fragment } from 'react';
import Field from '../../../../reusables/Field';
import Article from '../../../../reusables/Article';
import DropDown from '../../../../reusables/DropDown';

class Articulo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            section: 0
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.section == 0 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: "350px" }}>
                            <h1 className="h1 text-muted">Articulo Acceso</h1>
                            <Article width="100%">
                                <Field width="100%" label="Artículo" matchcode="GECL_CENT_BUKRS" />
                            </Article>
                            <Article width="100%">
                                <DropDown />
                            </Article>
                            <input type="button" className="btn btn-success" value="Crear" />
                        </div>
                    </div>
                )}
                {this.state.section == 1 && (
                    <div>
                        <h1 className="h1 text-muted">Articulo</h1>
                        <hr />
                        <Article width="60%">
                            <Field width="400px" label="Codigo" type="text" class="GECL_ARTI_MATNR" matchcode="GECL_CENT_BUKRS" />
                        </Article>

                        <Article width="60%">
                            <Field width="300px" label="Nombre" type="text" class="GECL_ARTI_NAME1" />
                            <Field width="100px" label="Nombre2" type="text" />
                        </Article>
                    </div>
                )}
            </Fragment>

        )
    }
}

export default Articulo;