import React from 'react';

import classes from './riskMatric.module.css';

const riskMatric = props => {

    let value = props.effect+'|'+props.propability;
    let risk;    

    switch (value) {
        case ("small|small"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.ExtraSmall].join(' ')}>Bardzo małe</p>
                    </div>);
            break;
        case ("small|medium"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>  
                        <p className={[classes.Level,classes.Small].join(' ')}>Małe</p>
                    </div>);
            break;
        case ("small|big"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.Medium].join(' ')}>Średnie</p>
                    </div>);
            break;
        case ("medium|small"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>  
                        <p className={[classes.Level,classes.Small].join(' ')}>Małe</p>
                    </div>);
            break;
        case ("medium|medium"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.Medium].join(' ')}>Średnie</p>
                    </div>);
            break;
        case ("medium|big"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.Big].join(' ')}>Duże</p>
                    </div>);
            break;
        case ("big|small"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.Medium].join(' ')}>Średnie</p>
                    </div>);
            break;
        case ("big|medium"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.Big].join(' ')}>Duże</p>
                    </div>);
            break;
        case ("big|big"):
            risk = (<div className={classes.Risk}>
                        <p>Ryzyko:</p>
                        <p className={[classes.Level,classes.ExtraBig].join(' ')}>Bardzo duże</p>
                    </div>);
            break;
        default:
            risk = null;
    };

    return risk;

};

export default riskMatric;