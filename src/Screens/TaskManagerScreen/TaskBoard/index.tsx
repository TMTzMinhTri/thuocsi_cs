import * as React from "react";
import { Table, Badge, Spinner } from "reactstrap";
import classnames from "classnames";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { StatusTask } from "Utils";
import { Icstasks } from "Interface/Response/task_manager.types";
import { DetailTask } from "./DetailTask";

interface ITaskBoardProps {
   cs_tasks: Icstasks[],
   path: string,
   loading: boolean,
   taskSelected: number
}

type IProps = ITaskBoardProps & RouteComponentProps

const TaskBoardComponent: React.FC<IProps> = React.memo(({ cs_tasks, path, history, loading, taskSelected }) => {

   const handleClick = (id: number) => {
      return history.replace(`${path}?name=${id}`)
   }
   return <div className="d-flex">
      <div className="sticky_table">
         <Table className="table" hover style={{ width: "100%", tableLayout: "fixed" }} >
            <thead>
               <tr>
                  <th style={{ width: "10%" }}>Mã ĐH</th>
                  <th style={{
                     textOverflow: "ellipsis",
                     whiteSpace: "nowrap",
                     width: "60%",
                     maxWidth: "60%"
                  }}>Ghi chú</th>
                  <th style={{ width: "30%", textAlign: "right" }}>Trạng thái</th>
               </tr>
            </thead>
            <tbody>
               {loading
                  ? renderTableRow(<Spinner />)
                  : cs_tasks.length > 0
                     ? cs_tasks.map((item, index) =>
                        <tr
                           key={`task_item_${index}`}
                           onClick={() => handleClick(item.id)}
                           className={classnames("cursor-pointer", { "active": taskSelected === item.id })}>
                           <td>
                              <Link to={`${path}?name=${item.id}`}>{item.id}</Link>
                           </td>
                           <td><div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{item.cs_note}</div></td>
                           <td style={{ textAlign: "right" }}>
                              <Badge color={classnames(
                                 { primary: item.status === StatusTask.assigned },
                                 { danger: item.status === StatusTask.pending },
                                 { success: item.status === StatusTask.done },
                                 { secondary: item.status === StatusTask.canceled },
                                 { info: item.status === StatusTask.in_progress }
                              )}>{item.status}</Badge></td>
                        </tr>
                     )
                     : renderTableRow(<img src="https://assets.thuocsi.vn/assets/buymed/logos/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg" alt="empty_result" />)}
            </tbody>
         </Table>
      </div>
      <DetailTask path={path} cs_tasks={cs_tasks} loading={loading} />
   </div>
})

const renderTableRow = (component: React.ReactElement) => {
   return <tr>
      <td>{component}</td>
   </tr>
}
export const TaskBoard = withRouter(TaskBoardComponent)