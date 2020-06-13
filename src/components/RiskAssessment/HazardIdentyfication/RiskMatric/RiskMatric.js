import React from 'react';

import classes from './riskMatric.module.css';

const riskMatric = props => {

    let value = props.effect+'|'+props.propability;
    let risk;    

    switch (value) {
        case ("small|small"):
            risk = <p className={[classes.Level,classes.ExtraSmall].join(' ')}>Bardzo małe</p>;
            break;
        case ("small|medium"):
        case ("medium|small"):
            risk = <p className={[classes.Level,classes.Small].join(' ')}>Małe</p>;
            break;
        case ("small|big"):
        case ("medium|medium"):
        case ("big|small"):
            risk = <p className={[classes.Level,classes.Medium].join(' ')}>Średnie</p>;
            break;
        case ("medium|big"):
        case ("big|medium"):
            risk = <p className={[classes.Level,classes.Big].join(' ')}>Duże</p>;
            break;
        case ("big|big"):
            risk = <p className={[classes.Level,classes.ExtraBig].join(' ')}>Bardzo duże</p>;
            break;
        default:
            risk = null;
    };

    return risk !== null ? 
            (<div className={classes.Risk}>
                {risk}
            </div>)
            : null;

};

export default riskMatric;