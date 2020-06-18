import React from 'react';
import classes from './riskAssessmentNav.module.css';
import Auxiliary from '../../../hoc/Auxiliary';

const riskAssessmentNav = props => {
    return (
        <Auxiliary>
            <ul className={classes.RANav}>
                <li onClick={props.history}>Historia zmian</li>
                <li onClick={props.edit}>Edytuj</li>
                <li onClick={props.archive}>Archiwizuj</li>
                <li onClick={props.close}>Zamknij</li>
            </ul>
        </Auxiliary>
    )
};

export default riskAssessmentNav;