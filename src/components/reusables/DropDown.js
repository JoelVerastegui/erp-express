import React from 'react';

function DropDown(props) {
    return (
        <select className={props.class + " selectpicker show-tick"} data-show-subtext="true" data-size="5" data-live-search="true" data-width={props.width}>
            <option key="" data-subtext="">--- Seleccionar ---</option>
            {props.data.map((element) => {
                return (<option key={element.CODIGO} data-subtext={element.CODIGO}>{element.DESCRIPCION}</option>)
            })}
        </select>
    )
}

export default DropDown;