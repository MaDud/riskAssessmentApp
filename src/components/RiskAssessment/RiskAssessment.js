import React from 'react';

import classes from './riskAssessment.module.css';

import Auxiliary from '../../hoc/Auxiliary'

const riskAssessment = props => {
    return(
        <Auxiliary>
            <form className={classes.RiskAssessment}>
                <h1>Ocena ryzyka zawodowego</h1>
                <label  for="number" 
                        className={[classes.Label, classes.Number].join(' ')}>
                        Numer:
                </label>
                <input type="text" id="number" className={classes.Number}/>
                <label  for="version" 
                        className={[classes.Label, classes.Version].join(' ')}>
                        Wersja:
                </label>
                <input type="text" id="version" className={classes.Version}/>
                <label  for="date" 
                        className={[classes.Label, classes.Date].join(' ')}>
                        Data sporządzenia:
                </label>
                <input type="date" id="date" className={classes.Date}/>
                <label  for="team" 
                        className={[classes.Label, classes.Team].join(' ')}>
                        Zespół sporządzający:
                </label>
                <input type="text" id="team" className={classes.Team}/>
                <label  for="position" 
                        className={[classes.Label, classes.Position].join(' ')}>
                        Nazwa stanowiska:
                </label>
                <textarea id="position" className={classes.Position}/>
                <label  for="localication"  
                        className={[classes.Label, classes.Localization].join(' ')}>
                        Lokalizacja:
                </label>
                <textarea id="localization" className={classes.Localization}/>
                <label  for="description" 
                        className={[classes.Label, classes.Description].join(' ')}>
                        Charakterystyka stanowiska pracy:
                </label>
                <textarea id="description" className={classes.Description}/>
                <div className={classes.Hazards}>
                        <p>Zagrożenia na stanowisku pracy</p>
                        {props.children}
                </div>
                <label for="notice" 
                        className={[classes.Label, classes.Notice].join(' ')}>
                        Uwagi:
                </label>
                <textarea id="notice" className={classes.Notice}/>
                <label  for="reviewDate" 
                        className={[classes.Label, classes.ReviewDate].join(' ')}>
                        Data kolejnego przeglądu:
                </label>
                <input type="date" id="reviewDate" className={classes.ReviewDate}/>
                <label  for="owner" 
                        className={[classes.Label, classes.Owner].join(' ')}>  
                        Właściciel:
                </label>
                <input type="text" id="owner" className={classes.Owner}/>
                <button type="submit" className={classes.Submit}>Dodaj ocenę</button>
                <button className={classes.Cancel}>Anuluj</button>
            </form>
        </Auxiliary>
    )
};

export default riskAssessment;