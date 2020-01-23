import React from 'react';

import classes from './navs.module.css'

const navs = props => {
    return (
        <li className={classes.Navs}>
            {props.children}
        </li>
    )
};

export default navs;