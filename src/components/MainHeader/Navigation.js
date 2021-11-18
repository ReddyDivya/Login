import React, { useContext } from 'react';
import classes from './Navigation.module.css';
import { AuthContext } from '../../store/auth-context';

const Navigation = () => {

    //Method 1 to use Context
    const ctx = useContext(AuthContext);//fetching global context

    return (
        < nav className={classes.nav} >
            <ul>
                {
                    ctx.isLoggedIn &&
                    (<>
                        <li><a href="/">Users</a></li>
                        <li><a href="/">Admin</a></li>
                        <li><button onClick={ctx.onLogout}>Logout</button></li>
                    </>)
                }
            </ul>
        </nav>
        /*
        ** Method 2 to use Context
        <AuthContext.Consumer>
            {
                (context) => {
                    return (
                        < nav className={classes.nav} >
                            <ul>
                                {
                                    context.isLoggedIn &&
                                    (<>
                                        <li><a href="/">Users</a></li>
                                        <li><a href="/">Admin</a></li>
                                        <li><button onClick={props.onLogout}>Logout</button></li>
                                    </>)
                                }
                            </ul>
                        </nav>
                    )
                }
            }
        </AuthContext.Consumer >
        */
    );
}

export default Navigation
