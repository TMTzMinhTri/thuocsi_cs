import * as React from 'react';
import { Row, Col, CardText, Badge } from 'reactstrap';
import { Icstasks } from 'Interface/Response/task_manager.types';
import Utils from 'Utils';
import _ from "lodash";



interface ITaskInfomationProps {
    task_selected: Icstasks,
}

export const TaskInfomation: React.FC<ITaskInfomationProps> = ({ task_selected, }) => {
    return <React.Fragment>
        <Row>
            <Col md={12}><div className="detail-task__title">{task_selected?.cs_note}</div></Col>
            <Col md={12}>
                <div className="my-2">
                    {task_selected?.failure_type_names.map((item, index) =>
                        <Badge
                            color="primary"
                            pill
                            className={index !== 0 ? "mx-1" : ""}
                            key={`failure_type_${index}`}>{item}
                        </Badge>)}
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={4}><CardText><b>SO: </b>{task_selected.order_id}</CardText></Col>
            <Col md={4}><CardText><b>Order: #</b>{task_selected.order_id}</CardText></Col>
            <Col md={4}><CardText><b>Return: #</b>{task_selected.return_id}</CardText></Col>

            <Col md={4}><CardText><b>Bought at: </b>{Utils.FormatDateBy_DD_MM_YYYY(task_selected.bought_at)}</CardText></Col>
            <Col md={4}><CardText><b>Transfer cash: </b>{Utils.formatCurrency(task_selected.transferred_cash)}</CardText></Col>

            <Col md={4}><CardText><b>Quantity: </b>{task_selected.quantity_counter}</CardText></Col>
            <Col md={4}><CardText><b>Invoice: </b>{task_selected.total}</CardText></Col>
            <Col md={4}><CardText><b>Order status: </b> <span className="text-danger">{task_selected.order_status}</span></CardText></Col>

            <Col md={4}><CardText><b>Business name</b>: {task_selected.business_name}</CardText></Col>
            <Col md={4}><CardText><b>Username: </b>{task_selected.user_name}</CardText></Col>
            <Col md={4}><CardText><b>Phone: </b>{task_selected.user_phone}</CardText></Col>
            {!_.isEmpty(task_selected.bank_information)
                && <React.Fragment>
                    <Col md={4}><CardText><b>Account name:</b> {task_selected.bank_information.account_name}</CardText></Col>
                    <Col md={4}><CardText><b>Account number:</b> {task_selected.bank_information.account_number}</CardText></Col>
                    <Col md={4}><CardText><b>Bank: </b>{task_selected.bank_information.bank_name} - {task_selected.bank_information.branch_name}</CardText></Col>
                </React.Fragment>}
        </Row>
    </React.Fragment>
}