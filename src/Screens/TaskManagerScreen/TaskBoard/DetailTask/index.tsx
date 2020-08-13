import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Container, } from 'reactstrap';
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

interface IPropsComponent extends RouteComponentProps {
    path: string,
}
const mapState = (state: RootState) => ({
    currentUser: state.layout.user,
    task_manager: state.task_manager,
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    createCommentInTask, selectDetailTask
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & RouteComponentProps & IPropsComponent & Dispatch

export const DetailTaskComponent: React.FC<Iprops> = React.memo(({ path, task_manager, history, currentUser, createCommentInTask, selectDetailTask }) => {
    let { selected_task } = Utils.getQueryparams(["selected_task"])
    const refDetail = React.useRef<HTMLDivElement>(null)
    const [modal, setModal] = React.useState(false);

    React.useEffect(() => {
        selected_task && selectDetailTask(parseInt(selected_task), (task: Icstasks) => {
            if (!task) {
                history.replace(path)
            } else {
                refDetail.current !== null && refDetail.current.scrollTo({ top: 0, behavior: "smooth" })
                setModal(true)
            }
        })
    }, [history, selected_task, path, selectDetailTask])


    const goBack = () => {
        setModal(!modal)
        _.debounce(() => history.replace(path), 300)()
    }

    return selected_task && task_manager.task_selected !== null
        ? <Modal isOpen={modal}
            style={{ position: "absolute", right: 0, margin: 0, height: "100vh" }}
            toggle={goBack}
            size="xl"
            contentClassName="h-100"
            modalTransition={{ baseClass: `animate__animated animate__faster ${modal ? "animate__slideInRight " : "animate__slideOutRight"}`, timeout: 200 }}
        >
            <ModalHeader toggle={goBack}><div>{Utils.FormatDateBy_DD_MM_YYYY(task_manager.task_selected?.created_at)} - {Utils.converTime(task_manager.task_selected?.created_at)}</div></ModalHeader>
            <ModalBody>
                <div ref={refDetail} className="detail-task">
                    <div className="detail-task__body">
                        <Container>
                            <TaskInfomation task_selected={task_manager.task_selected} />
                            <AssignAndStatusTaskControl list_member={task_manager.list_member} task_selected={task_manager.task_selected} />
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