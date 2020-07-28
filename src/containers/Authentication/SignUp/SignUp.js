import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './signUp.module.css';
import {Link} from 'react-router-dom';

class SignUp extends React.Component {

    state = {
        controls: 
            {email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true},
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Hasło min. 8 znaków'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false
            }},
            isValid: false
    }

    inputHandler = (e, id) => {
        const controls = this.state.controls;
        const changedField = controls[id];
        changedField.value = e.target.value;
        changedField.valid = this.validityCheck(e.target.value, this.state.controls[id].validation);

        this.setState({controls:controls})
    }

    validityCheck = (value, rule) => {
        let isValid = true;

        if (rule.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid
        }
        if (rule.isEmail) {
            const pattern =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }

    render () {
        console.log(this.state)

        const formData = this.state.controls;
        const form = Object.keys(formData).map( control => {
            return <Input elementType = {formData[control].elementType}
                        key = {control}
                        type = {formData[control].elementConfig.type}
                        placeholder = {formData[control].elementConfig.placeholder}
                        changed = {e => this.inputHandler(e, control)}
                    />
        })

        return (
            <Auxiliary>
                <div className = {classes.RegisterForm}>
                    <h3>Formularz rejestracji</h3>
                    {form}
                    <Button btnType = 'Submit' disabled = {!(this.state.controls.email.valid && this.state.controls.password.valid)}>
                        Zarejestruj się
                    </Button>
                    <p>Posiadasz już konto? 
                        <span>
                            <Link to='/'>Zaloguj się</Link>
                        </span>
                    </p>
                </div>
            </Auxiliary>
        )
    }
}

export default SignUp