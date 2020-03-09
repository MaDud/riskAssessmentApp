import React from 'react';

import classes from './statistic.module.css';

const statistic = props => {

    let statisticMatric = props.matric.map( (el, index) => {
        return <div key={index}><h1>{el.value} <span>{el.description}</span></h1></div>
    });

    return (
        <div className={classes.StatisticBox}>
            {statisticMatric}
        </div>
    )
};

export default statistic;