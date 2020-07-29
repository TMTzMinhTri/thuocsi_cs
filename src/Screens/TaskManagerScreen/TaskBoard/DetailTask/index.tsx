import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Utils from "Utils";
import { Icstasks } from 'Interface/Response/task_manager.types';

interface IProps extends RouteComponentProps {
    path: string,
    cs_tasks: Icstasks[],
    loading: boolean
}


export const DetailTaskComponent: React.FC<IProps> = ({ path, cs_tasks, history, loading }) => {
    let { name } = Utils.getQueryparams(["name"])
    const task = React.useMemo(() => cs_tasks.find(item => item.id === parseInt(name)), [cs_tasks, name])
    React.useEffect(() => {
        if (!loading && task === undefined) {
            history.replace(path)
        }
    }, [task, history, loading, path])
    return name && <div style={{ width: "50%" }}>
        <div><Link to={path}>Back</Link></div>
        <div>{task?.cs_note}</div>
    </div>
}
export const DetailTask = withRouter(DetailTaskComponent)