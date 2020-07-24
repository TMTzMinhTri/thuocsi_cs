import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { Loading } from "Components";
import { PrivateRoute } from 'Components/PrivateRoute';
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUser } from 'Store/actions/layout.actions';
import { RootAction } from 'Interface/Store/index.types';

const AdminLayout = React.lazy(() => import('Layout/AdminLayout/index'))
const LoginScreen = React.lazy(() => import('Screens/LoginScreen'))

const mapState = (state: RootState) => ({
  layoutState: state.layout
})
const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getUser: getCurrentUser
}, dispatch)

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

const AppComponent: React.FC<IProps> = ({ layoutState, getUser }) => {
  React.useEffect(() => {
    getUser()
  }, [getUser])

  return <Router>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/admin" />} />
        <PrivateRoute path="/admin"
          component={AdminLayout}
          loading={layoutState.loading}
          isAuthenticated={layoutState.isAuthenticated} />
        <Route path="/login" exact component={LoginScreen} />
      </Switch>
    </React.Suspense>
  </Router>
}



export const App = connect(mapState, mapAction)(AppComponent)