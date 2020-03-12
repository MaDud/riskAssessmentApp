import React from 'react';
import classes from './tableHead.module.css';

const tableHead = props => {
    const heads = props.head.map( (head,index) => {
    return <th key={index}>
                <div className={classes.TableHead}>
                    <span>{head}</span>
                    <i class="fas fa-chevron-circle-down"></i>
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

