import * as React from "react";
import { Badge } from "reactstrap";
import classNames from "classnames";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { StatusTask } from "Utils";
import { Icstasks } from "Interface/Response/task_manager.types";
import * as Components from "Components";



interface IListTaskProps extends RouteComponentProps {
    loading: boolean,
    cs_tasks: Icstasks[],
    taskSelected: number
}

export const ListTaskComponent: React.FC<IListTaskProps> = ({ loading, cs_tasks, history, taskSelected, location }) => {
    const handleClick = (id: number) => {
        return history.replace(`${location.pathname}?selected_task=${id}`)
    }
    return <tbody>
        {loading
            ? renderTableRow(<Components.Loading />)
            : cs_tasks.length > 0
                ? cs_tasks.map((item, index) =>
                    <tr
                        key={`task_item_${index}`}
                        onClick={() => handleClick(item.id)}
                        className={classNames("cursor-pointer", { "active": taskSelected === item.id })}>
                        <td>
                            <Link to={`${location.pathname}?selected_task=${item.id}`}>{item.id}</Link>
                        </td>
                        <td>{item.so_id}</td>
                        <td>{item.so_id}</td>
                        <td>{item.so_id}</td>
                        <td>{item.so_id}</td>
                        <td><div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{item.cs_note}</div></td>
                        <td >
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex flex-column align-items-end mr-2">
                                    <Badge color={classNames(
                                        { primary: item.status === StatusTask.assigned },
                                        { danger: item.status === StatusTask.pending },
                                        { success: item.status === StatusTask.done },
                                        { secondary: item.status === StatusTask.canceled },
                                        { info: item.status === StatusTask.in_progress }
                                    )}>{item.status}</Badge>
                                    <Components.TimeAgo datetime={item.created_at} />
                                </div>
                                <Components.Avata name={item.created_by} target={`task-${item.id}`} />
                            </div>
                        </td>
                    </tr>
                )
                : renderTableRow(<img src="https://assets.thuocsi.vn/assets/buymed/logos/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg" alt="empty_result" />)}
    </tbody>
}
const renderTableRow = (component: React.ReactElement) => {
    return <tr>
        <td colSpan={7}>{component}</td>
    </tr>
}

export const ListTask = withRouter(ListTaskComponent)