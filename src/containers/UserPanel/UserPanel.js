import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import Table from "../../components/UI/Table/Table";
import Statistic from '../../components/UI/Statistic/Statistic';

const heads = ["Numer", "Nazwa stanowiska", "Właściciel", "Opcje"];
const values = [[1,2,3,4,], [2,3,4,5]];

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
                <Table head={heads}
                        list={values}/>
            </Auxiliary>
        )
    }
};

export default UserPanel;