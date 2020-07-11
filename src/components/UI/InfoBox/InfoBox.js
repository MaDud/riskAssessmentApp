import React from 'react';
import classes from './infoBox.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class InfoBox extends React.Component {
    
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children
    }
    render() {
    return (
        <Auxiliary>
            <Backdrop show={this.props.show}/>
            {this.props.show ? 
                <div className={classes.InfoBox}></div>:null}
            <div className={classes.Box}
                style={{
                    opacity: this.props.show ? '1':'0',
                    transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)'
            }}>
                {this.props.children}
            </div>
        </Auxiliary>
    )}
}

export default InfoBox;