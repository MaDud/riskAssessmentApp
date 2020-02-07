import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './statisticNavbar.module.css';

const statisticNavbar = () => {
    return (
        <div className={classes.Navigation}>
            <Button btnType="Active" btnPosition={classes.Active}>Aktywne</Button>
            <Button btnType="Warning" btnPosition={classes.Warning}>Do przeglądu</Button>
            <Button btnType="Cancel" btnPosition={classes.Cancel}>Przeterminowane</Button>
            <Button btnType="Submit" btnPosition={classes.Submit}>Dodaj nową ocenę</Button>
        </div>
    )
};

export default statisticNavbar;