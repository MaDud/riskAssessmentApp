import React from 'react';

const tableList = props => {
    
    const rowItem = props.list;
    const list = rowItem.map( (el,index) => {
        let no = props.id + index;
        return <td key={no}>{el}</td>
    });


    return (
        <tr>
            {list}
        </tr>
    )
    };

export default tableList;