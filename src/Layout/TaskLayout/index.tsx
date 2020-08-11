import * as React from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import * as  Screens from "Screens";



const TaskLayout: React.FC<{}> = () => {
    let { path } = useRouteMatch();

    return <div className="task-wrapper">
        <Header />
        <SideBar />
        <div className="task-page">
            <Switch>
                <Route path={`${path}/task-manager/all-case`} component={Screens.TaskManagerScreen} />
                <Route path={`${path}/files`} component={Topic} />
                <Route path={`${path}/task-manager/my-case`} component={MyCase} />
                <Redirect to={`${path}/task-manager/all-case`} />
            </Switch>
        </div>
    </div>
}

const MyCase = () => {
    return <div>My Case</div>
}

const Topic = () => {
    return <div>
        Files
    </div>
}
export default TaskLayout