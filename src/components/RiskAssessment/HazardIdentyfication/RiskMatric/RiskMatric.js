import React from 'react';

import classes from './riskMatric.module.css';

const riskMatric = props => {

    let value = props.effect+'|'+props.propability;
    let type = props.type;
    let risk;    

    switch (value) {
        case ("small|small"):
            if (type === 'td') {
                risk = <td className={[classes.Level,classes.ExtraSmall].join(' ')}>Bardzo małe</td>
            } else {
                risk = <div className={[classes.Level,classes.ExtraSmall].join(' ')}>Bardzo małe</div>};
            break;
        case ("small|medium"):
        case ("medium|small"):
            if (type === 'td') {
                risk = <td className={[classes.Level,classes.ExtraSmall].join(' ')}>Małe</td>
            } else {
                risk = <div className={[classes.Level,classes.Small].join(' ')}>Małe</div>;}
            break;
        case ("small|big"):
        case ("medium|medium"):
        case ("big|small"):
            if (type === 'td') {
                risk = <td className={[classes.Level,classes.Medium].join(' ')}>Średnie</td>
            } else {
                risk = <div className={[classes.Level,classes.Medium].join(' ')}>Średnie</div>};
            break;
        case ("medium|big"):
        case ("big|medium"):
            if (type === 'td') {
                risk = <td className={[classes.Level,classes.Big].join(' ')}>Duże</td>
            } else {
                risk = <div className={[classes.Level,classes.Big].join(' ')}>Duże</div>};
            break;
        case ("big|big"):
            if (type === 'td') {
                risk = <td className={[classes.Level,classes.ExtraBig].join(' ')}>Bardzo duże</td>
            } else {
                risk = <div className={[classes.Level,classes.ExtraBig].join(' ')}>Bardzo duże</div>};
            break;
        default:
            risk = null;
    };

    return risk !== null ? risk : null;
};

export default riskMatric;