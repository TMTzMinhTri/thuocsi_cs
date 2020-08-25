import * as React from 'react';
import { Row, Col, CardText, Button, Label, Input } from 'reactstrap';
import { IResponseSearchTask, IBankInfomation } from 'Interface/Response/task_manager.types';
import { isEmpty } from "lodash";

interface IBankInfomationProps {
    task: IResponseSearchTask | null
}
const defaultValue: IBankInfomation = {
    branch_name: "",
    bank_name: "",
    account_name: "",
    account_number: ""
}
export const BankInfomation: React.FC<IBankInfomationProps> = ({ task }) => {
    const [isEditing, setEditing] = React.useState<boolean>(false)
    const [bankInfo, setBankInfo] = React.useState<IBankInfomation>(defaultValue)

    React.useEffect(() => {
        setBankInfo(isEmpty(task) || isEmpty(task.bank_information) ? defaultValue : task.bank_information)
    }, [task])

    const HandleChangeBankInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBankInfo({ ...bankInfo, [name]: value })
    }
    const cancleEdit = () => {
        setBankInfo(isEmpty(task) || isEmpty(task.bank_information) ? defaultValue : task.bank_information)
        setEditing(false)
    }

    return !isEmpty(task) && < Row >
        <Col md={12} className="d-flex justify-content-between align-items-center">
            <CardText tag="h5" className="my-3">* Thông tin ngân hàng: </CardText>
            <div>
                {isEditing
                    ? <React.Fragment>
                        <Button color="link" onClick={() => setEditing(false)}>lưu</Button>
                        <Button color="link" onClick={cancleEdit}>Huỷ</Button>
                    </React.Fragment>
                    : <Button color="link" onClick={() => setEditing(true)}>Sửa</Button>
                }
            </div>
        </Col>
        <Col md={3}>
            <Label tag="b">Tên khách hàng: <span className="text-danger">(*)</span> </Label>
            <div style={{ wordBreak: "break-word" }}>{isEditing
                ? <Input value={bankInfo.account_name} onChange={HandleChangeBankInfo} name="account_name" />
                : !isEmpty(bankInfo.account_name) ? bankInfo.account_name : <b className="text-muted">(Chưa cập nhật)</b>}
            </div>
        </Col>
        <Col md={3}>
            <Label tag="b">Số tài khoản: <span className="text-danger">(*)</span></Label>
            <div style={{ wordBreak: "break-word" }}>{isEditing
                ? <Input value={bankInfo.account_number} onChange={HandleChangeBankInfo} name="account_number" />
                : !isEmpty(bankInfo.account_number) ? bankInfo.account_number : <b className="text-muted">(Chưa cập nhật)</b>}
            </div>
        </Col>
        <Col md={3}>
            <Label tag="b">Ngân hàng: <span className="text-danger">(*)</span></Label>
            <div style={{ wordBreak: "break-word" }}>{isEditing
                ? <Input value={bankInfo.bank_name} onChange={HandleChangeBankInfo} name="bank_name" />
                : !isEmpty(bankInfo.bank_name) ? bankInfo.bank_name : <b className="text-muted">(Chưa cập nhật)</b>}
            </div>
        </Col>
        <Col md={3}>
            <Label tag="b">Chi nhánh: </Label>
            <div style={{ wordBreak: "break-word" }}>{isEditing
                ? <Input value={bankInfo.branch_name} onChange={HandleChangeBankInfo} name="branch_name" />
                : !isEmpty(bankInfo.branch_name) ? bankInfo.branch_name : <b className="text-muted">(Chưa cập nhật)</b>}
            </div>
        </Col>
    </Row >
}