import React from 'react';

import classes from './pagination.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const pagination = props => {

    let amount = Math.ceil(Object.keys(props.data).length/props.range);

    let paginationBtn = [];
    for (let el=1; el<=amount; el++)  {
        paginationBtn.push(el)
    }
    let links = paginationBtn.map((el,index) => {
        let style;
        if (props.page === index+1) {
            style = classes.Active
        } else {
            style = classes.NotActive
        }
        return <li key={index} id={index+1} onClick={()=>props.changePage(index+1)} className={style}>{el}</li>
    })

    return(
        <Auxiliary>
            {amount < 1 ? null:
                        (<ul className={classes.Pagination}>
                            <li onClick={() =>props.changePage(1)} id='1'><FontAwesomeIcon icon='angle-double-left'/></li>
                            {links}
                            <li onClick={() =>props.changePage(paginationBtn.length)} id={paginationBtn.length}><FontAwesomeIcon icon='angle-double-right'/></li>
                        </ul>)
                            }
        </Auxiliary>
    )
};

export default pagination;