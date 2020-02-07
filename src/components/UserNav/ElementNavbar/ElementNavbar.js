import React from 'react';

import classes from './elementNavbar.module.css';
import Button from '../../UI/Button/Button';

const elementNavbar = props => {

    return(
        <div className={classes.ElementNavbar}>
            <Button btnType="Icon" 
                    clicked={props.open}>
                    <i className="fas fa-external-link-alt"></i>
            </Button>
            <Button btnType="Icon" 
                    clicked={props.edit}>
                    <i className="fas fa-edit"></i>
            </Button>
            <Button btnType="Icon" 
                    clicked={props.archive}>
                    <i className="fas fa-archive"></i>
            </Button>
        </div>
    )
};

export default elementNavbar;
