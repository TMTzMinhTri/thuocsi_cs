import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";

interface IPrivateRoute {
    component: React.SFC,
    path: string,
    loading: boolean,
    isAuthenticated: boolean,
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, loading, ...rest }) => {
    console.log(rest.isAuthenticated)
    return <Route {...rest}
        render={({ location }) => loading
            ? <Spinner />
            : rest.isAuthenticated
                ? < Component {...rest} />
                : <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
        }
    />
}
