import React from 'react';

import Navs from './Navs/Navs';
import classes from './navbar.module.css';
import logo from '../../../assets/logo.png';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import * as action from '../../../store/actions/index';
import Auxiliary from '../../../hoc/Auxiliary';

class Navbar extends React.Component {

    render () {
        const { auth } = this.props;
        
        return (
            <div className={classes.Navigation}>
                    <div className={classes.Logo}>
                        <Link to = '/'>
                            <img src={logo} />
                        </Link>
                    </div>
                    <ul className={classes.Navbar}>
                        <Navs>
                            <Link to='/process'>Opis procesu</Link>
                        </Navs>
                        <Navs>
                            <Link to ='/'>Panel użytkownika</Link>
                        </Navs>
                        { !auth.uid ? (<Auxiliary>
                                            <Navs>
                                                <Button btnType= 'SubmitFocus'>
                                                    <Link to= '/authentication'>Logowanie / Rejestracja</Link>
                                                </Button>
                                            </Navs>
                                        </Auxiliary>)
                                        : 
                                        (<Auxiliary>
                                            <Navs>
                                                <Link to ='/riskAssessmentForm'>Nowa ocena</Link>
                                            </Navs>
                                            <Navs>
                                                <Button btnType = 'Submit' clicked= {() => this.props.logOut()} >
                                                    Wyloguj się
                                                </Button>
                                            </Navs>
                                        </Auxiliary>)}
                    </ul>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        logOut: () => dispatch(action.logOut())
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Navbar);