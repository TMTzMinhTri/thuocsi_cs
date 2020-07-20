import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import * as  Screens from "Screens";

import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { Footer } from "./Footer";

const AdminLayout: React.SFC<{}> = ({ children }) => {
    let { path, url } = useRouteMatch();
    console.log(path, url)

    return <div className="container-scroller">
        <NavBar />
        <div className="container-fluid page-body-wrapper">
            <SideBar />
            <div className="main-panel">
                <div className="content-wrapper">
                    <Switch>
                        <Route exact path={path} component={Screens.TaskManagerScreen} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
    </div>
}

export default AdminLayout