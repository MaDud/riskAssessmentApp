import React from 'react';

import classes from './raOutput.module.css';

import Button from '../UI/Button/Button';
import Table from '../UI/Table/Table';

const head0 = ['Numer', 'Stanowisko pracy', 'Zespół oceniający'];
const value0= [[1,2,3]];
const head1 = ['Lokalizacja stanowiska pracy'];
const value1 = [[1]];
const head2 = ['Charakterystyka stanowiska pracy'];
const value2 = [[2]];

const RAOutput = props => {
    return (
        <div className={classes.RAOutput}>
            <div className={classes.Top}>
                <p>Miejsce na logo firmy</p>
                <p>Data sporządzenia <span>data</span></p>
            </div>
            <Table head={head0} list={value0} />
            <Table head={head1} list={value1} />
            <Table head={head2} list={value2} />
            {props.children}
            <Button btnType="Submit">Zamknij</Button>
        </div>
    )
};

export default RAOutput;
