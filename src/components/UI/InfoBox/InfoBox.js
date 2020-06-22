import React from 'react';
import classes from './infoBox.module.css';
import Auxiliary from '../../../hoc/Auxiliary';

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
                {this.props.children}
            </div>
        </Auxiliary>
    )}
}

export default InfoBox;