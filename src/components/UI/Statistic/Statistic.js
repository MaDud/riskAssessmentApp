import React from 'react';

import classes from './statistic.module.css';

const statistic = props => {

    let statisticMatric = Object.keys(props.matric).map( (el, index) => {
        return <h1 key={el} id={el} onClick={props.clicked}>{props.matric[el].value} <span>{props.matric[el].description}</span></h1>
    });
    console.log(statisticMatric)

    return (
        <div className={classes.StatisticBox}>
            {statisticMatric}
        </div>
    )
};

export default statistic;