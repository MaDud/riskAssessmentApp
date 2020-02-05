import React from 'react';

import classes from './button.module.css'

const button = props => {
    return (
        <button
         onClick={props.clicked}
         disabled={props.disabled}
         className={[classes.Button, classes[props.btnType], props.btnPosition].join(" ")}>{props.children}</button>
    )
};

export default button;