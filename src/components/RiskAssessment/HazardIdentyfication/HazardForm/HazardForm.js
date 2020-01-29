import React from 'react';

import classes from './hazardForm.module.css';

import RiskMatric from '../RiskMatric/RiskMatric';

const hazardForm = props => {

    return (
        <div className={classes.HazardForm}>
            <form className={classes.HazardBox}>
                <label>Źródło zagrożenia:</label>
                <input type='textarea' name="source" onChange={props.change}/>
                <label>Możliwe skutki zagrożenia:</label>
                <input type='textarea' name="possibleEffects" onChange={props.change}/>
                <label>Środki ochrony przed zagrożeniem:</label>
                <input type='textarea' name="protection" onChange={props.change}/>
                <label>Skutek</label>
                <select onChange={props.change} name="effect">
                    <option value=""></option>
                    <option value="small">Mały</option>
                    <option value="medium">Średni</option>
                    <option value="big">Duży</option>
                </select>
                <label>Prawdopodobieństwo</label>
                <select onChange={props.change} name="propability">
                    <option value=""></option>
                    <option value="small">Małe</option>
                    <option value="medium">Średnie</option>
                    <option value="big">Duże</option>
                </select>
                <RiskMatric effect={props.effect} propability={props.propability} />
            </form>
        </div>
    )
};

export default hazardForm;