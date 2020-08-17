import React from 'react';
import classes from './userNav.module.css';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const userNav = (props) => {

    let selectOptions = [{value: 'active', displayValue: 'Aktywne'}];
    if (props.review > 0 ) {
        selectOptions.push({value: 'review', displayValue: 'Do przeglądu'})
    }
    if (props.overdue > 0 ) {
        selectOptions.push({value: 'overdue', displayValue: 'Przeterminowane'})
    }
    if (props.workCopy > 0 ) {
        selectOptions.push({value: 'drafts', displayValue: 'Kopie robocze'})
    }

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
                            (<Button btnType={props.activeBtn === 'drafts' ? 'SubmitFocus':'Submit'}
                                    id = 'drafts'
                                    clicked={props.clicked}>
                                    Kopie robocze
                            </Button>)
                            : null}
                <Input elementType = 'select'
                        options =  {selectOptions}
                        changed = {props.changed} />
            </div>
            <Button btnType= 'Submit'
                    clicked= {props.submit}>
                    <FontAwesomeIcon icon='folder-plus'/>
            </Button>
        </div>
    )
};

export default userNav;