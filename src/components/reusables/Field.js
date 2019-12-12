import React, { Fragment } from 'react';

function Field(props) {
    let validation = props.validation !== undefined ? props.validation : '';
    let label = props.label !== undefined ? props.label : '';
    let type = props.type !== undefined ? props.type : '';
    let value = props.value !== undefined ? props.value : '';
    let maxLength = props.maxLength !== undefined ? props.maxLength : '';
    let _class = props.class !== undefined ? props.class : '';
    let fieldClass = props.fieldClass !== undefined ? props.fieldClass : 'input-group input-group-sm m-2';
    let name = props.name !== undefined ? props.name : '';
    let matchcode = props.matchcode !== undefined ? props.matchcode : '';
    let width = props.width !== undefined ? props.width : '';
    let isDisabled = props.disabled !== undefined ? true : false;

    function onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        let fieldName = event.target.className;
        let fieldValue = event.target.type !== 'checkbox' ? event.target.value : event.target.checked;

        if (event.target.type === 'checkbox') {
            fieldValue = fieldValue ? 'X' : '';
        }

        fieldName = fieldName.split(' ').find(x => x.startsWith('GECL'));

        let tableName = `GETB_MM_${fieldName.substr(5, 4)}`;

        if (props.onChange != undefined) {
            props.onChange(tableName, fieldName, fieldValue);
        }
    }

    function validationRender() {
        let vType;

        switch (validation["GECL_DOMI_DATATYPE"]) {
            case 'varc':
            case 'char': vType = 'text'; break;
            case 'dats': vType = 'date'; break;
            default: vType = 'number'; break;
        }

        return (
            <Fragment>
                {type !== 'checkbox' && (
                    <div className={fieldClass} style={{ width: "auto" }}>
                        {validation["GECL_ELDA_SHLPNAME"] !== '' &&
                            <div className="input-group-prepend">
                                <span className="input-group-text">{validation["GECL_ELDA_SHLPNAME"]}</span>
                            </div>
                        }

                        <input type={type !== '' ? type : vType} style={vType === 'text' ? { width: (validation["GECL_DOMI_LENG"] * 10 + 10) + "px" } : { width: '150px' }} className={validation["GECL_CAMP_NAME"] + " " + _class + " form-control"} name={name} value={value} maxLength={validation["GECL_DOMI_LENG"]} onChange={(e) => onFieldChange(e)} disabled={isDisabled} />

                        {
                            matchcode !== '' &&
                            <div className="input-group-append">
                                <input type="button" className={matchcode + " btn btn-outline-secondary"} value="MC" />
                            </div>
                        }

                    </div>
                )}
                {type === 'checkbox' && (
                    <div className={fieldClass} style={width !== '' ? { width: width } : { width: "auto" }}>
                        <div className="custom-control custom-checkbox d-flex align-items-center">
                            <input type="checkbox" className={"custom-control-input " + validation["GECL_CAMP_NAME"] + " " + _class} id={validation["GECL_CAMP_NAME"]} checked={value} onChange={(e) => onFieldChange(e)} disabled={isDisabled} />
                            <label className="custom-control-label" htmlFor={validation["GECL_CAMP_NAME"]}>{validation["GECL_ELDA_SHLPNAME"]}</label>
                        </div>
                    </div>
                )}
            </Fragment>
        )
    }
    function normalRender() {
        return (
            <Fragment>
                {type !== 'checkbox' && (
                    <div className={fieldClass} style={{ width: "auto" }}>
                        {label !== '' &&
                            <div className="input-group-prepend">
                                <span className="input-group-text">{label}</span>
                            </div>
                        }

                        <input type={type !== '' ? type : 'text'} style={{ width: width }} className={_class + " form-control"} name={name} value={value} maxLength={maxLength} onChange={(e) => onFieldChange(e)} disabled={isDisabled} />

                        {
                            matchcode !== '' &&
                            <div className="input-group-append">
                                <input type="button" className={matchcode + " btn btn-outline-secondary"} value="MC" />
                            </div>
                        }

                    </div>
                )}

                {type === 'checkbox' && (
                    <div className={fieldClass} style={{ width: "auto" }}>
                        <div className="custom-control custom-checkbox d-flex align-items-center">
                            <input type="checkbox" className={"custom-control-input " + _class} id={_class} checked={value} onChange={(e) => onFieldChange(e)} disabled={isDisabled} />
                            <label className="custom-control-label" htmlFor={_class}>{label}</label>
                        </div>
                    </div>
                )}
            </Fragment>
        )
    }
    function newRender() {
        let vType;

        switch (validation["GECL_DOMI_DATATYPE"]) {
            case 'varc':
            case 'char': vType = 'text'; break;
            case 'dats': vType = 'date'; break;
            default: vType = 'number'; break;
        }

        return (
            <Fragment>
                {type !== 'checkbox' && (
                    <div className="d-flex justify-content-start align-items-center">
                        <small className="m-0 text-nowrap text-truncate font-weight-bold" style={{ width: "250px" }}>{validation["GECL_ELDA_SHLPNAME"]}</small>
                        <div className="input-group input-group-sm m-2" style={{ width: "auto" }}>
                            <input type={type !== '' ? type : vType} className={validation["GECL_CAMP_NAME"] + " " + _class + " form-control col-form-label-sm"} style={{ width: "300px" }} name={name} value={value} maxLength={validation["GECL_DOMI_LENG"]} onChange={(e) => onFieldChange(e)} disabled={isDisabled} />
                            {
                                matchcode !== '' &&
                                <div className="input-group-append">
                                    <input type="button" className={matchcode + " MC btn btn-outline-secondary"} value="MC" onClick={(e) => {props.changeFocus(e.target.parentElement.previousSibling)}} data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#modal" />
                                </div>
                            }
                        </div>
                    </div>
                )}
                {type === 'checkbox' && (
                    <div className={fieldClass} style={width !== '' ? { width: width } : { width: "auto" }}>
                        <div className="custom-control custom-checkbox d-flex align-items-center">
                            <input type="checkbox" className={"custom-control-input " + validation["GECL_CAMP_NAME"] + " " + _class} id={validation["GECL_CAMP_NAME"]} checked={value} onChange={(e) => onFieldChange(e)} disabled={isDisabled} />
                            <label className="custom-control-label" htmlFor={validation["GECL_CAMP_NAME"]}><small className="text-nowrap text-truncate font-weight-bold">{validation["GECL_ELDA_SHLPNAME"]}</small></label>
                        </div>
                    </div>
                )}
            </Fragment>
        )
    }

    return (
        <Fragment>
            {newRender()}
            {/* {validation !== '' ? validationRender() : newRender()} */}
        </Fragment>
    )
}

export default Field;