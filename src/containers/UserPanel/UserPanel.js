import React from 'react';

import instance from '../../instance';

import Auxiliary from '../../hoc/Auxiliary';

import classes from "./userPanel.module.css";

import TableHead from '../../components/UI/Table/TableHead/TableHead';
import TableList from '../../components/UI/Table/TableList/TableList';
import Statistic from '../../components/UI/Statistic/Statistic';
import Button from '../../components/UI/Button/Button';
import ElementNavbar from '../../components/UserNav/ElementNavbar/ElementNavbar';

class UserPanel extends React.Component {

    state = {
        tableHeads: ["Numer", "Nazwa stanowiska", "Właściciel", "Opcje"],
        assessmentsList: null,
        statistic: 
            {active: {value: 0, description: "Aktywnych ocen ryzyka zawodowego"},
            review: {value: 0, description: "Wymagających przeglądu ocen ryzyka zawodowego"},
            overdue: {value: 0, description: "Przeterminowanych ocen ryzyka zawodowego"}},
        activeBtn: "active"
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

    
 
    render () {

        //wprowadzanie danych z state do statystyk
        const statisticData = {...this.state.statistic};
        let statistic = Object.keys(statisticData).map(el => {
            return statisticData[el]
        });

        //wprowadzanie danych do tabeli
        const tableData = {...this.state.assessmentsList};
        let list = Object.keys(tableData).map(el => {
            return {id: el,
                    review: tableData[el].review,
                    overdue: tableData[el].overdue,
                    values: [tableData[el].no, tableData[el].position, tableData[el].owner, <ElementNavbar/>]}
        })

        // let tableList = list.map( el => {
        //     return <TableList id={el.id} list={el.values} key={el.id}/>
        // })
        let newList = null;
        if (this.state.activeBtn === 'review') {
            newList = list.filter(el => {
                return el.review
            })
        } else if (this.state.activeBtn === 'overdue') {
            newList = list.filter(el => {
                return el.overdue
            })
        }
        else {newList = list};
        
        let tableList = newList.map( el => {
            return <TableList id={el.id} list={el.values} key={el.id}/>
        })

        console.log(newList)

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
                {tableList.length !== 0 ?
                    (<table className={classes.Table}>
                        <TableHead head={this.state.tableHeads}/>
                        <tbody>
                            {tableList}
                        </tbody>
                    </table>)
                    : (<div className={classes.EmptyTable}>
                            <h3>Brak elementów do wyświetlenia</h3>
                       </div>)
                }
            </Auxiliary>
        )
    }
};

export default UserPanel;