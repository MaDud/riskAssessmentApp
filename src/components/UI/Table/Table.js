import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import classes from './table.module.css';

const table = props => {
    const tableHead = props.head.map( (head,index) => {
        return <th key={index}>{head}</th>
    });

    const tableList = props.list.map( (el,index) => {
        return <tr key={index}>{el.map((item, index) =>{
                return <td key={index}>{item}</td>})}
                </tr>
    })

    return (
        <Auxiliary>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {tableHead}
                    </tr>
                </thead>
                <tbody>
                        {tableList}
                </tbody>
            </table>
        </Auxiliary>
    )
};

export default table;