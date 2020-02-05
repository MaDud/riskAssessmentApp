import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import classes from './input.module.css';

const input = props => {

    let newInput = null;

    switch (props.elementType) {
        case 'input': 
            newInput = <input className={[classes.Style, classes.Input, props.inputPosition].join(' ')}
                              onChange={props.changed}
                              name={props.name}
                              id={props.id}
                              value={props.value}/>
            break;
        case 'textarea':
            newInput = <textarea className={[classes.Style, classes.Textarea, props.inputPosition].join(' ')}
                                onChange={props.changed}
                                name={props.name}
                                id={props.id}
                                value={props.value}/>
            break;
        case 'select':
            let optionArray = props.options.map( el => {
                return <option key={el.value} value={el.value}>{el.displayValue}</option>
                });
            newInput = <select className={[classes.Style, props.inputPosition].join(' ')}
                                onChange={props.changed}
                                name={props.name}
                                id={props.id}
                                value={props.value}>
                                {optionArray}
                        </select>;
            break;            
        default:
            newInput = <input className={[classes.Style, classes.Input, props.inputPosition].join(' ')}
            onChange={props.changed}
            name={props.name}
            id={props.id}
            value={props.value}/>
    }

    return (
        <Auxiliary>
            <label htmlFor={props.for} 
                   className={props.labelPosition}>
                   {props.label}
            </label>
            {newInput}
        </Auxiliary>
    )
};

export default input;