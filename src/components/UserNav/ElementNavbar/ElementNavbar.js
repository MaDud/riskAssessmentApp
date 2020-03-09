import React from 'react';

import classes from './elementNavbar.module.css';
import Button from '../../UI/Button/Button';

const elementNavbar = props => {

    return(
        <div className={classes.ElementNavbar}>
            <Button btnType="Icon" 
                    clicked={props.open}
                    className={classes.tooltip}>
                    <i className="fas fa-external-link-alt"></i>
                    <span className={classes.tooltiptext}>Otwórz</span>
            </Button>
            <Button btnType="Icon" 
                    clicked={props.edit}
                    className={classes.tooltip}>
                    <i className="fas fa-edit"></i>
                    <span className={classes.tooltiptext}>Edytuj</span>
            </Button>
            <Button btnType="Icon" 
                    clicked={props.archive}
                    className={classes.tooltip}>
                    <i className="fas fa-archive"></i>
                    <span className={classes.tooltiptext}>Archiwizuj</span>
            </Button>
        </div>
    )
};

export default elementNavbar;
