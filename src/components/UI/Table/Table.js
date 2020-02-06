import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

const table = props => {
    const tableHead = props.head.map( (head,index) => {
        return <th key={index}>{head}</th>
    });

    return (
        <Auxiliary>
            <table>
                <thead>
                    <tr>
                        {tableHead}
                    </tr>
                </thead>
                <tbody>
                        
                </tbody>
            </table>
        </Auxiliary>
    )
};

export default table;