import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { Loading } from "Components";
import { AppService } from "./App.service";
import { PrivateRoute } from 'Components/PrivateRoute';

const AdminLayout = React.lazy(() => import('Layout/AdminLayout/index'))
const LoginScreen = React.lazy(() => import('Screens/LoginScreen'))

export const App = () => {
  const appService = new AppService()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)

  // const fetchData = React.useCallback(() => {
  //   return appService
  //     .getCurrentUser()
  //     .subscribe({
  //       next: data => {
  //         if (data.status === 200) {
  //           setIsAuthenticated(true)
  //         } else setIsAuthenticated(false)
  //       },
  //       complete: () => setLoading(false)
  //     })
  // }, [appService])

  // React.useEffect(() => {
  //   function fetchData() {
  //     return appService
  //       .getCurrentUser()
  //       .subscribe({
  //         next: data => {
  //           if (data.status === 200) {
  //             setIsAuthenticated(true)
  //           } else setIsAuthenticated(false)
  //         },
  //         complete: () => setLoading(false)
  //       })
  //   }
  //   fetchData()
  //   return () => {
  //     // fetchData().unsubscribe()
  //   }
  // }, [])

  return <Router>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <PrivateRoute path="/admin" component={AdminLayout} loading={loading} isAuthenticated={isAuthenticated} />
        <Route path="/" render={() => <Redirect to="/admin" />} />
      </Switch>
    </React.Suspense>
  </Router>
}