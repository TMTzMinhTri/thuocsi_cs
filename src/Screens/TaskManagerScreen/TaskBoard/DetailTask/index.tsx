import * as React from 'react';
import { Link } from 'react-router-dom';
import Utils from "Utils";
import { Icstasks } from 'Interface/Response/task_manager.types';

interface IProps {
    path: string,
    cs_tasks: Icstasks[]
}


export const DetailTask: React.FC<IProps> = ({ path, cs_tasks }) => {
    let { name } = Utils.getQueryparams(["name"])
    const task = React.useMemo(() => cs_tasks.find(item => item.id === parseInt(name)), [cs_tasks, name])

    return name && <div style={{ width: "50%" }}>
        <div><Link to={path}>Back</Link></div>
        <div>{task?.cs_note}</div>
    </div>
}