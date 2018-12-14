import {Redirect, Route} from "react-router-dom";
import React from "react";

export const LoggedInRoute = ({ component: Component, isAuth: isAuth, isPatient: isPatient, ...rest }) => {
    return <Route {...rest} render={props => (
        (isAuth && isPatient) ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
    )}/>
};

