import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { Loading } from "Components";
import { PrivateRoute } from 'Components/PrivateRoute';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { RootState } from 'Store';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUser } from 'Store/actions/layout.actions';
import { RootAction } from 'Interface/Store/index.types';
import SweetAlert from 'react-bootstrap-sweetalert';

const AdminLayout = React.lazy(() => import('Layout/AdminLayout/index'))
const LoginScreen = React.lazy(() => import('Screens/LoginScreen'))

const mapState = (state: RootState) => ({
  layoutState: state.layout,
  notification: state.notification

})
const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getUser: getCurrentUser
}, dispatch)

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

const AppComponent: React.FC<IProps> = ({ layoutState, getUser, notification }) => {
  React.useEffect(() => {
    getUser()
  }, [getUser])

  return <Router>
    <React.Suspense fallback={<div style={{ width: "100vw", height: "100vh" }}><Loading /></div>}>
      <ToastContainer />
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/admin" />} />
        <PrivateRoute path="/admin"
          component={AdminLayout}
          loading={layoutState.loading}
          isAuthenticated={layoutState.isAuthenticated} />
        <Route path="/login" exact component={LoginScreen} />
      </Switch>
      {notification.alert && <SweetAlert {...notification.alert}>{notification.alert.content}</SweetAlert>}
    </React.Suspense>
  </Router>
}



export const App = connect(mapState, mapAction)(AppComponent)