import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import Input from '../Input/Input';

const search = (props) => {
    return (
        <div className={classes.Search}>
            <Button clicked={props.changeSearch}
                    btnType={props.btnType}>
                <FontAwesomeIcon icon='search'/> 
            </Button>  
            {props.active? (<Auxiliary>
                                <Input elementType= 'input'
                                    type='text'
                                    placeholder='Szukaj...'
                                    changed={props.changed}
                                    value={props.value} />
                                <div className={classes.SearchClose} onClick={props.closeSearch}>
                                    <FontAwesomeIcon icon='times' className={props.search ? classes.SearchActive : classes.SearchNotActive}/>  
                                </div>
                            </Auxiliary>) 
                            :null}  
        </div>
    )
};

export default search