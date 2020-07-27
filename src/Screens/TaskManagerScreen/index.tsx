import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { getListTask, getListTaskByFilter } from 'Store/actions/task_manager.actions';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useRouteMatch, RouteComponentProps } from 'react-router-dom';
import { TaskBoard } from './TaskBoard';
import { FilterControl } from './FilterControl';
import * as Components from "Components";
import { IUserInput } from 'Interface/Store/task_manager.types';
import Utils from "Utils";

const mapState = (state: RootState) => ({
  task_manager_state: state.task_manager
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getListTask,
  getListTaskByFilter
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & RouteComponentProps

export const TaskManagerScreenComponent: React.FC<Iprops> = ({ getListTask, task_manager_state, getListTaskByFilter, history }) => {
  let { path } = useRouteMatch();
  let { name } = Utils.getQueryparams(["name"])

  React.useEffect(() => {
    getListTask()
  }, [getListTask])

  const handlePagination = React.useCallback((value) => {
    const { userInput } = task_manager_state
    const user_input: IUserInput = {
      ...userInput,
      page: value
    }
    if (name) history.replace(path)
    getListTaskByFilter(user_input)
  }, [getListTaskByFilter, task_manager_state, name, history, path])

  return <div className="row">
    <div className="col-lg-12 stretch-card">
      <Card>
        <CardBody>
          <CardTitle><h4>Task manager</h4></CardTitle>
          <FilterControl />
          <TaskBoard cs_tasks={task_manager_state.cs_tasks} path={path} loading={task_manager_state.loading} />
          <Components.PaginationBar
            current={task_manager_state.userInput.page}
            perpage={30}
            totalRecords={task_manager_state.total_count}
            size={"sm"}
            onChangePage={(value: number) => handlePagination(value)} />
        </CardBody>
      </Card>
    </div>
  </div>
}



// {/* <div className="page-header">
//             <h3 className="page-title"> Basic Tables </h3>
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
//                     <li className="breadcrumb-item active" aria-current="page">Basic tables</li>
//                 </ol>
//             </nav>
//         </div> */}

// <tr className="table-info">
//                                 <td> 1 </td>
//                                 <td> Herman Beck </td>
//                                 <td> Photoshop </td>
//                                 <td> $ 77.99 </td>
//                                 <td> May 15, 2015 </td>
//                             </tr>
//                             <tr className="table-warning">
//                                 <td> 2 </td>
//                                 <td> Messsy Adam </td>
//                                 <td> Flash </td>
//                                 <td> $245.30 </td>
//                                 <td> July 1, 2015 </td>
//                             </tr>
//                             <tr className="table-danger">
//                                 <td> 3 </td>
//                                 <td> John Richards </td>
//                                 <td> Premeire </td>
//                                 <td> $138.00 </td>
//                                 <td> Apr 12, 2015 </td>
//                             </tr>
//                             <tr className="table-success">
//                                 <td> 4 </td>
//                                 <td> Peter Meggik </td>
//                                 <td> After effects </td>
//                                 <td> $ 77.99 </td>
//                                 <td> May 15, 2015 </td>
//                             </tr>
//                             <tr className="table-primary">
//                                 <td> 5 </td>
//                                 <td> Edward </td>
//                                 <td> Illustrator </td>
//                                 <td> $ 160.25 </td>
//                                 <td> May 03, 2015 </td>
//                             </tr>

export const TaskManagerScreen = connect(mapState, mapAction)(TaskManagerScreenComponent)