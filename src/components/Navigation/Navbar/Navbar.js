import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary';

const navbar = props => {
      
        return (
                <ul className={classes.Navbar}>
                    <Navs>
                        <Link to='/process'>Opis procesu</Link>
                    </Navs>
                    <Navs>
                        <Link to ='/'>Panel użytkownika</Link>
                    </Navs>
                    { !props.auth ? (<Auxiliary>
                                        <Navs>
                                            <Button btnType= 'SubmitFocus'>
                                                <Link to= '/authentication'>Logowanie / Rejestracja</Link>
                                            </Button>
                                        </Navs>
                                    </Auxiliary>)
                                    : 
                                    (<Auxiliary>
                                        <Navs onClick= {props.new}>
                                            <Link to ='/riskAssessmentForm'>Nowa ocena</Link>
                                        </Navs>
                                        <Navs>
                                            <Button btnType = 'Submit' clicked= {props.clicked} >
                                                Wyloguj się
                                            </Button>
                                        </Navs>
                                    </Auxiliary>)}
                </ul>
         
        )
}

export default navbar
