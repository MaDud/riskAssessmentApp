import React from 'react';

import classes from './hazardForm.module.css';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';

import RiskMatric from '../RiskMatric/RiskMatric';

const hazardForm = props => {

    return (
        <div className={classes.HazardForm}>
            <div className={classes.HazardBox}>
                <Input
                    label='Źródło zagrożenia:'
                    elementType='textarea'
                    name='source'
                    changed={props.change}
                    value={props.source}/>
                <Input
                    label='Możliwe skutki zagrożenia:'
                    elementType='textarea'
                    name='possibleEffects'
                    changed={props.change}
                    value={props.possibleEffects}/>
                 <Input
                    label='Środki ochrony przed zagrożeniami:'
                    elementType='textarea'
                    name='protection'
                    changed={props.change}
                    value={props.protection}/>
                <div className={classes.RiskBox}>
                    <Input
                        label='Skutek'
                        elementType='select'
                        name='effect'
                        changed={props.change}
                        value={props.effectOption}
                        options={[{value:'', displayValue:''},
                                {value:'small', displayValue:'Mały'},
                                {value:'medium', displayValue:'Średni'},
                                {value:'big', displayValue:'Duży'}]}/>
                    <Input
                        label='Prawdopodobieństwo'
                        elementType='select'
                        name='propability'
                        changed={props.change}
                        value={props.propabilityOption}
                        options={[{value:'', displayValue:''},
                                {value:'small', displayValue:'Małe'},
                                {value:'medium', displayValue:'Średnie'},
                                {value:'big', displayValue:'Duże'}]}/>
                </div>
                <RiskMatric effect={props.effect} 
                            propability={props.propability}
                            />
                <div className={classes.ButtonBox}>
                    <Button clicked={props.save} disabled={props.disabled} btnType="Submit">ZAPISZ</Button>
                    <Button clicked={props.clean} disabled={props.disabled} btnType="Warning">WYCZYŚĆ DANE</Button>
                </div>
            </div>
        </div>
    )
};

export default hazardForm;