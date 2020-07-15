import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import logo from '../../../assets/logo.png';

const navbar = props => {
    return (
        <div className={classes.Navigation}>
            <img src={logo} />
            <ul className={classes.Navbar}>
                <Navs>Metoda</Navs>
                <Navs>Autoryzacja</Navs>
            </ul>
        </div>
    )
};

export default navbar;