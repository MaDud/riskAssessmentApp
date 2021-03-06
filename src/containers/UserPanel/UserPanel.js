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
import register from '../../assets/register.png';
import admin from '../../assets/admin.png';

const tableHeads = [{label:'Numer', id:'number'},
                    {label: 'Stanowisko', id: 'position'}, 
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
        this.props.cleanState();
        const interval = setInterval(this.timer, 80);
        this.setState({interval:interval})}        

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
        this.props.cleanUserPanel();
        this.props.RAtype('new');
        this.props.history.push('/riskAssessmentForm')
    }

    seeRow = e => {
        let id = e.target.parentElement.id;
        this.props.cleanUserPanel();
        if (this.props.user !== 'drafts') {
            this.props.RAtype('preview')
            this.props.history.push('/riskAssessment/' + id)   
        } else {
            this.props.RAtype('draft')
            this.props.history.push('/riskAssessmentForm/'+ id)
        }
    }

    changeView = e => {
        if ((e.target.tagName === 'BUTTON' || e.target.tagName === 'H1') && this.state[e.target.id] !== 0) {
            this.props.changeView(e.target.id)
        } else {
            this.props.changeView(e.target.value)
        }
    }

    render () {

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
                                <img src={register} className={classes.Image}/>
                                <div className={classes.BasicUserNav}>
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
                                <img src={admin} className={classes.Image}/>
                                <Statistic matric={this.props.statistic}
                                    clicked={(e) => this.changeView(e)}
                                    active = {this.state.active}
                                    review = {this.state.review}
                                    overdue ={this.state.overdue}/>
                                <div className={classes.UserNav}>
                                    <UserNav clicked={(e) => this.changeView(e)}
                                        review={this.props.statistic.review}
                                        overdue={this.props.statistic.overdue}
                                        workCopy={Object.keys(this.props.draftsList).length}
                                        activeBtn= {this.props.user}
                                        submit={this.addNew}
                                        changed= {e => this.changeView(e)}/>
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
                <div className = {classes.Search}>
                    <Search 
                        search={this.props.search.searchValue}
                        changed={(e) => this.props.searchValue(e)}
                        value={this.props.search.searchValue}
                        closeSearch={this.props.clearSearch}
                        active={true}/>
                </div>
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
        cleanUserPanel: () => dispatch(action.cleanUserPanel()),
        changeView: (path) => dispatch(action.changeView(path)),
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