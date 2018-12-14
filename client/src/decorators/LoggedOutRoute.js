import {Redirect, Route} from "react-router-dom";
import React from "react";

export const LoggedOutRoute = ({ component: Component, isAuth: isAuth, ...rest }) => (
    <Route {...rest} render={props => (
        isAuth
            ? <Redirect to={{ pathname: '/' }} />
            : <Component  {...props} />
    )} />
);
