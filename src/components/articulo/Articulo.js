import React from 'react';
import Field from '../global/Field';
import Article from '../global/Article';

class Articulo extends React.Component{
    render(){
        return(
            <div>
                <h1 className="h1 text-muted">Articulo</h1>
                <hr />
                <Article width="50%">
                    <Field width="400px" label="Codigo" type="text" class="GECL_ARTI_MATNR" matchcode="GECL_CENT_BUKRS" />
                    <Field width="300px" label="Nombre" type="text" class="GECL_ARTI_NAME1" />
                </Article>

                <Article width="50%">
                    <Field width="100px" label="Nombre2" type="text" />
                </Article>
            </div>
        )
    }
}

export default Articulo;