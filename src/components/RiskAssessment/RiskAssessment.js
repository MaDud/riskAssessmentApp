import React from 'react';

import classes from './riskAssessment.module.css';

import Auxiliary from '../../hoc/Auxiliary'

const riskAssessment = props => {
    return(
        <Auxiliary>
            <form>
                <label>Nazwa stanowiska</label>
                <input type="text"/>
                <label>Lokalizacja</label>
                <input type="text"/>
                <label>Numer:</label>
                <input type="text"/>
                <label>Wersja:</label>
                <input type="text"/>
                <label>Data sporządzenia:</label>
                <input type="date"/>
            </form>
            {props.children}
            <form>
                <label>Uwagi:</label>
                <input type="text"/>
                <label>Zespół sporządzający:</label>
                <input type="text"/>
                <label>Data kolejnego przeglądu:</label>
                <input type="date"/>
            </form>
        </Auxiliary>
    )
};

export default riskAssessment;