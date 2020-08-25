import * as React from 'react';
import { IResponseSearchTask } from 'Interface/Response/task_manager.types';
import { isEmpty } from "lodash";
import { useTable } from 'react-table'
import { Table, Badge } from 'reactstrap';
import { StatusTask } from 'Utils';
import * as Components from "Components";
import classnames from "classnames";

interface IListTaskProps {
    task: IResponseSearchTask
}



export const ListTask: React.FC<IListTaskProps> = ({ task }) => {
    const columns = React.useMemo(
        () => [{ Header: '#', accessor: 'id' },
        { Header: 'SO#', accessor: 'so_id' },
        { Header: 'Order#', accessor: 'order_id' },
        { Header: 'Case subject', accessor: 'cs_note' },
        { Header: 'Account', accessor: 'user_name' },
        { Header: 'Agent', accessor: 'created_by' }],
        []
    )

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow, } = useTable({ columns, data: task ? task.cs_tasks : [] })

    return !isEmpty(task) &&
        <div className="task-board__container my-3">
            <div className="sticky_table h-100">
                <Table {...getTableProps()} hover size="sm" >
                    {header(headerGroups)}
                    <tbody {...getTableBodyProps()}>
                        {task.cs_tasks.length === 0 ? renderTableRow(<div>Trống</div>)
                            : rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} onClick={() => { }} >
                                        {row.cells.map(cell => {
                                            const data = cell.row.original
                                            return (<td {...cell.getCellProps()}
                                                className={classnames(
                                                    { "row_issues": cell.column.id === "cs_note" },
                                                    { "row_id": cell.column.id === "id" },
                                                    { "row_orderid": cell.column.id === "order_id" || cell.column.id === "so_id" },
                                                    { "row_issues": cell.column.id === "cs_note" },
                                                    { "row_account": cell.column.id === "user_name" },
                                                    { "row_agent": cell.column.id === "created_by" })}
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
                                                        <Components.Avata name={cell.value} target={`Tran-Minh-Tri-Task-${data.id}`} />
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
}
const header = (headerGroups) => {
    return <thead>
        {headerGroups.map(headerGroup => {
            return <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                    return <th {...column.getHeaderProps()}
                        className={classnames(
                            { "row_id": column.id === "id" },
                            { "row_orderid": column.id === "order_id" || column.id === "so_id" },
                            { "row_issues": column.id === "cs_note" },
                            { "row_account": column.id === "user_name" },
                            { "row_agent": column.id === "created_by" },
                        )}>
                        {column.render('Header')}
                    </th>
                })}
            </tr>
        })}
    </thead>
}
const renderTableRow = (component: React.ReactElement) => {
    return <tr>
        <td colSpan={7}>{component}</td>
    </tr>
}