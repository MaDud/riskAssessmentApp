import React from 'react';

import classes from './hazardForm.module.css';

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
                    <option value="small">Mały</option>
                    <option value="medium">Średni</option>
                    <option value="big">Duży</option>
                </select>
                <label>Prawdopodobieństwo</label>
                <select onChange={props.change} name="propability">
                    <option value="small">Małe</option>
                    <option value="medium">Średnie</option>
                    <option value="big">Duże</option>
                </select>
            </form>
        </div>
    )
};

export default hazardForm;