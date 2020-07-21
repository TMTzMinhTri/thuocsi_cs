import * as React from 'react';
import { Switch, Route, useRouteMatch, useParams, Link } from 'react-router-dom';
import * as  Screens from "Screens";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

const AdminLayout: React.SFC<{}> = () => {
    let { path, url } = useRouteMatch();
    console.log(path, url)

    return <div className="container-scroller">
        <NavBar />
        <div className="container-fluid page-body-wrapper">
            <SideBar />
            <div className="main-panel">
                <div className="content-wrapper">
                    <ul>
                        <li>
                            <Link to={`${url}/rendering`}>Rendering with React</Link>
                        </li>
                        <li>
                            <Link to={`${url}/components`}>Components</Link>
                        </li>
                        <li>
                            <Link to={`${url}/props-v-state`}>Props v. State</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path={path} component={Screens.TaskManagerScreen} />
                        {/* <Route path={`${path}/abc`} component={Screens.TaskManagerScreen} /> */}
                        <Route path={`${path}/:topicId`}>
                            <Topic />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
    </div>
}

const Topic = () => {
    let { topicId } = useParams();
    return <div>{topicId}</div>
}

export default AdminLayout