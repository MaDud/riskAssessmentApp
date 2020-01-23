import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';

const navbar = props => {
    return (
        <ul className={classes.Navbar}>
            <Navs>Metoda</Navs>
            <Navs>Autoryzacja</Navs>
        </ul>
    )
};

export default navbar;