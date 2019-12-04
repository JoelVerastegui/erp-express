import React from 'react';

import './DropDown.css';

function DropDown() {
    return (
        <div className="dropdown">
            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
            </button>
            <div className="dropdown-menu dropdown-multicol" aria-labelledby="dropdownMenuButton">
                <div className="dropdown-row">
                    <a className="dropdown-item" href="#">Oranges</a>
                    <a className="dropdown-item" href="#">Bananas</a>
                    <a className="dropdown-item" href="#">Apples</a>
                </div>
                <div className="dropdown-row">
                    <a className="dropdown-item" href="#">Potatoes</a>
                    <a className="dropdown-item" href="#">Leeks</a>
                    <a className="dropdown-item" href="#">Cauliflowers</a>
                </div>
                <div className="dropdown-row">
                    <a className="dropdown-item" href="#">Beef</a>
                    <a className="dropdown-item" href="#">Pork</a>
                    <a className="dropdown-item" href="#">Venison</a>
                </div>
            </div>
        </div>
    )
}

export default DropDown;