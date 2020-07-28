import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import logo from '../../../assets/logo.png';
import Button from '../../UI/Button/Button';
import {Link} from 'react-router-dom';

const navbar = props => {
    return (
        <div className={classes.Navigation}>
            <div className={classes.Logo}>
                <Link to = '/'>
                    <img src={logo} />
                </Link>
            </div>
            <ul className={classes.Navbar}>
                <Navs>Metoda</Navs>
                <Navs>
                    <div className={classes.Login}>
                        <Link to= '/authentication' >Zaloguj się</Link>
                    </div>
                </Navs>
                <Navs>
                    <Button btnType= 'SubmitFocus'>
                        <Link to= '/authentication'>Zarejestruj się</Link>
                    </Button>
                </Navs>
            </ul>
        </div>
    )
};

export default navbar;