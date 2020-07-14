import React from 'react';

import classes from './riskAssessmentGeneralInfo.module.css';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const riskAssessment = props => {
    return(
        <Auxiliary>
            <form className={classes.RiskAssessment}>
                <h1>Ocena ryzyka zawodowego</h1>
                <Input for='number'
                       labelPosition={classes.LabelNumber}
                       label='Numer:'
                       elementType='input'
                       changed={props.change}
                       id='number'
                       inputPosition={classes.Number}
                       value={props.number}
                       disabled/>
                <Input for='version'
                       labelPosition={classes.LabelVersion}
                       label='Wersja:'
                       elementType='input'
                       changed={props.change}
                       id='version'
                       inputPosition={classes.Version}
                       value={props.version}
                       disabled/>
                <Input for='date'
                       labelPosition={classes.LabelDate}
                       label='Data sporządzenia:'
                       elementType='input'
                       changed={props.change}
                       id='date'
                       inputPosition={classes.Date}
                       type='date'
                       value={props.date}
                       disabled/>
                <Input for='team'
                       labelPosition={classes.LabelTeam}
                       label='Zespół sprządzający:'
                       elementType='textarea'
                       changed={props.change}
                       id='team'
                       inputPosition={classes.Team}
                       value={props.team}/>
                <Input for='position'
                       labelPosition={classes.LabelPosition}
                       label='Nazwa stanowiska:'
                       elementType='textarea'
                       changed={props.change}
                       id='position'
                       inputPosition={classes.Position}
                       value={props.position}/>
                <Input for='localization'
                       labelPosition={classes.LabelLocalization}
                       label='Lokalizacja:'
                       elementType='textarea'
                       changed={props.change}
                       id='localization'
                       inputPosition={classes.Localization}
                       value={props.localization}/>
                <Input for='description'
                       labelPosition={classes.LabelDescription}
                       label='Charakterystyka stanowiska pracy:'
                       elementType='textarea'
                       changed={props.change}
                       id='description'
                       inputPosition={classes.Description}
                       value={props.description}/>
                <div className={classes.Hazards}>
                        <p>Zagrożenia na stanowisku pracy</p>
                        {props.children}
                </div>
                <Input for='notice'
                       labelPosition={classes.LabelNotice}
                       label='Uwagi:'
                       elementType='textarea'
                       changed={props.change}
                       id='notice'
                       inputPosition={classes.Notice}
                       value={props.notice}/>
                <Input for='reviewDate'
                       labelPosition={classes.LabelReviewDate}
                       label='Data kolejnego przeglądu:'
                       elementType='input'
                       changed={props.change}
                       id='reviewDate'
                       inputPosition={classes.ReviewDate}
                       type='date'
                       value={props.reviewDate}/>
                <Input for='owner'
                       labelPosition={classes.LabelOwner}
                       label='Właściciel:'
                       elementType='textarea'
                       changed={props.change}
                       id='owner'
                       inputPosition={classes.Owner}
                       value={props.owner}/>
                <Button clicked={props.add} 
                        btnType="Submit" 
                        btnPosition={classes.SubmitPosition}
                        disabled={props.addDisabled}>
                        {props.type === 'new' ? 'Dodaj nową ocenę' : 'Dodaj nową wersję'}
                </Button>
                <Button clicked={props.saveCopy}
                        btnType="Submit"
                        btnPosition={classes.SavePosition}
                        disabled={props.workCopyDisabled}>
                        Zapisz kopię roboczą    
                </Button>
                <Button clicked={props.cancel} 
                        btnType="Cancel" 
                        btnPosition={classes.CancelPosition}>
                        Anuluj
                </Button>
            </form>
        </Auxiliary>
    )
};

export default riskAssessment;