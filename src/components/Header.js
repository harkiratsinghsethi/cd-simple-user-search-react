import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css'

const Header = () => {
    return (
        <div className="headers">
            <Link to="/" className="links">
                {'Home'}
            </Link>
        </div>
    )
};


export default Header;
