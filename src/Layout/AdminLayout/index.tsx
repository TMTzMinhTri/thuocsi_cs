import * as React from 'react';
import { Switch, Route, useRouteMatch, useParams, Redirect } from 'react-router-dom';
import * as  Screens from "Screens";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
// import { Footer } from "./Footer";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'Interface/Store/index.types';


const mapState = (state: RootState) => ({
    notification: state.notification
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
}, dispatch)

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

const AdminLayout: React.SFC<IProps> = ({ notification }) => {
    let { path } = useRouteMatch();
    return <div className="container-scroller">
        <NavBar />
        <div className="container-fluid page-body-wrapper">
            <SideBar />
            <div className="main-panel">
                <div className="content-wrapper">
                    <Switch>
                        <Route path={`${path}/task-manager`} component={Screens.TaskManagerScreen} />
                        <Route path={`${path}/:topicId`}>
                            <Topic />
                        </Route>
                        <Redirect to={`${path}/task-manager`} />
                    </Switch>
                    {notification.alert && <SweetAlert {...notification.alert}>{notification.alert.content}</SweetAlert>}
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    </div>
}

const Topic = () => {
    let { topicId } = useParams();
    return <div>{topicId}</div>
}

export default connect(mapState, mapAction)(AdminLayout)