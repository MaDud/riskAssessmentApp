import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import Table from "../../components/UI/Table/Table";

const heads = ["Numer", "Nazwa stanowiska", "Właściciel", "Opcje"];
const values = [[1,2,3,4,], [2,3,4,5]];

class UserPanel extends React.Component {

    state = {};


    render () {
        return (
            <Auxiliary>
                <Table head={heads}
                        list={values}/>
            </Auxiliary>
        )
    }
};

export default UserPanel;