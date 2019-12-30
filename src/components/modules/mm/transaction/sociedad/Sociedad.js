import React, { Fragment } from 'react';

import { SERVER } from '../../../../../config/config';

import Field from '../../../../reusables/Field';
import Article from '../../../../reusables/Article';
import DropDown from '../../../../reusables/DropDown';
import SubTitle from '../../../../reusables/SubTitle';
import Modal from '../../../../reusables/Modal';
import Table from '../../../../reusables/Table';

const axios = require('axios');

class Sociedad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selected: undefined,
            data: []
        }
    }

    async componentDidMount() {
        let res = await axios.get(`http://${SERVER.IP}:${SERVER.PORT}/api/mm/listSOFI`)
            .catch((err) => {
                console.log(err);
                return;
            });

        if (res) {
            let data = res.data;

            this.setState({
                data,
                loading: false
            }, () => { this.forceUpdate() })
        } else {
            alert('Error de conexión con el servidor.');
            return;
        }
    }

    content() {
        return (
            <Fragment>
                <div className="h-100 d-flex flex-column px-3">
                    <Article class="d-flex flex-wrap p-3 justify-content-between align-items-center">
                        <h4 className="h4 text-muted font-weight-normal m-0">Sociedad</h4>
                        <Article width="auto" class="d-flex justify-content-start">
                            <input type="button" className="showModal btn btn-info btn-sm mx-2 " data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#modal2" value="Crear" onClick={() => { this.setState({ modalType: "modal", isModalActive: true }, () => { this.forceUpdate() }); this.renderAditional(); }} />
                            <input type="button" className="btn btn-info btn-sm mx-2 " value="Actualizar" />
                            <input type="button" className="btn btn-info btn-sm mx-2 " value="Detalle" />
                        </Article>
                    </Article>

                    <Table readonly
                    name="LST_GETB_MM_SOFI"
                    data={this.state.data}
                    options={[
                        {
                            header: 'Sociedad',
                            class: 'GECL_SOFI_BUKRS'
                        }, {
                            header: 'Nombre',
                            class: 'GECL_SOFI_BUTXT'
                        }
                    ]} />
                </div>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loading &&
                    (<div style={{ height: "100%" }} className="loading w-100 d-flex justify-content-center align-items-center position-fixed bg-white">
                        <img style={{ width: "300px", height: "160px" }} src={"https://i.pinimg.com/originals/46/18/55/461855b29ae2060f319f225529145f7c.gif"} alt="loading" />
                    </div>)
                }
                {
                    this.content()
                }
            </Fragment>
        )
    }
}

export default Sociedad;