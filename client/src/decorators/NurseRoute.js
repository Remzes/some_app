import {Redirect, Route} from "react-router-dom";
import React from "react";

export const NurseRoute = ({ component: Component, isAuth: isAuth, isNurse: isNurse, ...rest }) => {
    return <Route {...rest} render={props => (
        (isAuth && isNurse) ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
    )}/>
};
