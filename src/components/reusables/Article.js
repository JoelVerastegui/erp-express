import React from 'react';

function Article(props){
    let width = props.width !== undefined ? props.width : '';

    return(
        <article className="d-flex flex-wrap justify-content-between" style={{width:width}}>
            {props.children}
        </article>
    )
}

export default Article;