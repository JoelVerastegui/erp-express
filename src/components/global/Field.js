import React from 'react';

function Field(props) {
    let label = props.label !== undefined ? props.label : '';
    let type = props.type !== undefined ? props.type : '';
    let _class = props.class !== undefined ? props.class : '';
    let name = props.name !== undefined ? props.name : '';
    let matchcode = props.matchcode !== undefined ? props.matchcode : '';
    let width = props.width !== undefined ? props.width : '';

    return (
        <div className="input-group input-group-sm m-2" style={{width:width}}>
            { label !== '' && 
                <div className="input-group-prepend">
                    <span className="input-group-text">{label}</span>
                </div>
            }
            
            <input type={type !== '' ? type : 'text'} className={_class + " form-control"} name={name} />

            {
                matchcode !== '' &&
                <div className="input-group-append">
                    <input type="button" className={matchcode + " btn btn-outline-secondary"} value="Hai" />
                </div>
            }

        </div>
    )
}

export default Field;