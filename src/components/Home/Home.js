import React from 'react';
import Card from '../UI/Card/Card';
import classes from '../Home/Home.module.css';

const Home = () => {
    return (
        <Card style={classes.home}>
            <h1>Welcome back!</h1>
        </Card>
    )
}

export default Home
