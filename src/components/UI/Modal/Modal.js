import React from 'react';
import classes from './modal.modula.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from '*.module.css';

class Modal extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
        console.log('nextProps', nextProps.show);
        console.log('props', this.props.show)
        return this.props.show !== nextProps.show
    }
    
    render () {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show}/>
                <div className={classes.Modal}
                    style={{
                        opacity: this.props.show ? '1':'0',
                        transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)'
                }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}

export default modal;