import React from 'react';
import Articulo from '../articulo/Articulo';

class Content extends React.Component{
    render(){
        return(
            <div className="p-3 shadow bg-white" style={{width:"97%",height:"95%",margin:"1.25% 1.5% 1.25% 1.5%"}}>
                <Articulo />
            </div>
        )
    }
}

export default Content;