import React, { Fragment } from 'react';

function Footer(props) {
    return (
        <footer className="w-100 bg-dark d-flex justify-content-end align-items-center" style={{ height: props.height + 'px' }}>
            {props.children}
        </footer>
    )
}

export default Footer;