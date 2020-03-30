import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import classes from './table.module.css';

// const data = {
//     col: [{
//         label: 'Numer',
//         id: 'number'
//         },
//         {label: 'Stanowisko',
//         id: 'position'},
//         {label: 'Właściciel',
//         id: 'owner'}
//     ],
//     rows: [{
//         number: 1,
//         position: 'Stanowisko administracyjno- biurowe',
//         owner: 'Aaaa'
//         },
//         {number: 2,
//         position: 'Stanowisko inżyniryjne',
//         owner: 'Bbbb'
//         }
//     ]
// }

const tableHeads = [{
    label: 'Numer',
    id: 'number'
    },
    {label: 'Stanowisko',
    id: 'position'},
    {label: 'Właściciel',
    id: 'owner'}
]

const tableData = {11:{
    number: 1,
    position: 'Stanowisko administracyjno- biurowe',
    owner: 'Aaaa'
    },
    12:{number: 2,
    position: 'Stanowisko inżyniryjne',
    owner: 'Bbbb'
    }
}

const table = props => {

    // let sortIcon = null;
    // switch (props.sortType) {
    //     case 'asc':
    //         sortIcon = <i class="fas fa-sort-up"></i>;
    //         break;
    //     case 'dsc' :
    //         sortIcon = <i class="fas fa-sort-down"></i>;
    //         break;
    //     default:
    //         sortIcon = <i class="fas fa-sort"></i>;
    // }

    const tableHead = props.columns.map( (head) => {

        let sortIcon = null;
        if (head.id === props.sortOption.id) {
            if (props.sortOption.sortType === 'asc') {
                sortIcon = <i className={["fas fa-sort-up", classes.Sorted].join(' ')}></i>;
            } else {
                sortIcon = <i className={["fas fa-sort-down", classes.Sorted].join(' ')}></i>}
        } else {
            sortIcon = sortIcon = <i className="fas fa-sort"></i>
        }

        return <th key={head.id} id={head.id}>
                    <div className={classes.Head}>
                        <span className={classes.Text}>{head.label}</span>
                        {props.sortable ? <span onClick={props.sort} className={classes.Filtering}>{sortIcon}</span> : null}
                    </div>
               </th>}
    );

    const data = props.rows;
    let test = Object.values(data);
    let dataToSort = [];
    for (let el in test) {
        let value = test[el][props.sortOption.id];
        console.log(value)
        dataToSort.push(test[el][props.sortOption.id])
    }
    //sortowanie
    dataToSort.sort( (a,b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase())
    });
    if (props.sortOption.sortType !== 'asc') {
        dataToSort.reverse()
    }

    //rekonstruowanie danych do tablicy
    let finalData={};  
        for (let el in dataToSort) {
            for (let sth in data) {
                if (dataToSort[el] === data[sth][props.sortOption.id])
                finalData[sth] = data[sth]
            }
    }


    const tableList = Object.keys(finalData).map( row => {
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