import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import logo from '../../../assets/logo.png';
import Button from '../../UI/Button/Button';
import {Link} from 'react-router-dom';
import { connect} from 'react-redux';
import * as action from '../../../store/actions/index';

class Navbar extends React.Component {

    render () {
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
                        <Button btnType = 'Submit' clicked= {() => this.props.logOut()} >
                            Wyloguj się
                        </Button>
                        <Button btnType= 'SubmitFocus'>
                            <Link to= '/authentication'>Logowanie/ Rejestracja</Link>
                        </Button>
                    </Navs>
                </ul>
            </div>
        )
    }
};

const mapPropsToDispatch = dispatch => {
    return {
        logOut: () => dispatch(action.logOut())
    }
}

export default connect(null, mapPropsToDispatch)(Navbar);