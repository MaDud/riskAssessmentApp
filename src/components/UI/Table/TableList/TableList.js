import React from 'react';

const tableList = props => {
    const list = props.list.map( (el,index) => {
        return <td key={index}>{el}</td>});

    return (
        <tbody>
            <tr key={props.key}>
                {list}
            </tr>
        </tbody>
    )
    };

export default tableList;