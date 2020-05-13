import React from 'react';

import classes from './statistic.module.css';

const statistic = props => {

    return (
        <div className={classes.StatisticBox}>
            <h1 id='active' className={classes.Active} onClick={props.clicked}>{props.active}<span>Aktywnych ocen ryzyka zawodowego</span></h1>
            <h1 id='review' className={classes.Review} onClick={props.clicked}>{props.review}<span>Wymagających przeglądu ocen ryzyka zawodowego</span></h1>
            <h1 id='overdue' className={classes.Overdue} onClick={props.clicked}>{props.overdue}<span>Przeterminowanych ocen ryzyka zawodowego</span></h1>
        </div>
    )
    
};


export default statistic;