import React from 'react';
import classes from './userNav.module.css';

import Button from '../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

const userNav = (props) => {

    return (
        <div className={classes.Box}>
            <div className={classes.Navigation}>
                <Button btnType={props.activeBtn === 'active' ? 'ActiveFocus':'Active'}
                    id= 'active'
                    clicked={props.clicked}>
                    Aktywne
                </Button>
                {props.review !== 0 ?
                            (<Button btnType={props.activeBtn === 'review' ? 'WarningFocus':'Warning'}
                                id= 'review'
                                clicked={props.clicked}>
                                Do przeglądu
                            </Button>)
                            : null }
                {props.overdue !== 0 ? 
                            (<Button btnType={props.activeBtn === 'overdue' ? 'CancelFocus':'Cancel'}
                                id= 'overdue'
                                clicked={props.clicked}>
                                Przeterminowane
                            </Button>)
                            :null}
                {props.workCopy > 0 ? 
                            (<Button btnType={'Submit'}
                                    id = 'drafts'
                                    clicked={props.clicked}>
                                    Kopie robocze
                            </Button>)
                            : null}
            </div>
            <Button btnType="Submit" 
                    clicked= {props.submit}>
                    <FontAwesomeIcon icon='folder-plus'/>
            </Button>
        </div>
    )
};

export default userNav;