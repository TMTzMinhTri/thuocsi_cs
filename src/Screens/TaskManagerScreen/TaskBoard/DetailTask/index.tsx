import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Utils from "Utils";
import { Icstasks } from 'Interface/Response/task_manager.types';
import { CardTitle, CardText, Badge } from 'reactstrap';
// import * as Components from "Components";
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { createCommentInTask, selectDetailTask } from 'Store/actions/task_manager.actions';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';

interface IPropsComponent extends RouteComponentProps {
    path: string,
}
const mapState = (state: RootState) => ({
    currentUser: state.layout.user,
    task_manager: state.task_manager
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    createCommentInTask, selectDetailTask
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & RouteComponentProps & IPropsComponent & Dispatch

export const DetailTaskComponent: React.FC<Iprops> = React.memo(({ path, task_manager, history, currentUser, createCommentInTask, selectDetailTask }) => {
    let { name } = Utils.getQueryparams(["name"])
    const refDetail = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        name && selectDetailTask(parseInt(name), (task: Icstasks) => {
            if (!task) {
                history.replace(path)
            }
            refDetail.current !== null && refDetail.current.scrollTo({ top: 0, behavior: "smooth" })
        })
    }, [history, name, path, selectDetailTask])



    return name && task_manager.task_selected !== null
        ? <div ref={refDetail} className="detail-task">
            <div className="detail-task__header">
                <div>{Utils.FormatDateBy_YYYY_MM_DD(task_manager.task_selected?.created_at)} - {Utils.converTime(task_manager.task_selected?.created_at)}</div>
                <Link to={path}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Link>
            </div>
            <div className="detail-task__body">
                <div className="detail-task__title">{task_manager.task_selected?.cs_note}</div>
                <div className="my-2">
                    {task_manager.task_selected?.failure_type_names.map((item, index) =>
                        <Badge
                            color="primary"
                            pill
                            className={index !== 0 ? "mx-1" : ""}
                            key={`failure_type_${index}`}>{item}</Badge>)}
                </div>
                <div>
                    <CardTitle>Thông tin đơn hàng</CardTitle>
                    <CardText>G/T đơn hàng: {Utils.formatCurrency(task_manager.task_selected.total)}</CardText>
                    <CardText>S/L sản phẩm{task_manager.task_selected.quantity_counter}</CardText>
                    <CardText>{task_manager.task_selected.so_id}</CardText>
                    <CardText>{task_manager.task_selected.order_id}</CardText>
                    <CardText>{task_manager.task_selected.order_status}</CardText>
                    <CardText>{task_manager.task_selected.return_id}</CardText>
                    <CardText >Mã return: {task_manager.task_selected.return_id}</CardText>
                    <CardTitle>Thông tin Khách hàng</CardTitle>
                    <CardText>Nhà thuốc: {task_manager.task_selected.business_name}</CardText>
                    <CardText>Khách hàng: {task_manager.task_selected.user_name}</CardText>
                    <CardText>SĐT: {task_manager.task_selected.user_phone}</CardText>
                </div>
                <div className="detail-task__activity" >
                    <CommentInput name={name} CreateComment={createCommentInTask} currentUser={currentUser} comments={task_manager.task_selected.comments} />
                    <CommentList comments={task_manager.task_selected.comments} />
                </div>
            </div>
        </div>
        : null
})
export const DetailTask = connect(mapState, mapAction)(withRouter(DetailTaskComponent))