import React from 'react';

const NavigationContext = React.createContext({
    isAuth: false,
    logOut: () => {},
    addNew: () => {}
});

export default NavigationContext

