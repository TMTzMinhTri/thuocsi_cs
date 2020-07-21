import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { Loading } from "Components";

const AdminLayout = React.lazy(() => import('Layout/AdminLayout/index'))
const LoginScreen = React.lazy(() => import('Screens/LoginScreen'))

export const App = () => {
  return <Router>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/admin" />} />
        <Route path="/admin" component={AdminLayout} />
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
    </React.Suspense>
  </Router>
}