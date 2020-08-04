import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { Loading } from "../Loading";

interface IPrivateRoute {
    component: React.SFC,
    path: string,
    loading: boolean,
    isAuthenticated: boolean,
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, loading, ...rest }) => {
    return <Route {...rest}
        render={({ location }) => loading
            ? <div style={{ width: "100vw", height: "100vh" }}><Loading /></div>
            : rest.isAuthenticated
                ? < Component {...rest} />
                : <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
        }
    />
}
