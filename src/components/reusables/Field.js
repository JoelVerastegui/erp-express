import React from 'react';

function Field(props) {
    let label = props.label !== undefined ? props.label : '';
    let type = props.type !== undefined ? props.type : '';
    let _class = props.class !== undefined ? props.class : '';
    let fieldClass = props.fieldClass !== undefined ? props.fieldClass : 'input-group input-group-sm m-2';
    let name = props.name !== undefined ? props.name : '';
    let matchcode = props.matchcode !== undefined ? props.matchcode : '';
    let width = props.width !== undefined ? props.width : '';
    let isDisabled = props.disabled !== undefined ? true : false;

    return (
        <div className={fieldClass} style={{width:width}}>
            { label !== '' && 
                <div className="input-group-prepend">
                    <span className="input-group-text">{label}</span>
                </div>
            }
            
            <input type={type !== '' ? type : 'text'} className={_class + " form-control"} name={name} disabled={isDisabled}/>

            {
                matchcode !== '' &&
                <div className="input-group-append">
                    <input type="button" className={matchcode + " btn btn-outline-secondary"} value="MC" />
                </div>
            }

        </div>
    )
}

export default Field;