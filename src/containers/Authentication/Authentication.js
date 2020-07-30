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
            isValid: false,
        isSignUp: false
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

    signChange = () => {
        this.setState({isSignUp: !this.state.isSignUp});
    }

    signProcess = () => {
        const data = {email: this.state.controls.email.value, password: this.state.controls.password.value};

        if (this.state.isSignUp) {
            console.log('rejestracja')
        } else {
            this.props.signIn(data)
        }
    }

    render () {

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
                    <h3>
                        {this.state.isSignUp ? 'Formularz rejestracji' : 'Zaloguj się'}
                    </h3>
                    {form}
                    <Button btnType = 'Submit' disabled = {!(this.state.controls.email.valid && this.state.controls.password.valid)} clicked={() => this.signProcess()}>
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
        signIn: (data) => dispatch(action.signIn(data)),
    }
}

export default connect(null, mapPropsToDispatch)(SignUp)