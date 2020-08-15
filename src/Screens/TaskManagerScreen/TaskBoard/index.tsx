import * as React from "react";
import { Table } from "reactstrap";
import { useTable } from 'react-table'
import classnames from "classnames";

import { Icstasks } from "Interface/Response/task_manager.types";
import { DetailTask } from "./DetailTask";
// import { ListTask } from "./ListTask";
import * as Components from "Components";
import { withRouter, RouteComponentProps } from "react-router-dom";

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
      { Header: 'Issue', accessor: 'cs_note' }],
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

   return <div className="d-flex">
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
                                 return (
                                    <td {...cell.getCellProps()}
                                       className={classnames({ "row_issues": cell.column.id === "cs_note" })}
                                       style={{
                                          padding: '5px',
                                       }}>
                                       {cell.render('Cell')}
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
               )}>
                  {column.render('Header')}
               </th>
            })}
         </tr>
      })}
   </thead>
}