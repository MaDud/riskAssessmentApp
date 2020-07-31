import React from 'react';

import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import RiskAssessmentNav from '../../components/RiskAssessmentOutput/RiskAssessmentNav/RiskAssessmentNav';
import RiskMatric from '../../components/RiskAssessment/HazardIdentyfication/RiskMatric/RiskMatric';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './riskAssessmentOutput.module.css';
import * as action from '../../store/actions/index';

const TABLE_HEADS = ['Zagrożenie','Źródło zagrożenia', 'Możliwe skutki zagrożenia', 'Środki ochrony przed zagrożeniem', 'Ryzyko'];
const ARCHIVE_TABLE_HEADS = ['Wersja', 'Data utworzenia', 'Opis zmian']


class RiskAssessmentOutput extends React.Component {

    state = {
        archiveInfo: false,
        archiveHistory: false
    }

    componentDidMount () {
        const query = this.props.match.params.id;
        this.props.initRAForm('preview', query);
        this.props.archiveOutput(query)
    }

    archiveToggle = () => {
        const archiveInfo = !this.state.archiveInfo;
        this.setState({archiveInfo: archiveInfo})
    }

    archiveHistoryToggle = () => {
        const archiveHistory = !this.state.archiveHistory;
        this.setState({archiveHistory: archiveHistory})
    }

    editBtn = (id) => {
        this.props.RAtype('new_version');
        this.props.history.push('/riskAssessmentForm/'+ id + '/' + (this.props.version + 1));
    }

    btnOK = () => {
        if (this.props.raOutput.error) {
            this.archiveToggle()
        } else {
            this.props.history.push('/userPanel')
        }
        this.props.raOutputClean();
    }

    render() {

        const tableHeads = TABLE_HEADS.map( (head, index) => {return <th key={index}>{head}</th>})
        const rows = [];
        for (let hazard in this.props.hazardList) {
            if (this.props.hazardList[hazard].save) {
            rows.push([ this.props.hazardList[hazard].value,
                        this.props.hazardList[hazard].source,
                        this.props.hazardList[hazard].possibleEffects,
                        this.props.hazardList[hazard].protection,
                        <RiskMatric effect = {this.props.hazardList[hazard].effect} propability = {this.props.hazardList[hazard].propability} type='td' key={4}/>])
            }
        }
        
        const tableRows = rows.map( (row, index) => {
            return <tr key={index} type = 'td'>
                {row.map( (item, index) => {
                    let cell;;
                    if (index === 4) {
                        cell = item
                    } else {
                        cell = <td key={index}>{item}</td>
                    }
                    return cell})}
            </tr>
        })

        let infoBox = null;
        if (this.props.raOutput.loading) {
            infoBox =<Spinner />           
        } else if (this.props.raOutput.message) {
            infoBox =   <div className={classes.MssgBox}>
                            <p>{this.props.raOutput.message}</p>
                            <Button btnType='Submit' clicked={this.btnOK}>OK</Button>
                        </div>
        } else {
            infoBox = ( <Auxiliary>
                            <p>Czy na pewno chcesz przenieść tą ocenę ryzyka do archiwum?</p>
                            <div className={classes.ButtonBox}>
                                <Button btnType= 'Active' clicked={() => this.props.archiveRA(this.props.id)}>Przenieś do archiwum</Button>
                                <Button btnType= 'Warning' clicked = {this.archiveToggle}>Anuluj</Button>
                            </div>
                        </Auxiliary>
                        );
        }

        let archiveTableHeads = ARCHIVE_TABLE_HEADS.map( (head,index) => {
            return <th key={index}>{head}</th>
        })

        const archiveTableData = Object.keys(this.props.archiveHistory.versionsList).map(version => {
            return  <tr key={version}>
                        <td>{version}</td>
                        <td>{this.props.archiveHistory.versionsList[version].date}</td>
                        <td>{this.props.archiveHistory.versionsList[version].notice}</td>
                    </tr>
        })
        
        return (
            <div className={classes.Output}>
                {this.props.isAuth ? (<Auxiliary>
                                        <RiskAssessmentNav 
                                            history={this.archiveHistoryToggle}
                                            edit={() => this.editBtn(this.props.id)}
                                            archive={this.archiveToggle}/>
                                        <InfoBox show={this.state.archiveInfo}>
                                            {infoBox}
                                        </InfoBox>
                                        <Modal show={this.state.archiveHistory}
                                            clicked={this.archiveHistoryToggle}>
                                            <div className={classes.ArchiveHistory}>
                                                <p onClick={this.archiveHistoryToggle}>Zamknij</p>
                                                <h3>Historia zmian</h3>
                                                <table className={classes.Table}>
                                                    <thead>
                                                        <tr>
                                                            {archiveTableHeads}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {archiveTableData}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Modal>
                                    </Auxiliary>)
                                    :null
                }
                {this.props.hazardList ? (  <Auxiliary>
                                                <div className={classes.Info}>
                                                    <h5>{'Numer: ' + this.props.number + ' wersja: ' + this.props.version} </h5>
                                                    <h2>{this.props.data.position}</h2>
                                                    <h4>Obszar pracy</h4>
                                                    <p>{this.props.data.localization}</p>
                                                    <h4>Charakterystyka pracy</h4>
                                                    <p>{this.props.data.description}</p>   
                                                </div> 
                                                <table className={classes.Table}>
                                                    <thead>
                                                        <tr>
                                                            {tableHeads}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableRows}
                                                    </tbody>
                                                </table>
                                            </Auxiliary> )
                                            : <Spinner />}    
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        number: state.riskAssessment.number,
        version: state.riskAssessment.version,
        id: state.riskAssessment.id,
        data: state.riskAssessment.assessmentData,
        hazardList: state.riskAssessment.hazardList,
        raOutput: state.riskAssessmentOutput,
        archiveHistory: state.archiveHistory,
        isAuth: state.firebase.auth.uid
    }
};

const mapPropsToDispatch = dispatch => {
    return {
        cleanState: () => dispatch(action.cleanState()),
        archiveRA: id => dispatch(action.archiveRA(id)),
        raOutputClean: () => dispatch(action.raOutputClean()),
        archiveOutput: id => dispatch(action.archive(id)),
        RAtype: type => dispatch(action.RAtype(type)),
        initRAForm: (type, id) => dispatch(action.initRAForm(type,id))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(RiskAssessmentOutput);