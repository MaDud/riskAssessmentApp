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

    const tableHead = props.columns.map( (head) => {
        return <th key={head.id} id={head.id}>{head.label}</th>}
    );

    const tableList = Object.keys(props.rows).map( row => {
            return  <tr key={row} id={row}>
                        {Object.keys(props.rows[row]).map( (cell, index) => {
                        return <td key={index} headers={cell}>{props.rows[row][cell]}</td>})}
                    </tr>
        });
    

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