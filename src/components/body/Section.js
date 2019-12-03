import React from 'react';

function Section(props) {
    return (
        <section className="w-100" style={{ height: (props.innerHeight - props.headerH - props.footerH) + 'px' }}>
            {props.children}
        </section>
    )
}

export default Section;