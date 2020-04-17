import React from 'react';
import Button from '../UI/Button/Button';
import classes from './userNav.module.css';

const userNav = (props) => {

    return (
        <div className={classes.Navigation}>
            <Button btnType={props.activeBtn === 'active' ? 'ActiveFocus':'Active'}
                    id= 'active'
                    btnPosition={classes.Active}
                    clicked={props.clicked}>
                    Aktywne
            </Button>
            <Button btnType={props.activeBtn === 'review' ? 'WarningFocus':'Warning'}
                    id= 'review'
                    btnPosition={classes.Warning}
                    clicked={props.clicked}>
                    Do przeglądu
            </Button>
            <Button btnType={props.activeBtn === 'overdue' ? 'CancelFocus':'Cancel'}
                    id= 'overdue'
                    btnPosition={classes.Cancel}
                    clicked={props.clicked}>
                    Przeterminowane
            </Button>
            <Button btnType="Submit" 
                    btnPosition={classes.Submit}
                    clicked= {props.submit}>
                    Dodaj nową ocenę
            </Button>
        </div>
    )
};

export default userNav;