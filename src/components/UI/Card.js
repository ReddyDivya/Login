import React from 'react';
import classes from './Card/Card.module.css'

const Card = (props) => {
    return (
        <div className={`${classes.card} ${props.style}`}>
            {props.children}
        </div>
    )
}

export default Card
