import React from 'react';

import classes from './hazardIdentyfication.module.css';
import Auxiliary from '../../../hoc/Auxiliary';

import HazardForm from './HazardForm/HazardForm';

const hazardIdentyfication = props => {
    
    return(
        <Auxiliary>
            <div className={classes.HazardIdentyfication}>
                <h1>{props.hazard}</h1>
                <label className={classes.Switch}>
                    <input type="checkbox" onClick={props.checked}/>
                    <span className={classes.Slider}>NIE</span> 
                </label>
            </div>
        </Auxiliary>
    )
};

export default hazardIdentyfication;