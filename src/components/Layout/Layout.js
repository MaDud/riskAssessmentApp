import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Navbar from '../Navigation/Navbar/Navbar';
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase';

const layout = props => {
    const { auth } = props;

    return(
        <Auxiliary>
            { isLoaded(auth) ?
            (<Auxiliary>
                <Navbar/>
                <main>
                    {props.children}
                </main>
            </Auxiliary>)
            : null }
        </Auxiliary>
    )
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(layout);