import React from 'react';
import Navbar from '../Navbar/Navbar';
import classes from './toolbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const toolbar = props => {

    return(
        <div className={classes.Navigation}>
            <div className={classes.Logo}>
                <Link to = '/'>
                    <img src={logo} alt='logo'/>
                </Link>
            </div>
            <nav>
                <Navbar auth = {props.auth}
                        clicked = {props.logStatus}
                        new = {props.new}/>
            </nav>
            <div className={classes.SideMenu} onClick = {props.clicked}>
                <FontAwesomeIcon icon = 'ellipsis-v' />
            </div>
        </div>)
}

export default toolbar