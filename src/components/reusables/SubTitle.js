import React from 'react';

function SubTitle(props) {
    return (
        <article className="d-flex flex-wrap justify-content-center">
            <h6 className="w-100 p-2 h6 text-white text-center font-weight-normal" style={{backgroundColor:"#029de0"}}>{ props.title }</h6>
        </article>
    )
}

export default SubTitle;