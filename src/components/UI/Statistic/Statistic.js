import React from 'react';

import classes from './statistic.module.css';

const statistic = props => {

    let statisticMatric = props.matric.map( (el, index) => {
        return <h1 key={index}>{el.value} <span>{el.description}</span></h1>
    });

    return (
        <div className={classes.StatisticBox}>
            {statisticMatric}
        </div>
    )
};

export default statistic;