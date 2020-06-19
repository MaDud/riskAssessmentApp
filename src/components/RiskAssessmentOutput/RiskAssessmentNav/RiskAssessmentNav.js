import React from 'react';
import classes from './riskAssessmentNav.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const riskAssessmentNav = props => {
    return (
        <Auxiliary>
            <ul className={classes.RANav}>
                <li onClick={props.history}><FontAwesomeIcon icon='folder-open' /><span>Historia zmian</span></li>
                <li onClick={props.edit}><FontAwesomeIcon icon='edit' /><span>Edytuj</span></li>
                <li onClick={props.archive}><FontAwesomeIcon icon='trash-alt' /><span>Archiwizuj</span></li>
            </ul>
        </Auxiliary>
    )
};

export default riskAssessmentNav;