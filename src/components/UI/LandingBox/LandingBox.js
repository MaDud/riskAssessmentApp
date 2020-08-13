import React from 'react';
import classes from './landingBox.module.css';

const landingBox = (props) => {
    let textSide = null; 
    if (props.right) {
        textSide = classes.Right
    }

    return (
        <div className={[classes.Box, textSide].join(' ')}>
            <div className={classes.TextBox}>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </div>
            <img src={props.img} alt='Ups.. Nie udało się otworzyć obrazka' />
        </div>
    )
}

export default landingBox;