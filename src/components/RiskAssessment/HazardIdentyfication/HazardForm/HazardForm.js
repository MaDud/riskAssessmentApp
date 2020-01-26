import React from 'react';

import classes from './hazardForm.module.css';

const hazardForm = props => {
    return (
        <div className={classes.HazardForm}>
            <div className={classes.Hazard}>
                <h1>{props.hazard}</h1>
                <label className={classes.Switch}>
                    <input type="checkbox" />
                    <span className={classes.Slider}>NIE</span> 
                </label>
            </div>
            <form className={classes.HazardBox}>
                <label>Źródło zagrożenia:</label>
                <input type='textarea' onChange={props.change}/>
                <label>Możliwe skutki zagrożenia:</label>
                <input type='textarea' onChange={props.change}/>
                <label>Środki ochrony przed zagrożeniem:</label>
                <input type='textarea' onChange={props.change}/>
                <label>Skutek</label>
                <select value="result" onChange={props.change}>
                    <option value="small">Mały</option>
                    <option value="medium">Średni</option>
                    <option value="big">Duży</option>
                </select>
                <label>Prawdopodobieństwo</label>
                <select value="propability" onChange={props.change}>
                    <option value="small">Małe</option>
                    <option value="medium">Średnie</option>
                    <option value="big">Duże</option>
                </select>
            </form>
        </div>
    )
};

export default hazardForm;