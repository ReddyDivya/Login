import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';
import { AuthContext } from '../../store/auth-context';
import Input from '../UI/Input/Input';

const EmailReducer = (state, action) => {
    if (action.type === "USER_EMAIL") {
        return { value: action.val, isValid: action.val.includes('@') }
    }
    if (action.type === "EMAIL_IS_VALID") {
        return { value: state.value, isValid: state.value.includes('@') }
    }

    return { value: '', isValid: false }
}

const PasswordReducer = (state, action) => {
    if (action.type === 'USER_PWD') {
        return { value: action.val, isValid: action.val.trim().length > 6 }
    }
    if (action.type === 'PWD_IS_VALID') {
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }

    return { value: '', isValid: false }
}

const Login = (props) => {

    //state variables
    const [IsFormValidate, setIsFormValidate] = useState(false);//is form valid?
    //useReducers for email, password
    const [useEmail, dispatchEmail] = useReducer(EmailReducer, {
        value: '',
        isValid: null
    });
    const [usePassword, dispatchPassword] = useReducer(PasswordReducer, {
        value: '',
        isValid: null
    });

    const ctx = useContext(AuthContext);//fetching the global context
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        console.log('EFFECT RUNNING');

        return () => {
            console.log('EFFECT CLEANUP');
        };
    }, []);

    //object destructuring
    const { isValid: IsEmailValid } = useEmail;
    const { isValid: IsPasswordValid } = usePassword;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setIsFormValidate(IsEmailValid && IsPasswordValid)
        }, 500)

        return () => {
            clearTimeout(identifier);
        }
    }, [IsEmailValid, IsPasswordValid])

    //Email
    const OnEmailChange = (event) => {
        //email changes
        dispatchEmail({ type: 'USER_EMAIL', val: event.target.value });//passing value to dispatch email
    }
    const EmailValidation = () => {
        //email validation
        dispatchEmail({ type: 'EMAIL_IS_VALID' });//passing value to dispatch email
    }

    // Password
    const OnPasswordChange = (event) => {
        //password changes
        dispatchPassword({ type: 'USER_PWD', val: event.target.value });
    }
    const PasswordValidation = () => {
        //Password validation
        dispatchPassword({ type: 'PWD_IS_VALID' })
    }

    //Form Submit
    const onSubmitHndlr = (event) => {
        event.preventDefault();
        if (IsFormValidate)
            ctx.onLogin(useEmail.value, usePassword.value);
        else if (!IsEmailValid) {
            emailRef.current.focus();
        } else {
            passwordRef.current.focus();
        }
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={onSubmitHndlr}>
                <br />
                <Input
                    ref={emailRef}
                    type="email"
                    id="email"
                    label="E-Mail"
                    isValid={useEmail.isValid}
                    value={useEmail.value}
                    onChange={OnEmailChange}
                    onBlur={EmailValidation}
                />
                <Input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    label="Password"
                    isValid={usePassword.isValid}
                    value={usePassword.value}
                    onChange={OnPasswordChange}
                    onBlur={PasswordValidation}
                />
                <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                    >Login</Button>
                </div>
                <br />
            </form>
        </Card>
    )
}

export default Login;