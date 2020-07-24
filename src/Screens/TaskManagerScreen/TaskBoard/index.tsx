import * as React from "react";
import { Table, Badge } from "reactstrap";
import classnames from "classnames";
import { StatusTask } from "Utils";
import { Icstasks } from "Interface/Response/task_manager.types";
import { Link, useLocation, RouteComponentProps, withRouter } from "react-router-dom";

interface ITaskBoardProps {
   cs_tasks: Icstasks[],
   path: string
}

type IProps = ITaskBoardProps & RouteComponentProps

const TaskBoardComponent: React.FC<IProps> = React.memo(({ cs_tasks, path, history }) => {

   const handleClick = (id: string) => {
      return history.replace(`${path}?name=${id}`)
   }

   return <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
         <div className="card">
            <div className="card-body">
               <h4 className="card-title">Basic Table</h4>
               <p className="card-description"> Add className <code>.table</code>
               </p>
               <div className="d-flex">
                  <div className="overflow-hidden table-responsive">
                     <Table className="table" hover style={{ width: "100%", tableLayout: "fixed" }}>
                        <tbody>
                           {cs_tasks.map((item, index) => {
                              return <tr key={`task_item_${index}`} onClick={() => handleClick(item.id)} className="cursor-pointer">
                                 <td style={{ width: "10%" }}>
                                    <Link to={`${path}?name=${item.id}`}>{item.id}</Link>
                                 </td>
                                 <td style={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "60%",
                                    maxWidth: "60%"
                                 }}><div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{item.cs_note}</div></td>
                                 <td style={{ width: "30%", textAlign: "right" }}>
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
                  {Topic(path)}
               </div>
            </div>
         </div>
      </div>

   </div>
})
export const TaskBoard = withRouter(TaskBoardComponent)

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const Topic = (path: string) => {

   let query = useQuery();
   let name = query.get('name')
   return name && <div style={{ width: "50%" }}>
      <div><Link to={path}>Back</Link></div>
      <div>{name}</div>

   </div>
}