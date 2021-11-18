import React from 'react';
import classes from '../Button/Button.module.css';

const Button = (props) => {
    return (
        <button
            className={`${classes.button} ${props.className}`}
            type={props.type || 'button'}
            disabled={props.disabled}
        >{props.children}</button>
    )
}

export default Button
