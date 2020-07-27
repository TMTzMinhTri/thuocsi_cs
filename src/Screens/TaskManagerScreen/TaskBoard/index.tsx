import * as React from "react";
import { Table, Badge } from "reactstrap";
import classnames from "classnames";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { StatusTask } from "Utils";
import { Icstasks } from "Interface/Response/task_manager.types";
import { DetailTask } from "./DetailTask";

interface ITaskBoardProps {
   cs_tasks: Icstasks[],
   path: string
}

type IProps = ITaskBoardProps & RouteComponentProps

const TaskBoardComponent: React.FC<IProps> = React.memo(({ cs_tasks, path, history }) => {

   const handleClick = (id: number) => {
      return history.replace(`${path}?name=${id}`)
   }

   return <div className="d-flex">
      <div className="sticky_table table-responsive">
         <Table className="table" hover style={{ width: "100%", tableLayout: "fixed" }}>
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
               {cs_tasks.map((item, index) => {
                  return <tr key={`task_item_${index}`} onClick={() => handleClick(item.id)} className="cursor-pointer">
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
                           { in_progress: item.status === StatusTask.in_progress }
                        )}>{item.status}</Badge></td>
                  </tr>
               })}
            </tbody>
         </Table>
      </div>
      <DetailTask path={path} cs_tasks={cs_tasks} />
   </div>
})
export const TaskBoard = withRouter(TaskBoardComponent)