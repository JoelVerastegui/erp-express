import React, { useState } from 'react';
//import MediaQuery from 'react-responsive';

import './Login.css';
import logo from '../../../assets/images/logo.jpg';
import { SERVER } from '../../../config/config';

const axios = require('axios');


function Login(props) {
    let [env, setEnv] = useState("");
    let [user, setUser] = useState("");
    let [pass, setPass] = useState("");


    async function signIn() {
        console.log('Enviando...');
        let res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/sys/validarusua?mandt=${env}&bname=${user}&passcode=${pass}`)
            .catch((err) => {
                console.log(err);
                return;
            });

        if (res) {
            let data = res.data;

            if(data.V_TYPE_MESSAGE !== 'E'){
                props.sendSession(data);
            } else{
                alert('Las credenciales son incorrectas.');
            }
            
        } else {
            alert('Error de conexión con el servidor.');
        }
    }


    //max-width: 580px

    return (
        <div className="w-100 h-100 position-fixed d-flex justify-content-center align-items-center">
            <div className="w-auto p-5 shadow">
                <div className="content p-2" style={{ width: "300px" }}>
                    <img src={logo} alt="logo" />
                    <div className="form-group field">
                        <label>Entorno</label>
                        <input type="text" className="form-control col-sm-7" placeholder="Entorno" onChange={(e) => { setEnv(env = e.target.value) }} />
                    </div>
                    <div className="form-group field">
                        <label>Usuario</label>
                        <input type="text" className="form-control col-sm-7" placeholder="Nombre de usuario" onChange={(e) => { setUser(user = e.target.value) }} />
                    </div>
                    <div className="form-group field">
                        <label>Contraseña</label>
                        <input type="password" className="form-control col-sm-7" placeholder="Contraseña" onChange={(e) => { setPass(pass = e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-success" onClick={() => { signIn() }}>Ingresar</button>
                </div>
            </div>
        </div>
    )
}

export default Login;