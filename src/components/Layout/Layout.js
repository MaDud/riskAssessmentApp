import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase';
import * as action from '../../store/actions/index';
import NavigationContext from '../../context/NavigationContext';


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
        this.props.cleanUserPanel();
        this.props.RAtype('new');
    }
    

    exit = () => {
        this.props.logOut();
        this.props.changeView('active')
    }

    render() {
        const { auth, isAuth} = this.props;

        return(
            <Auxiliary>
                { isLoaded(auth) ?
                (<Auxiliary>
                    <NavigationContext.Provider value = {{isAuth: isAuth,
                                                        logOut: this.exit,
                                                        addNew: this.addNew}}>
                        <Toolbar 
                        // auth = {isAuth} 
                                // logStatus = {() => this.exit()}
                                clicked = {this.OpenSideDrawer}
                                // new = {this.addNew}
                                />
                        <SideDrawer open = {this.state.sideDrawerVisible}
                                    clicked = {this.CloseSideDrawer}
                                    // auth = {isAuth}
                                    // new = {this.addNew}
                                    // logStatus = {() => this.exit()}
                                    />
                    </NavigationContext.Provider>
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
        changeView: (path) => dispatch(action.changeView(path)),
        cleanUserPanel: () => dispatch(action.cleanUserPanel()),
        RAtype: type => dispatch(action.RAtype(type))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Layout);