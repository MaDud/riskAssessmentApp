import React from 'react';

import classes from "./userPanel.module.css";
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary';
import ErrorBoundaries from '../../hoc/ErrorBoundaries/ErrorBoundaries';
import Table from '../../components/UI/Table/Table';
import Statistic from '../../components/Statistic/Statistic';
import UserNav from '../../components/UserNav/UserNav';
import Search from '../../components/UI/Search/Search';


const tableHeads = [{label:'Numer', id:'number'},
                    {label: 'Nazwa stanowiska', id: 'position'}, 
                    {label: 'Właściciel', id:'owner'}];

class UserPanel extends React.Component {

    state = {
        active: 0,
        review: 0,
        overdue: 0,
        interval: null
    }

    componentDidMount () {
        this.props.initRAList();
        this.props.cleanState()
        const interval = setInterval(this.timer, 80);
        this.setState({interval:interval})}

    componentDidUpdate (prevProps, prevState) {
        return prevProps.searchBtn !== this.props.searchBtn
    }
        

    timer = () => {
        let active = this.state.active;
        let overdue = this.state.overdue;
        let review = this.state.review;

        if (active < this.props.statistic.active) {
            this.setState({active: active + 1})
        if (overdue < this.props.statistic.overdue) {
            this.setState({overdue: overdue + 1})}
        if (review < this.props.statistic.review) {
            this.setState({review: review + 1})}
        } if (active === this.props.statistic.active &&
              overdue === this.props.statistic.overdue &&
              review === this.props.statistic.review) {
            clearInterval(this.interval)
        }

    }
    
    addNew = () => {
        this.props.clearUserPanel();
        this.props.RAtype('new');
        this.props.history.push('/riskAssessmentForm')
    }

    seeRow = e => {
        let id = e.target.parentElement.id;
        this.props.clearUserPanel();
        if (this.props.user !== 'drafts') {
            this.props.RAtype('preview')
            this.props.history.push('/riskAssessment/' + id)   
        } else {
            let version = this.props.draftsList[id].no;
            let num = version.match(/[0-9]{1,}$/);
            this.props.RAtype('draft')
            this.props.history.push('/riskAssessmentForm/'+ id +'/' + num)
        }
    }

    changeView = e => {
        const target = e.target.id;

        if (this.state[target] !== 0) {
            this.props.changeView(e)
        }
    }

    
    render () {

        console.log(this.state.active)
        //wyszukwanie i filtrowanie wyników dla poszczególnych tabeli
        const assessmentsList = this.props.assessmentsList;
        let data= {};
        for (let key in assessmentsList) {
            const searchValue = this.props.search.searchValue;
            if (searchValue) {
                if ((assessmentsList[key].position.toUpperCase().indexOf(searchValue)>-1) ||
                    (assessmentsList[key].no.toString().indexOf(searchValue)>-1) ||
                    (assessmentsList[key].owner.toUpperCase().indexOf(searchValue)>-1)) {
                         data[key] = assessmentsList[key]
                }
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

        //wprowadzanie danych do tabeli 
        let rowData = {}
        if (this.props.user !== 'drafts') {
        for (let el in list) {
            rowData[list[el]] = {number: data[list[el]].no,
                                position: data[list[el]].position,
                                owner: data[list[el]].owner}
        }} else {
            rowData = this.props.draftsList
        }

        //wyświetlanie danych w zależności od statusu logowania
        let userNavigation = (<Auxiliary>
                                <h1 className= {classes.RAtitle}>Rejestr ocen ryzyka zawodowego</h1>
                                <div className={classes.UserNav}>
                                <Search 
                                                search={this.props.search.searchValue}
                                                changed={(e) => this.props.searchValue(e)}
                                                value={this.props.search.searchValue}
                                                closeSearch={this.props.clearSearch}
                                                active={true}/>
                                </div>
                            </Auxiliary>)
                            
        if (this.props.isAuth) {
            userNavigation = (<Auxiliary>
                                <Statistic matric={this.props.statistic}
                                    clicked={(e) => this.changeView(e)}
                                    active = {this.state.active}
                                    review = {this.state.review}
                                    overdue ={this.state.overdue}/>
                                <div className={classes.UserNav}>
                                    <UserNav clicked={(e) => this.props.changeView(e)}
                                        review={this.props.statistic.review}
                                        overdue={this.props.statistic.overdue}
                                        workCopy={Object.keys(this.props.draftsList).length}
                                        activeBtn= {this.props.user}
                                        submit={this.addNew}/>
                                    <Search 
                                        search={this.props.search.searchValue}
                                        changed={(e) => this.props.searchValue(e)}
                                        value={this.props.search.searchValue}
                                        closeSearch={this.props.clearSearch}
                                        changeSearch={this.props.searchBtn}
                                        active={this.props.search.searchField}/>
                                </div>
                            </Auxiliary>)
        }

        return (
            <Auxiliary>
                {userNavigation}
                <ErrorBoundaries>
                    <Table table={classes.Table}
                        columns={tableHeads}
                        rows={rowData}
                        sortable= {this.props.sorted.sort}
                        pagination= {true}
                        sortOption= {this.props.sorted}
                        sort={e => this.props.sortData(e)}
                        changePage={this.props.changePage}
                        page={this.props.pagination.page}
                        range={this.props.pagination.range}
                        view={(e) => this.seeRow(e)}
                    />
                </ErrorBoundaries>
            </Auxiliary>
        )
    }
};


const mapStateToProps = state => {
    return {
        user: state.userPanel.activeBtn,
        search: state.userPanel.search,
        pagination: state.userPanel.pagination,
        sorted: state.userPanel.sorted,
        assessmentsList: state.userPanel.assessmentsList,
        statistic: state.userPanel.statistic,
        draftsList: state.userPanel.draftsList,
        isAuth: state.firebase.auth.uid
    }
};

const mapDispatchToProps = dispatch => {
    return {
        clearUserPanel: () => dispatch(action.clearUserPanel()),
        changeView: (event) => dispatch(action.changeView(event)),
        searchBtn: () => dispatch(action.search()),
        clearSearch: () => dispatch({type: 'CLEAR_SEARCH'}),
        searchValue: (searchValue) => dispatch(action.searchValue(searchValue)),
        changePage: (page) => dispatch(action.changePage(page)),
        sortData: (event) => dispatch(action.sortData(event)),
        initRAList: () => dispatch(action.initHazardList()),
        cleanState: () => dispatch(action.cleanState()),
        RAtype: type => dispatch(action.RAtype(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);