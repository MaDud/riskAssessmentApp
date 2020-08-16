import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';
import Navbar from '../Navbar/Navbar';
import classes from './sideDrawer.module.css';

const sideDrawer = props => {

    let sideDraweStyle = [classes.SideDrawer, classes.Close];
    if (props.open) {
        sideDraweStyle = [classes.SideDrawer, classes.Open]
    }

    return (
        <Auxiliary>
            <Backdrop show = {props.open} clicked = {props.clicked}/>
            <div className = {sideDraweStyle.join(' ')} onClick = {props.clicked}>
                <Navbar auth = {props.auth}
                        new = {props.new} />
            </div>
        </Auxiliary>
    )
}

export default sideDrawer