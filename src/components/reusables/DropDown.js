import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';

import { SERVER } from '../../config/config';

const axios = require('axios');

function DropDown(props) {
    const [_class, setClass] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const [width, setWidth] = useState('100%');
    const [label, setLabel] = useState('');



    useLayoutEffect(() => {
        if (props.data !== undefined) {
            setData(props.data);
        }
        if (props.class !== undefined) {
            setClass(props.class);
        }
        if (props.name !== undefined) {
            setName(props.name);
        }
        if (props.width !== undefined) {
            setWidth(props.width);
        }
        if (props.label !== undefined) {
            setLabel(props.label);
        }

        if(label === ''){
            fetchValidation();
        }

        if (!data.length && props.data === undefined) {
            fetchData();
        }
    })

    const fetchValidation = async () => {
        const lstgetb = `GETB_MM_${props.class.substr(5, 4)}`;
        let res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/sys/listCAMP?lstgetb=${lstgetb}`)
            .catch((err) => {
                console.log(err);
                return;
            });

        if (res) {
            let resData = res.data;

            if (resData.length) {
                let field = resData.find(x => x.GECL_CAMP_NAME === props.class);
                if (field) {
                    setLabel(field["GECL_ELDA_SHLPNAME"]);
                }
            } else {
                alert('Error: ', resData.MESSAGE);
                return;
            }
        } else {
            alert('Error de conexión con el servidor.');
            return;
        }
    }

    const fetchData = async () => {
        let json = {
            GROUP_MANDT: "100",
            GROUP_MC: `GETB_MM_${props.name.substr(5, 4)}`,
            GROUP_CBO: []
        }

        let res = await axios.post(`http://${SERVER.IP}:${SERVER.PORT}/api/mm/findMC`, json)
            .catch((err) => {
                console.log(err);
                return;
            });

        if (res) {
            let resData = res.data;

            if (resData.V_TYPE_MESSAGE !== 'E') {
                const VSC_DATA = resData["VSC_DATA"].find(x => x.TABLA === `MC_MM_${props.name.substr(5, 4)}`);
                const GETB = VSC_DATA[Object.keys(VSC_DATA).find(x => x.startsWith('GETB'))];
                setData(GETB);
            } else {
                alert('Error: ', resData.MESSAGE);
            }
        } else {
            alert('Error de conexión con el servidor.');
        }
    }

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         class: this.props.class !== undefined ? this.props.class : '',
    //         data: this.props.data !== undefined ? this.props.data : [],
    //         width: this.props.width !== undefined ? this.props.width : '100%'
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.data !== undefined) {
    //         this.setState({ data: nextProps.data, renderItem: 1 },()=>{this.forceUpdate()});
    //     }
    // }

    // render() {
    return (
        <div className="d-flex justify-content-start align-items-center">
            <small className="m-0 text-nowrap text-truncate font-weight-bold" style={{ width: "250px" }}>{label}</small>
            <select className={_class + " comboMC selectpicker show-tick mx-2"} data-show-subtext="true" data-size="5" data-live-search="true" data-width={'300px'}
                    onChange={(e)=>{props.onChange(`GETB_MM_${_class.substr(5,4)}`,_class,e.target.options[e.target.selectedIndex].dataset.subtext)}}>
                <option className="dropdown-item" key="" data-subtext="">--- Seleccionar ---</option>
                {data.map((element, i) => {
                    return (<option key={i} data-subtext={element.CODIGO}>{element.DESCRIPCION}</option>)
                })}
            </select>
        </div>
    )
    // }

}

export default DropDown;