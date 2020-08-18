import * as React from "react";
import { Table, Badge } from "reactstrap";
import { useTable } from 'react-table'
import classnames from "classnames";

import { Icstasks } from "Interface/Response/task_manager.types";
import { DetailTask } from "./DetailTask";
// import { ListTask } from "./ListTask";
import * as Components from "Components";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { StatusTask } from "Utils";

interface ITaskBoardProps {
   cs_tasks: Icstasks[],
   loading: boolean,
   taskSelected: number
}

type IProps = ITaskBoardProps & RouteComponentProps

export const TaskBoardComponent: React.FC<IProps> = React.memo(({ cs_tasks, loading, taskSelected, history, location }) => {
   const columns = React.useMemo(
      () => [{ Header: '#', accessor: 'id' },
      { Header: 'SO#', accessor: 'so_id' },
      { Header: 'Order#', accessor: 'order_id' },
      { Header: 'Issue', accessor: 'cs_note' },
      { Header: 'Agent', accessor: 'created_by' }],
      []
   )

   const { getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow, } = useTable({ columns, data: cs_tasks })

   const showDetail = (id: string) => {
      return history.replace(`${location.pathname}?selected_task=${id}`)
   }

   return <div className="d-flex ">
      <div className="task-board__container">
         <div className="sticky_table">
            <Table {...getTableProps()} hover size="sm" >
               {header(headerGroups)}
               <tbody {...getTableBodyProps()}>
                  {loading ? renderTableRow(<Components.Loading />)
                     : rows.map(row => {
                        prepareRow(row)
                        return (
                           <tr {...row.getRowProps()} onClick={() => showDetail(row.values.id)} className={classnames("cursor-pointer", { "active": taskSelected === row.values.id })}>
                              {row.cells.map(cell => {
                                 const data = cell.row.original
                                 return (<td {...cell.getCellProps()}
                                    className={classnames({ "row_issues": cell.column.id === "cs_note" })}
                                    style={{
                                       padding: '5px',
                                    }}>
                                    {cell.column.id === "created_by"
                                       ? <div className="d-flex justify-content-end align-items-center">
                                          <div className="d-flex flex-column align-items-end mr-2">
                                             <Badge color={classnames(
                                                { primary: data.status === StatusTask.assigned },
                                                { danger: data.status === StatusTask.pending },
                                                { success: data.status === StatusTask.done },
                                                { secondary: data.status === StatusTask.canceled },
                                                { info: data.status === StatusTask.in_progress }
                                             )}>{data.status}</Badge>
                                             <Components.TimeAgo datetime={data.created_at} />
                                          </div>
                                          <Components.Avata name={cell.value} target={`task-${data.id}`} />
                                       </div>
                                       : cell.render('Cell')}
                                 </td>
                                 )
                              })}
                           </tr>
                        )
                     })}
               </tbody>
            </Table>
         </div>
      </div>
      {!loading && <DetailTask />}
      {/* <ListTask cs_tasks={cs_tasks} loading={loading} taskSelected={taskSelected} /> */}
   </div>
})
export const TaskBoard = withRouter(TaskBoardComponent)

const renderTableRow = (component: React.ReactElement) => {
   return <tr>
      <td colSpan={7}>{component}</td>
   </tr>
}

const header = (headerGroups) => {
   return <thead>
      {headerGroups.map(headerGroup => {
         return <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
               return <th {...column.getHeaderProps()} className={classnames(
                  { "row_id": column.id === "id" },
                  { "row_orderid": column.id === "order_id" || column.id === "so_id" },
                  { "row_issues": column.id === "cs_note" },
                  { "text-right": column.id === "created_by" },
               )}>
                  {column.render('Header')}
               </th>
            })}
         </tr>
      })}
   </thead>
}