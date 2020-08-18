import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { getListTask, getListTaskByFilter, getListMemberAndReason } from 'Store/actions/task_manager.actions';
import { Card, CardBody, Row, Col, Button, Container } from 'reactstrap';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { TaskBoard } from './TaskBoard';
import { FilterControl } from './FilterControl';
import * as Components from "Components";
import { IUserInput } from 'Interface/Store/task_manager.types';
import Utils from "Utils";

const mapState = (state: RootState) => ({
  task_manager_state: state.task_manager,
  current_user: state.layout.user.id
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  getListTask,
  getListTaskByFilter,
  getListMemberAndReason
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & RouteComponentProps

export const TaskManagerScreenComponent: React.FC<Iprops> = ({ getListTask, task_manager_state, getListTaskByFilter, history, getListMemberAndReason, current_user }) => {
  let { own } = useParams();
  let { selected_task } = Utils.getQueryparams(["selected_task"])
  const refFilter = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    getListMemberAndReason()
  }, [getListMemberAndReason])

  React.useEffect(() => {
    getListTask(own === "my-case" ? current_user : null)
  }, [getListTask, own, current_user])

  const handlePagination = React.useCallback((value) => {
    const { userInput } = task_manager_state
    const user_input: IUserInput = {
      ...userInput,
      page: value
    }
    getListTaskByFilter(user_input)
  }, [getListTaskByFilter, task_manager_state])

  const showFilter = () => refFilter.current?.classList.toggle('show')
  return <div className="d-flex">
    <Container fluid>
      <Row>
        <Col md={12} className="d-flex">
          <div style={{ flex: 1 }}>
            <CardBody>
              <Button color="primary" onClick={showFilter} outline>
                <span className="mr-2">Fillter</span>
                <i className="fa fa-filter" aria-hidden="true"></i>
              </Button>
            </CardBody>
          </div>
        </Col>
        <div className="col-lg-12 stretch-card">
          <Card className="p-3">
            <TaskBoard
              cs_tasks={task_manager_state.cs_tasks}
              loading={task_manager_state.loading}
              taskSelected={parseInt(selected_task)} />
            <Components.PaginationBar
              current={task_manager_state.userInput.page}
              perpage={30}
              totalRecords={task_manager_state.total_count}
              size={"sm"}
              onChangePage={(value: number) => handlePagination(value)} />
          </Card>
        </div>
      </Row>
    </Container>
    <FilterControl ref={refFilter} showFilter={showFilter} />
  </div>

}

export const TaskManagerScreen = connect(mapState, mapAction)(TaskManagerScreenComponent)