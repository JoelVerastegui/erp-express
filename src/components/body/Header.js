import React from 'react';

function Header(props) {
    return (
        <header className="w-100 bg-primary px-1 d-flex align-items-center" style={{ height: props.height + 'px' }}>
            {props.children}
        </header>
    )
}

export default Header;