import React, { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';
import AuthContext from '../../store/auth-context';

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
    const [useEmail, dispatchEmail] = useReducer(EmailReducer, {
        value: '',
        isValid: null
    });
    const [usePassword, dispatchPassword] = useReducer(PasswordReducer, {
        value: '',
        isValid: null
    });

    const ctx = useContext(AuthContext);

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

    /*
    ** Email
    */
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
        console.log('submit >> ')
        ctx.onLogin(useEmail.value, usePassword.value);
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={onSubmitHndlr}>
                <br />
                <div className={`${classes.control} ${useEmail.isValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={useEmail.value}
                        onChange={OnEmailChange}
                        onBlur={EmailValidation}
                    />
                </div>
                <div className={`${classes.control} ${usePassword.isValid === false ? classes.invalid : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={usePassword.value}
                        onChange={OnPasswordChange}
                        onBlur={PasswordValidation}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                        disabled={!IsFormValidate}
                    >Login</Button>
                </div>
                <br />
            </form>
        </Card>
    )
}

export default Login;