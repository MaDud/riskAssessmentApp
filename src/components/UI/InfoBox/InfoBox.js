import React from 'react';
import classes from './infoBox.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../Button/Button';

class InfoBox extends React.Component {
    
    shouldComponentUpdate (nextProps, nextState) {
        console.log('prevProps', this.props.archiveInfo);
        console.log('nextProps', nextProps.archiveInfo)
        return this.props.archiveInfo !== nextProps.archiveInfo
    }
    render() {
    return (
        <Auxiliary>
            {this.props.archiveInfo ? 
                <div className={classes.InfoBox}></div>:null}
            <div className={classes.Box}
                style={{
                    opacity: this.props.archiveInfo ? '1':'0',
                    transform: this.props.archiveInfo ? 'translateY(0)': 'translateY(-100vh)'
            }}>
                <p>{this.props.text}</p>
                <p>{this.props.text1}</p>
                <div>
                    <Button btnType='Active' clicked={this.props.continue}>{this.props.continueText}</Button>
                    <Button btnType='Warning' clicked={this.props.cancel}>{this.props.cancelText}</Button>
                </div>
            </div>
        </Auxiliary>
    )}
}

export default InfoBox;