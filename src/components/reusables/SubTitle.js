import React from 'react';

function SubTitle(props) {
    return (
        <article class="d-flex flex-wrap justify-content-center">
            <h5 className="w-100 p-2 h5 text-white text-center font-weight-normal" style={{backgroundColor:"#029de0"}}>{ props.title }</h5>
        </article>
    )
}

export default SubTitle;