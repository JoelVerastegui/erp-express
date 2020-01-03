import React, { Fragment, useState } from 'react';

function Header(props) {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const messageTimer = 'message';

    window.addEventListener('showMessage', (e) => {
        clearTimeout(messageTimer);

        setMessage(e.detail.message);
        setType(e.detail.type);

        setTimeout(() => {
            setMessage('');
        }, 4000, messageTimer);
    }, false)

    return (
        <Fragment>
            {
                message !== '' && (
                    <div class={"alert alert-"+type+" position-fixed w-100"} style={{zIndex:'1060'}} role="alert">
                        {message}
                    </div>
                )
            }
            <header className="w-100 bg-primary px-1 d-flex align-items-center" style={{ height: props.height + 'px' }}>
                {props.children}
            </header>
        </Fragment>

    )
}

export default Header;