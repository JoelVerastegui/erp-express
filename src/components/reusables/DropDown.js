import React from 'react';

class DropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            class: this.props.class !== undefined ? this.props.class : '',
            data: this.props.data !== undefined ? this.props.data : [],
            width: this.props.width !== undefined ? this.props.width : '100%'
        }

        console.log('Constructor data: ',this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== undefined) {
            this.setState({ data: nextProps.data, renderItem: 1 });
        }
    }

    render() {
        return( 
            <select className={this.state.class + " comboMC selectpicker show-tick"} data-show-subtext="true" data-size="5" data-live-search="true" data-width={this.state.width}>
                <option key="" data-subtext="">--- Seleccionar ---</option>
                {this.state.data.map((element, i) => {
                    return (<option key={i} data-subtext={element.CODIGO}>{element.DESCRIPCION}</option>)
                })}
            </select>
        )
    }

}

export default DropDown;