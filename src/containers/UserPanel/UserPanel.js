import React from 'react';

import instance from '../../instance';

import Auxiliary from '../../hoc/Auxiliary';

import classes from "./userPanel.module.css";

import TableHead from '../../components/UI/Table/TableHead/TableHead';
import TableList from '../../components/UI/Table/TableList/TableList';
import Statistic from '../../components/UI/Statistic/Statistic';
import StatisticNavbar from '../../components/UserNav/StatisticNavbar/StatisticNavbar';
import ElementNavbar from '../../components/UserNav/ElementNavbar/ElementNavbar';

class UserPanel extends React.Component {

    state = {
        tableHeads: ["Numer", "Nazwa stanowiska", "Właściciel", "Opcje"],
        assessmentsList: null,
        statistic: 
            {active: {value: 0, description: "Aktywnych ocen ryzyka zawodowego"},
            review: {value: 0, description: "Wymagających przeglądu ocen ryzyka zawodowego"},
            overdue: {value: 0, description: "Przeterminowanych ocen ryzyka zawodowego"}}
    };

    componentDidMount () {
        instance.get('/riskAssessment.json')
            .then(response => {
                const data = response.data;
                let values = {};

                for (let id in data) {
                    if (data[id].status === 'active') {
                    const target = data[id].assesmentData;
                    values[id] = {no: target.number + ' v.' + target.version,
                                position: target.position,
                                owner: target.owner,
                                nextReview: target.reviwDate,
                                status: data[id].status}
                }};

                this.setState({assessmentsList:values})
            })
            .catch(error => console.log(error))
    }


    render () {

        //wprowadzanie danych z state do statystyk
        const statisticData = {...this.state.statistic};
        let statistic = Object.keys(statisticData).map(el => {
            return statisticData[el]
        });

        //wprowadzanie danych do tabeli
        const tableData = {...this.state.assessmentsList};
        let list = Object.keys(tableData).map(el => {
            return {key: el,
                    values: [tableData[el].no, tableData[el].position, tableData[el].owner, <ElementNavbar/>]}
        })
        let tableList = list.map(el => {
            return <TableList key={el.key} list={el.values}/>
        })

        return (
            <Auxiliary>
                <Statistic matric={statistic}/>
                <StatisticNavbar />
                <table className={classes.Table}>
                    <TableHead head={this.state.tableHeads}/>
                    {tableList}
                </table>
            </Auxiliary>
        )
    }
};

export default UserPanel;