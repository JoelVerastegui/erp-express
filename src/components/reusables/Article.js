import React from 'react';

function Article(props){
    let _class = props.class !== undefined ? props.class : "d-flex flex-wrap justify-content-between";
    let width = props.width !== undefined ? props.width : '100%';

    return(
        <article className={_class} style={{width:width}}>
            {props.children}
        </article>
    )
}

export default Article;