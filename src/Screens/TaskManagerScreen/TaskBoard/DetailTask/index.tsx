import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Container, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import _ from "lodash";

import Utils from "Utils";
import { Icstasks } from 'Interface/Response/task_manager.types';
import { RootState } from 'Store';
import { RootAction } from 'Interface/Store/index.types';
import { createCommentInTask, selectDetailTask } from 'Store/actions/task_manager.actions';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { AssignAndStatusTaskControl } from './AssignAndStatusTaskControl';
import { TaskInfomation } from './TaskInfomation';
import { Description } from './Description';
import { FeedbackInformation } from './FeedbackInformation/index';

interface IPropsComponent extends RouteComponentProps {
}
const mapState = (state: RootState) => ({
    currentUser: state.layout.user,
    task_manager: state.task_manager,
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    createCommentInTask, selectDetailTask
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & RouteComponentProps & IPropsComponent & Dispatch

export const DetailTaskComponent: React.FC<Iprops> = React.memo(({ location, task_manager, history, currentUser, createCommentInTask, selectDetailTask }) => {
    let { selected_task } = Utils.getQueryparams(["selected_task"])
    const refDetail = React.useRef<HTMLDivElement>(null)
    const [modal, setModal] = React.useState(false);

    React.useEffect(() => {
        selected_task && selectDetailTask(parseInt(selected_task), (task: Icstasks) => {
            if (!task) {
                history.replace(location.pathname)
            } else {
                refDetail.current !== null && refDetail.current.scrollTo({ top: 0, behavior: "smooth" })
                setModal(true)
            }
        })
    }, [history, selected_task, location.pathname, selectDetailTask])

    const goBack = () => {
        setModal(!modal)
        _.debounce(() => history.replace(location.pathname), 300)()
    }

    return selected_task && task_manager.task_selected !== null
        ? <Modal isOpen={modal}
            style={{ position: "absolute", right: 0, margin: 0, height: "100vh" }}
            toggle={goBack}
            size="xl"
            contentClassName="h-100"
            modalTransition={{ baseClass: `animate__animated animate__faster ${modal ? "animate__slideInRight " : "animate__slideOutRight"}`, timeout: 200 }}
        >
            <ModalHeader toggle={goBack}>
                <FormGroup row className="mb-0">
                    <div className="container">
                        {Utils.FormatDateBy_DD_MM_YYYY(task_manager.task_selected?.created_at)} - {Utils.converTime(task_manager.task_selected?.created_at)}
                    </div>
                    <div className="container">
                        <div className="float-left inline-block mr-2">Người tạo:</div>
                        <div className="text-muted"> {task_manager.task_selected?.created_by}</div>
                    </div>
                </FormGroup>
            </ModalHeader>
            <ModalBody className="detail-task">
                <div ref={refDetail}>
                    <div className="detail-task__body">
                        <Container>
                            <TaskInfomation task_selected={task_manager.task_selected} />
                            <AssignAndStatusTaskControl list_member={task_manager.list_member} task_selected={task_manager.task_selected} />
                            <FeedbackInformation task_selected={task_manager.task_selected} />
                            <Description />
                            <div className="detail-task__activity" >
                                <CommentInput name={selected_task} CreateComment={createCommentInTask} currentUser={currentUser} comments={task_manager.task_selected.comments} />
                                <CommentList comments={task_manager.task_selected.comments} />
                            </div>
                        </Container>
                    </div>
                </div>
            </ModalBody>
        </Modal>
        : null
})
export const DetailTask = connect(mapState, mapAction)(withRouter(DetailTaskComponent))