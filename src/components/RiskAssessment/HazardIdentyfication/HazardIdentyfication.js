import React from 'react';

import classes from './hazardIdentyfication.module.css';
import Auxiliary from '../../../hoc/Auxiliary';


const hazardIdentyfication = props => {

    let styleClasses = [classes.Slider];
    if (props.save) {
        styleClasses.push(classes.Yes);
    } else {
        styleClasses.push(classes.Not);
    }

    return(
        <Auxiliary>
            <div className={classes.HazardIdentyfication}>
                <h2>{props.hazard}</h2>
                <label className={classes.Switch}>
                    <input type="checkbox" onChange={props.click} checked={props.checked} />
                    <span className={styleClasses.join(' ')}>{props.save? 'TAK' : 'NIE'}</span> 
                </label>
            </div>
            {props.children}
        </Auxiliary>
    )
};

export default hazardIdentyfication;