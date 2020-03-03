import React from 'react';

const tableHead = props => {
    const heads = props.head.map( (head,index) => {
    return <th key={index}>{head}</th>})

    return (
        <thead>
            <tr>
                {heads}
            </tr>
        </thead>
    )
};

export default tableHead

