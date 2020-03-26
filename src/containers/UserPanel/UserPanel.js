import React from 'react';

import instance from '../../instance';

import Auxiliary from '../../hoc/Auxiliary';

import classes from "./userPanel.module.css";

// import TableHead from '../../components/UI/Table/TableHead/TableHead';
// import TableList from '../../components/UI/Table/TableList/TableList';
import Table from '../../components/UI/Table/Table';
import Statistic from '../../components/UI/Statistic/Statistic';
import Button from '../../components/UI/Button/Button';
import ElementNavbar from '../../components/UserNav/ElementNavbar/ElementNavbar';

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
                sort: true}
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

    ActiveTable = () => {
        this.setState({activeBtn: 'active'});
    };

    ReviewTable = () => {
        this.setState({activeBtn: 'review'});
    }; 
    
    OverdueTable = () => {
        this.setState({activeBtn: 'overdue'});
    };

    SortTable = e => {
        const sortData= {...this.state.sorted};
        const targetHead = e.target.parentElement.parentElement.parentElement.id;

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
        

    
    render () {
        
        //wprowadzanie danych z state do statystyk
        const statisticData = {...this.state.statistic};
        let statistic = Object.keys(statisticData).map(el => {
            return statisticData[el]
        });

        //filtrowanie wyników dla poszcególnych tabeli
        let data = {...this.state.assessmentsList};
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
                <div className={classes.Navigation}>
                    <Button btnType={this.state.activeBtn === 'active' ? 'ActiveFocus':'Active'}
                            btnPosition={classes.Active}
                            clicked={this.ActiveTable}>
                            Aktywne
                    </Button>
                    <Button btnType={this.state.activeBtn === 'review' ? 'WarningFocus':'Warning'}
                            btnPosition={classes.Warning}
                            clicked={this.ReviewTable}>
                            Do przeglądu
                    </Button>
                    <Button btnType={this.state.activeBtn === 'overdue' ? 'CancelFocus':'Cancel'}
                            btnPosition={classes.Cancel}
                            clicked={this.OverdueTable}>
                            Przeterminowane
                    </Button>
                    <Button btnType="Submit" 
                            btnPosition={classes.Submit}>
                            Dodaj nową ocenę
                    </Button>
                </div>
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