import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import Navbar from '../Navigation/Navbar/Navbar';

const layout = props => {
    return(
        <Auxiliary>
            <Navbar/>
            <main>
                {props.children}
            </main>
        </Auxiliary>
    )
};

export default layout;