import React from 'react';
import classes from './modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

    shouldComponentUpdate (nextProps, nextState) {
        return this.props.show !== nextProps.show
    }
    
    render () {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show}
                            clicked={this.props.clicked}/>
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

export default Modal;