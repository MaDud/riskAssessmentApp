import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './authentication.module.css';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';

class SignUp extends React.Component {

    state = {
        controls: 
            {name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Imię'
                },
                value: '',
                validation: {
                    required: false,
                    minLength: 1
                },
                valid: true
            },
            email: {
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
        isValid: false,
        isSignUp: false
    } 

    inputHandler = (e, id) => {
        const controls = this.state.controls;
        const changedField = controls[id];
        changedField.value = e.target.value;
        changedField.valid = this.validityCheck(e.target.value, this.state.controls[id].validation);

        this.setState({controls:controls,
                        isValid: this.formValidationCheck()})
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

    formValidationCheck = () => {
        let isValid = true;

        Object.keys(this.state.controls)
            .filter(control => {
                return this.state.controls[control].validation.required})
            .forEach(control => {
                if (this.state.controls[control].valid && isValid) {
                    isValid = true
                } else {
                    isValid = false
                }
            })
        return isValid
    }

    signChange = () => {
        let controls = {...this.state.controls};

        controls.name = { ... this.state.controls.name,
                            validation: {... this.state.controls.name.validation,
                                        required: !this.state.controls.name.validation.required},
                            valid: !this.state.controls.name.valid}

        this.setState({controls: controls,
                        isSignUp: !this.state.isSignUp,
                        isValid: this.formValidationCheck()})
        }

    signProcess = () => {
        const data = {email: this.state.controls.email.value, password: this.state.controls.password.value};

        if (this.state.isSignUp) {
            this.props.signOn(data)
        } else {
            this.props.signIn(data)
        }
    }

    render () {

        const formData = this.state.controls;
        const form = Object.keys(formData)
            .filter( control => {
                return formData[control].validation.required})
            .map( control => {
                return <Input elementType = {formData[control].elementType}
                            key = {control}
                            type = {formData[control].elementConfig.type}
                            placeholder = {formData[control].elementConfig.placeholder}
                            changed = {e => this.inputHandler(e, control)}
                            value = {formData[control].value}
                        />
            })

        return (
            <Auxiliary>
                <div className = {classes.RegisterForm}>
                    <h3>
                        {this.state.isSignUp ? 'Formularz rejestracji' : 'Zaloguj się'}
                    </h3>
                    {form}
                    <Button btnType = 'Submit' disabled = {!this.state.isValid} clicked={() => this.signProcess()}>
                        {this.state.isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}
                    </Button>
                    <p>
                        {this.state.isSignUp ? 'Posiadasz już konto?' : 'Nie posiadasz konta?'}
                        <span onClick={() => this.signChange()}>
                            {this.state.isSignUp ? 'Zaloguj się' : 'Zarejestruj się'}
                        </span>
                    </p>
                </div>
            </Auxiliary>
        )
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        signIn: data => dispatch(action.signIn(data)),
        signOn: data => dispatch(action.signOn(data))
    }
}

export default connect(null, mapPropsToDispatch)(SignUp)