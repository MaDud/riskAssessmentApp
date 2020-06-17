import React from 'react';
import classes from './riskAssessmentNav.module.css';
import Auxiliary from '../../../hoc/Auxiliary';

const riskAssessmentNav = props => {
    return (
        <Auxiliary>
            <ul className={classes.RANav}>
                <li>Historia zmian</li>
                <li>Edytuj</li>
                <li>Archiwizuj</li>
                <li>Zamknij</li>
            </ul>
        </Auxiliary>
    )
};

export default riskAssessmentNav;