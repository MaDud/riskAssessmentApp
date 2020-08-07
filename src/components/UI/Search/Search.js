import React from 'react';
import classes from './search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import Input from '../Input/Input';

const search = (props) => {
   
    return (
        <div className={classes.Search}>
            <Button clicked={props.changeSearch}
                    btnType={props.active ? 'SubmitFocus' : 'Submit'}>
                <FontAwesomeIcon icon='search'/> 
            </Button>  
            {props.active? (<div className={classes.SearchBox}>
                                <Input elementType= 'input'
                                    type='text'
                                    placeholder='Szukaj...'
                                    changed={props.changed}
                                    value={props.value}
                                    autoFocus={true}
                                    />
                                <div className={classes.SearchClose} onClick={props.closeSearch}>
                                    <FontAwesomeIcon icon='times' className={props.search ? classes.SearchActive : classes.SearchNotActive}/>  
                                </div>
                            </div>) 
                            :null}  
        </div>
    )
};

export default search