import React from 'react';

import instance from '../../instance';
import classes from "./userPanel.module.css";

import Auxiliary from '../../hoc/Auxiliary';
import Table from '../../components/UI/Table/Table';
import Statistic from '../../components/UI/Statistic/Statistic';
import UserNav from '../../components/UserNav/UserNav';

class UserPanel extends React.Component {

    state = {
        tableHeads: [{label:'Numer', id:'number'},
                    {label: 'Nazwa stanowiska', id: 'position'}, 
                    {label: 'Właściciel', id:'owner'}],
        assessmentsList: null,
        statistic: 
            {active: {value: 0, description: "Aktywnych ocen ryzyka zawodowego"},
            review: {value: 0, description: "Wymagających przeglądu ocen ryzyka zawodowego"},
            overdue: {value: 0, description: "Przeterminowanych ocen ryzyka zawodowego"}},
        activeBtn: 'active',
        sorted: {id: 'number',
                sortType: 'asc',
                sort: true},
        searchValue: null
    };

    componentDidMount () {
        instance.get('/riskAssessment.json')
            .then(response => {
                const data = response.data;
                const date = new Date();
                let values = {};
                let active = 0;
                let review = 0;
                let overdue = 0;
                const statistics = {...this.state.statistic};
                const activeStatistic = {...this.state.statistic.active};
                const reviewStatistic = {...this.state.statistic.review};
                const overdueStatistic = {...this.state.statistic.overdue};
                
                for (let id in data) {

                    const target = data[id].assesmentData;
                    const reviewDate = new Date(target.reviwDate);
                    const timeDiffrence= reviewDate-date;
                    const days= Math.floor(timeDiffrence/(1000 * 60 * 60 * 24));

                    
                    if (data[id].status === 'active') {
                        values[id] = {no: target.number + ' v.' + target.version,
                                position: target.position,
                                owner: target.owner,
                                nextReview: reviewDate,
                                status: data[id].status,
                                review: days <= 30 ? true:false,
                                overdue: days < 0 ? true:false};
                       
                        active += 1;

                        if (values[id].review) {
                            review += 1
                        } 
                        if (values[id].overdue) {
                            overdue += 1
                        }
                }};

                this.setState({assessmentsList: values}) 

                //timer dla statystyk
                let activeCount = 0;
                let reviewCount = 0;
                let overdueCount = 0;
                this.timer = setInterval( () => {
                    if (activeCount < active) {
                        activeCount += 1;
                    }
                    if (reviewCount < review) {
                        reviewCount += 1;
                    }
                    if (overdueCount < overdue) {
                        overdueCount += 1
                    }

                    activeStatistic.value = activeCount;
                    reviewStatistic.value = reviewCount;
                    overdueStatistic.value = overdueCount;
    
                    statistics.active = activeStatistic;
                    statistics.review = reviewStatistic;
                    statistics.overdue = overdueStatistic;
    
                    this.setState({
                        statistic: statistics
                    })  

                    if (active === activeCount && review === reviewCount && overdue === overdueCount) {
                        clearInterval(this.timer)
                    }
                }, 400)
  
            })
            .catch(error => console.log(error))
    } 

    DataView = (e) => {
        const buttonId = e.target.id
        this.setState({activeBtn: buttonId})
    }

    SortTable = e => {
        const sortData= {...this.state.sorted};
        const targetHead = e.target.parentElement.parentElement.id;

        if (targetHead === sortData.id) {
            if (sortData.sortType === 'asc') {
                sortData.sortType = 'desc'
            } else {
                sortData.sortType = 'asc'
            }
        } else {
            sortData.id = targetHead;
            sortData.sortType = 'asc';
        }

        this.setState({sorted:sortData})      
    }
    
    SearchData = e => {
        e.preventDefault();
        let searchValue = e.target.value.trim().toLowerCase();
        this.setState({searchValue:searchValue})
    }
    
    render () {
        
        //wprowadzanie danych z state do statystyk
        const statisticData = {...this.state.statistic};
        let statistic = Object.keys(statisticData).map(el => {
            return statisticData[el]
        });

        //wyszukwanie i filtrowanie wyników dla poszczególnych tabeli
        const assessmentsList = {...this.state.assessmentsList};
        let data= {};
        for (let key in assessmentsList) {
            const searchValue = this.state.searchValue;
            if (searchValue) {
                if ((assessmentsList[key].position && assessmentsList[key].position.toLowerCase().indexOf(searchValue)>-1) ||
                    (assessmentsList[key].no && assessmentsList[key].no.toLowerCase().indexOf(searchValue)>-1) ||
                    (assessmentsList[key].owner && assessmentsList[key].owner.toLowerCase().indexOf(searchValue)>-1)) {
                    data[key] = assessmentsList[key]}
            } else {
                data = assessmentsList;
            }
        }
        let list = Object.keys(data).filter( el => {
            if(this.state.activeBtn === 'review') {
                return data[el].review } 
            else if (this.state.activeBtn === 'overdue') {
                return data[el].overdue }
            else return el
        });

        //wprowadzanie danych do tabel
        let rowData = {}
        for (let el in list) {
            rowData[list[el]] = {number: data[list[el]].no,
                                position: data[list[el]].position,
                                owner: data[list[el]].owner}
        }

        return (
            <Auxiliary>
                <Statistic matric={statistic}/>
                <UserNav clicked={(e) => this.DataView(e)}
                         changed={(e) => this.SearchData(e)}
                         activeBtn= {this.state.activeBtn}/>
                <Table table={classes.Table}
                        columns={this.state.tableHeads}
                        rows={rowData}
                        sortable= {this.state.sorted.sort}
                        sortOption= {this.state.sorted}
                        sort={e => this.SortTable(e)}
                    />
            </Auxiliary>
        )
    }
};

export default UserPanel;