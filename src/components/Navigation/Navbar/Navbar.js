import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import NavigationContext from '../../../context/NavigationContext';

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
                    <NavigationContext.Consumer>
                        { context => (
                            !context.isAuth ? 
                                (<Auxiliary>
                                    <Navs>
                                        <Button btnType= 'SubmitFocus'>
                                            <Link to= '/authentication'>Logowanie / Rejestracja</Link>
                                        </Button>
                                    </Navs>
                                </Auxiliary>)   
                                : 
                                (<Auxiliary>
                                    <Navs onClick= {context.addNew}>
                                        <Link to ='/riskAssessmentForm'>Nowa ocena</Link>
                                    </Navs>
                                    <Navs>
                                        <Button btnType = 'Submit' clicked= {context.logOut} >
                                            Wyloguj się
                                        </Button>
                                    </Navs>
                                </Auxiliary>)
                        )}
                    </NavigationContext.Consumer>
                </ul>
         
        )
}

export default navbar
