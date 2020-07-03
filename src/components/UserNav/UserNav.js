import React from 'react';
import classes from './userNav.module.css';

import Button from '../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const userNav = (props) => {

    return (
        <div className={classes.Box}>
            <div className={classes.Navigation}>
                <Button btnType={props.activeBtn === 'active' ? 'ActiveFocus':'Active'}
                    id= 'active'
                    clicked={props.clicked}>
                    Aktywne
                </Button>
                <Button btnType={props.activeBtn === 'review' ? 'WarningFocus':'Warning'}
                    id= 'review'
                    clicked={props.clicked}>
                    Do przeglądu
                </Button>
                <Button btnType={props.activeBtn === 'overdue' ? 'CancelFocus':'Cancel'}
                    id= 'overdue'
                    clicked={props.clicked}>
                    Przeterminowane
                </Button>
                <Button btnType={'Submit'}
                        id = 'drafts'
                        clicked={props.clicked}>
                        Kopie robocze
                </Button>
            </div>
            <Button btnType="Submit" 
                    clicked= {props.submit}>
                    <FontAwesomeIcon icon='folder-plus'/>
            </Button>
        </div>
    )
};

export default userNav;