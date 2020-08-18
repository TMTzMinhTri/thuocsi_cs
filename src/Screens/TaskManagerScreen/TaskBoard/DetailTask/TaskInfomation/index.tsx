import * as React from 'react';
import { Row, Col, CardText, Badge } from 'reactstrap';
import { Icstasks } from 'Interface/Response/task_manager.types';
import Utils from 'Utils';
import _ from "lodash";



interface ITaskInfomationProps {
    task_selected: Icstasks,
}

export const TaskInfomation: React.FC<ITaskInfomationProps> = ({ task_selected, }) => {
    const bankInformation = task_selected.bank_information;

    return <React.Fragment>
        <Row>
            <Col md={8}>
                <h2>{task_selected.so_id} - {task_selected.order_id}</h2>
            </Col>
            <Col md={4}><CardText><b>Ngày mua: </b><span className="text-muted">({Utils.FormatDateBy_DD_MM_YYYY(task_selected.bought_at)})</span></CardText></Col>

            <Col md={12} className="mb-2">
                <CardText><b>Mã trả hàng: </b>{task_selected.return_id ? task_selected.return_id : <span className="text-muted">(Không có)</span>}</CardText>
            </Col>

            <Col md={12} className="my-2"><div className="detail-task__title text-capitalize">{task_selected?.cs_note}</div></Col>
            <Col md={12} className="mb-4">
                <div>
                    {task_selected?.failure_type_names.map((item, index) =>
                        <Badge
                            color="primary"
                            pill
                            className={index !== 0 ? "mx-1" : ""}
                            key={`failure_type_${index}`}>{item}
                        </Badge>)}
                </div>
            </Col>

            <Col md={4}>
                <CardText>
                    <b>Số tiền đã chuyển:</b> <b className="text-success">{Utils.formatCurrency(task_selected.transferred_cash ? task_selected.transferred_cash : 0)}</b>
                </CardText>
            </Col>

            <Col md={4}><CardText><b>Số lượng: </b>{task_selected.quantity_counter}</CardText></Col>
            <Col md={4}><CardText><b>Số tiền thanh toán: </b><b className="text-success">{Utils.formatCurrency(task_selected.total)}</b></CardText></Col>
            <Col md={4}><CardText><b>Trạng thái đơn hàng: </b> <span className="text-danger">{task_selected.order_status}</span></CardText></Col>

            <Col md={4}><CardText><b>Tên doanh nghiệp: </b><span className="text-capitalize">{task_selected.business_name}</span></CardText></Col>
            <Col md={4}><CardText><b>Họ tên KH: </b><span className="text-capitalize">{task_selected.user_name}</span></CardText></Col>
            <Col md={4}><CardText><b>Số điện thoại: </b>{task_selected.user_phone}</CardText></Col>
            <Col md={4}><CardText></CardText></Col>

            <Col md={12}><CardText tag="h5" className="my-3">* Thông tin ngân hàng: </CardText></Col>

            {!_.isEmpty(bankInformation)
                && <React.Fragment>
                    <Col md={4}><CardText><b>Tên khách hàng:</b> <span className="text-capitalize">{bankInformation.account_name}</span></CardText></Col>
                    <Col md={4}><CardText><b>Số tài khoản:</b> {bankInformation.account_number}</CardText></Col>
                    <Col md={4}><CardText><b>Ngân hàng: </b><span className="text-capitalize">{bankInformation.bank_name} - {bankInformation.branch_name}</span></CardText></Col>
                </React.Fragment>}

            {_.isEmpty(bankInformation)
                && <React.Fragment>
                    <Col md={4}><CardText><b>Tên khách hàng:</b> <span className="text-muted">(Chưa cập nhật)</span></CardText></Col>
                    <Col md={4}><CardText><b>Số tài khoản:</b> <span className="text-muted">(Chưa cập nhật)</span></CardText></Col>
                    <Col md={4}><CardText><b>Ngân hàng: </b><span className="text-muted">(Chưa cập nhật)</span></CardText></Col>
                </React.Fragment>}
        </Row>
    </React.Fragment>
}