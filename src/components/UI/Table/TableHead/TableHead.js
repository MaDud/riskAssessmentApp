import React from 'react';
import classes from './tableHead.module.css';

const tableHead = props => {
    const heads = props.head.map( (head,index) => {
    return <th key={index}>
                <div className={classes.TableHead}>
                    <span>{head}</span>
                    <div className={classes.Filtering}>
                        <span className={classes.Top} onClick={props.filtering}></span>
                        <span className={classes.Down}></span>
                    </div>
                </div>
            </th>})

    return (
        <thead>
            <tr>
                {heads}
            </tr>
        </thead>
    )
};

export default tableHead

