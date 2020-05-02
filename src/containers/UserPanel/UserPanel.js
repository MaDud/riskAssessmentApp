import React from 'react';

import instance from '../../instance';
import classes from "./userPanel.module.css";

import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary';
import Table from '../../components/UI/Table/Table';
import Statistic from '../../components/UI/Statistic/Statistic';
import UserNav from '../../components/UserNav/UserNav';
import Search from '../../components/UI/Search/Search';

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
    
    render () {
        
        //wyszukwanie i filtrowanie wyników dla poszczególnych tabeli
        const assessmentsList = {...this.state.assessmentsList};
        let data= {};
        for (let key in assessmentsList) {
            const searchValue = this.props.search.searchValue;
            if (searchValue) {
                if ((assessmentsList[key].position && assessmentsList[key].position.toUpperCase().indexOf(searchValue)>-1) ||
                    (assessmentsList[key].no && assessmentsList[key].no.toUpperCase().indexOf(searchValue)>-1) ||
                    (assessmentsList[key].owner && assessmentsList[key].owner.toUpperCase().indexOf(searchValue)>-1)) {
                    data[key] = assessmentsList[key]}
            } else {
                data = assessmentsList;
            }
        }
        let list = Object.keys(data).filter( el => {
            if(this.props.user === 'review') {
                return data[el].review } 
            else if (this.props.user === 'overdue') {
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
                <Statistic matric={this.state.statistic}
                            clicked={(e) => this.props.changeView(e)}/>
                <div className={classes.UserNav}>
                    <UserNav clicked={(e) => this.props.changeView(e)}
                                activeBtn= {this.props.user}/>
                    <Search btnType= 'Submit'
                            search={this.props.search.searchValue}
                            changed={(e) => this.props.searchValue(e)}
                            value={this.props.search.searchValue}
                            closeSearch={this.props.clearSearch}
                            changeSearch={this.props.searchBtn}
                            active={this.props.search.searchField} />
                </div>
                <Table table={classes.Table}
                        columns={this.state.tableHeads}
                        rows={rowData}
                        sortable= {this.props.sorted.sort}
                        sortOption= {this.props.sorted}
                        sort={e => this.props.sortData(e)}
                        changePage={this.props.changePage}
                        page={this.props.pagination.page}
                        range={this.props.pagination.range}
                        
                    />
            </Auxiliary>
        )
    }
};


const mapStateToProps = state => {
    return {
        user: state.userPanel.activeBtn,
        search: state.userPanel.search,
        pagination: state.userPanel.pagination,
        sorted: state.userPanel.sorted
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeView: (event) => dispatch (action.changeView(event)),
        searchBtn: () => dispatch(action.search()),
        clearSearch: () => dispatch({type: 'CLEAR_SEARCH'}),
        searchValue: (searchValue) => dispatch(action.searchValue(searchValue)),
        changePage: (page) => dispatch(action.changePage(page)),
        sortData: (event) => dispatch(action.sortData(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);