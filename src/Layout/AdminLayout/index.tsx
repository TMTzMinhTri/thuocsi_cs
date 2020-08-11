import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import * as  Screens from "Screens";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
// import { Footer } from "./Footer";
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import * as Components from "Components";
import { Button } from 'reactstrap';


const mapState = (state: RootState) => ({
    role: state.layout.user?.roles
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
}, dispatch)

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

const AdminLayout: React.SFC<IProps> = ({ role }) => {
    let { path } = useRouteMatch();
    return <div className="container-scroller">
        <NavBar />
        <div className="container-fluid page-body-wrapper">
            <SideBar />
            <div className="main-panel">
                <div className="content-wrapper">
                    <Switch>
                        <Route path={`${path}/task-manager/all-case`} component={Screens.TaskManagerScreen} />
                        <Route path={`${path}/task-manager/my-case`} component={MyCase} />
                        <Route path={`${path}/files`} component={Topic} />
                        <Redirect to={`${path}/task-manager/all-case`} />
                    </Switch>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    </div>
}

const Topic = ({ role }: any) => {
    // let { topicId } = useParams();
    return <div>
        {/* {topicId} */}
        Files
        <Components.Can role={"admin"}>
            <Button>CLick</Button>
        </Components.Can>
    </div>
}

const MyCase = () => {
    return <div>My Case</div>
}

export default connect(mapState, mapAction)(AdminLayout)