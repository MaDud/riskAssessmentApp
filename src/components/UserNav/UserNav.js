import React from 'react';
import classes from './userNav.module.css';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <FontAwesomeIcon icon='folder-plus'/>
            </Button>
            <div className={classes.Search}>
                <Input elementType= 'input'
                        type='text'
                        placeholder='Szukaj...'
                        changed={props.changed} />    
            </div>
        </div>
    )
};

export default userNav;