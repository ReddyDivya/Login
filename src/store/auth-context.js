import React, { useState, useEffect } from 'react';

//Creating Context
export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },//function
    onLogin: (email, password) => { }//function accepts 2 parameters
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);//logged-in flag

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');//fetching 'isLoggedIn' from localStorage

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        console.log('loginHandler >> ')
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};