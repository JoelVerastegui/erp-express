import React from 'react';
//import Articulo from '../articulo/Articulo';

function Content(){
    let session = sessionStorage.getItem('session') || '';

    return(
        <div>
            Bienvenido {session["GECL_USPE_NAME_FIRST"] + ' ' + session["GECL_USPE_NAME_LAST"]}
        </div>
    )
}

export default Content;