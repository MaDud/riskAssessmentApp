import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import Table from "../../components/UI/Table/Table";
import Statistic from '../../components/UI/Statistic/Statistic';
import StatisticNavbar from '../../components/UserNav/StatisticNavbar/StatisticNavbar';
import ElementNavbar from '../../components/UserNav/ElementNavbar/ElementNavbar';

const heads = ["Numer", "Nazwa stanowiska", "Właściciel", "Opcje"];
const values = [[1,2,3], [2,3,4]];
for (let el in values) {
    values[el].push(<ElementNavbar/>);;
    console.log(values)
}

const matric = [{value:30, description: "Aktywnych ocen ryzyka zawodowego"},
                {value:5, description: "Wymagających przeglądu ocen ryzyka zawodowego"},
                {value:0, description: "Przeterminowanych ocen ryzyka zawodowego"},
                ];

class UserPanel extends React.Component {

    state = {};


    render () {
        return (
            <Auxiliary>
                <Statistic matric={matric}/>
                <StatisticNavbar />
                <Table head={heads}
                       list={values}/>
            </Auxiliary>
        )
    }
};

export default UserPanel;