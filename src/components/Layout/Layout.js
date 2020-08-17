import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase';
import * as action from '../../store/actions/index';


class Layout extends React.Component {

    state = {
        sideDrawerVisible: false
    }

    OpenSideDrawer = () => {
        this.setState({sideDrawerVisible: true})
    }

    CloseSideDrawer = () => {
        this.setState({sideDrawerVisible: false})
    }

    addNew = () => {
        this.props.clearUserPanel();
        this.props.RAtype('new');
    }

    render() {
        const { auth, isAuth, logOut} = this.props;

        return(
            <Auxiliary>
                { isLoaded(auth) ?
                (<Auxiliary>
                    <Toolbar auth = {isAuth} 
                            logStatus = {() => logOut()}
                            clicked = {this.OpenSideDrawer}
                            new = {this.addNew}/>
                    <SideDrawer open = {this.state.sideDrawerVisible}
                                clicked = {this.CloseSideDrawer}
                                auth = {isAuth}
                                new = {this.addNew}
                                logStatus = {() => logOut()}/>
                    <main>
                        {this.props.children}
                    </main>
                </Auxiliary>)
                : null }
            </Auxiliary>
        )
    }
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        isAuth: state.firebase.auth.uid
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        logOut: () => dispatch(action.logOut()),
        clearUserPanel: () => dispatch(action.clearUserPanel()),
        RAtype: type => dispatch(action.RAtype(type))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Layout);