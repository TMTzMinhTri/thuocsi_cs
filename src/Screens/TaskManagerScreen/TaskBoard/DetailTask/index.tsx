import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Utils from "Utils";
import { Icstasks } from 'Interface/Response/task_manager.types';
import { Card, CardTitle, CardText, Badge, Input, Label, Form, FormGroup, Button } from 'reactstrap';
import * as Components from "Components";
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { toast } from 'react-toastify';

interface IPropsComponent extends RouteComponentProps {
    path: string,
    cs_tasks: Icstasks[],
    loading: boolean
}
const mapState = (state: RootState) => ({
    currentUser: state.layout.user
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & RouteComponentProps & IPropsComponent

export const DetailTaskComponent: React.FC<Iprops> = ({ path, cs_tasks, history, loading, currentUser }) => {
    let { name } = Utils.getQueryparams(["name"])
    const task = React.useMemo(() => cs_tasks.find(item => item.id === parseInt(name)), [cs_tasks, name])

    React.useEffect(() => {
        if (!loading && task === undefined) {
            history.replace(path)
        }
        
    }, [task, history, loading, path])

    const CreateComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast.success("Tạo thành công", { autoClose: 1500 })
    }

    return name &&
        task ? <div className="detail-task">
            <div className="detail-task__header">
                <div>{Utils.FormatDateBy_YYYY_MM_DD(task?.created_at)} - {Utils.converTime(task?.created_at)}</div>
                <Link to={path}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Link>
            </div>
            <div className="detail-task__body">
                <div className="detail-task__title">{task?.cs_note}</div>
                <div className="my-2">
                    {task?.failure_type_names.map((item, index) =>
                        <Badge
                            color="primary"
                            pill
                            className={index !== 0 ? "mx-1" : ""}
                            key={`failure_type_${index}`}>{item}</Badge>)}
                </div>
                <div>
                    <Card body>
                        <CardTitle>Thông tin đơn hàng</CardTitle>
                        <CardText>G/T đơn hàng: {Utils.formatCurrency(task.total)}</CardText>
                        <CardText>S/L sản phẩm{task.quantity_counter}</CardText>
                        <CardText>{task.so_id}</CardText>
                        <CardText>{task.order_id}</CardText>
                        <CardText>{task.order_status}</CardText>
                        <CardText>{task.return_id}</CardText>
                        <CardText >Mã return: {task.return_id}</CardText>
                    </Card>
                    <Card body>
                        <CardTitle>Thông tin Khách hàng</CardTitle>
                        <CardText>Nhà thuốc: {task.business_name}</CardText>
                        <CardText>Khách hàng: {task.user_name}</CardText>
                        <CardText>SĐT: {task.user_phone}</CardText>
                    </Card>
                </div>
                <div className="detail-task__activity">
                    <Form onSubmit={CreateComment}>
                        <FormGroup>
                            <Label className="detail-task__title" for={`user_${currentUser?.id}`}>Activity</Label>
                            <div className="detail-task__comment">
                                <Components.Avata name={currentUser ? currentUser.name : ""} target={`current_user_${currentUser?.id}`} classNames="mr-2" />
                                <Input type="textarea" name="text" id={`user_${currentUser?.id}`} />
                            </div>
                            <div className="d-flex justify-content-end" >
                                <Button color="primary">Save</Button>
                                <Button color="secondary" className="ml-2">Cancle</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
        : null
}
export const DetailTask = connect(mapState)(withRouter(DetailTaskComponent))