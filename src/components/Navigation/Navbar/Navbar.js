import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import logo from '../../../assets/logo.png';
import Button from '../../UI/Button/Button';

const navbar = props => {
    return (
        <div className={classes.Navigation}>
            <img src={logo} />
            <ul className={classes.Navbar}>
                <Navs>Metoda</Navs>
                <Navs>
                    <div className={classes.Login}>
                        Zaloguj się
                    </div>
                </Navs>
                <Navs>
                    <Button btnType= 'SubmitFocus' onClick={props.register}>
                        Zarejestruj się
                    </Button>
                </Navs>
            </ul>
        </div>
    )
};

export default navbar;