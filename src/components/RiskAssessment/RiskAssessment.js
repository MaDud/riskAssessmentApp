import React from 'react';

import classes from './riskAssessment.module.css';

import Auxiliary from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

const riskAssessment = props => {
    return(
        <Auxiliary>
            <form className={classes.RiskAssessment}>
                <h1>Ocena ryzyka zawodowego</h1>
                <label  htmlFor="number" 
                        className={[classes.Label, classes.Number].join(' ')}>
                        Numer:
                </label>
                <input type="text" id="number" className={classes.Number} onChange={props.change}/>
                <label  htmlFor="version" 
                        className={[classes.Label, classes.Version].join(' ')}>
                        Wersja:
                </label>
                <input type="text" id="version" className={classes.Version} onChange={props.change}/>
                <label  htmlFor="date" 
                        className={[classes.Label, classes.Date].join(' ')}>
                        Data sporządzenia:
                </label>
                <input type="date" id="date" className={classes.Date} onChange={props.change}/>
                <label  htmlFor="team" 
                        className={[classes.Label, classes.Team].join(' ')}>
                        Zespół sporządzający:
                </label>
                <input type="text" id="team" className={classes.Team} onChange={props.change}/>
                <label  htmlFor="position" 
                        className={[classes.Label, classes.Position].join(' ')}>
                        Nazwa stanowiska:
                </label>
                <textarea id="position" className={classes.Position} onChange={props.change}/>
                <label  htmlFor="localization"  
                        className={[classes.Label, classes.Localization].join(' ')}>
                        Lokalizacja:
                </label>
                <textarea id="localization" className={classes.Localization} onChange={props.change}/>
                <label  htmlFor="description" 
                        className={[classes.Label, classes.Description].join(' ')}>
                        Charakterystyka stanowiska pracy:
                </label>
                <textarea id="description" className={classes.Description} onChange={props.change}/>
                <div className={classes.Hazards}>
                        <p>Zagrożenia na stanowisku pracy</p>
                        {props.children}
                </div>
                <label htmlFor="notice" 
                        className={[classes.Label, classes.Notice].join(' ')}>
                        Uwagi:
                </label>
                <textarea id="notice" className={classes.Notice} onChange={props.change}/>
                <label  htmlFor="reviewDate" 
                        className={[classes.Label, classes.ReviewDate].join(' ')}>
                        Data kolejnego przeglądu:
                </label>
                <input type="date" id="reviewDate" className={classes.ReviewDate} onChange={props.change}/>
                <label  htmlFor="owner" 
                        className={[classes.Label, classes.Owner].join(' ')}>  
                        Właściciel:
                </label>
                <input type="text" id="owner" className={classes.Owner} onChange={props.change}/>
                <Button clicked={props.add} 
                        btnType="Submit" 
                        btnPosition={classes.SubmitPosition}>
                        Dodaj ocenę
                </Button>
                <Button clicked={props.cancel} 
                        btnType="Cancel" 
                        btnPosition={classes.Cancel}>
                        Anuluj
                </Button>
            </form>
        </Auxiliary>
    )
};

export default riskAssessment;