import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import classes from './table.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const table = props => {

     const tableHead = props.columns.map( (head) => {

        let sortIcon = null;
        if (head.id === props.sortOption.id) {
            if (props.sortOption.sortType === 'asc') {
                sortIcon = <FontAwesomeIcon icon='sort-up' className={classes.Sorted}/>;
            } else {
                sortIcon = <FontAwesomeIcon icon='sort-down' className={classes.Sorted}/>}
        } else {
            sortIcon = sortIcon = <FontAwesomeIcon icon='sort'/>
        }

        return <th key={head.id} id={head.id} onClick={props.sortable ? props.sort : null}>
                    <div className={classes.Head}>
                        <span className={classes.Text}>{head.label}</span>
                        {props.sortable ? <div className={classes.Filtering}>{sortIcon}</div> : null}
                    </div>
               </th>}
    );

    const data = props.rows;
    let dataToSort = Object.values(data);

    let sortedData = dataToSort.sort((a,b) => {
        if (a[props.sortOption.id] === undefined || b[props.sortOption.id] === undefined) {
            return 1
        } else {
        return a[props.sortOption.id].toLowerCase().localeCompare(b[props.sortOption.id].toLowerCase())
    }});

    if (props.sortOption.sortType !== 'asc') {
        sortedData.reverse()
    }

    let dataOutput={};  
    for (let el in sortedData) {
        for (let sth in data) {
            if (sortedData[el][props.sortOption.id] === data[sth][props.sortOption.id])
            dataOutput[sth] = data[sth]
        }
    }

    const tableList = Object.keys(dataOutput).map( row => {
            return  <tr key={row} id={row}>
                        {Object.keys(props.rows[row]).map( (cell, index) => {
                        return <td key={index} headers={cell}>{props.rows[row][cell]}</td>})}
                    </tr>
        });    

    return (
        <Auxiliary>
            <table className={[classes.Table, props.table].join(' ')}>
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