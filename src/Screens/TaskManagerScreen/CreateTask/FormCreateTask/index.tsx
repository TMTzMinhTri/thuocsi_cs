import * as React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';
import { isEmpty } from "lodash";
import { IResponseSearchTask, IResponeListReason } from 'Interface/Response/task_manager.types';
import MultiSelect from "react-multi-select-component";
import Select, { ValueType } from 'react-select'
import { DefaultValue } from 'Utils';
import NumberFormat from 'react-number-format';


interface IFromCreateTaskProps {
    task: IResponseSearchTask,
    listReason: IResponeListReason[],
    handleUserInput: (name: string, value: any) => void,
    userInput: {
        failure_types: Array<{ label: string, value: number | null }>,
        assign_group: { label: string, value: string },
        return_id: number,
        transferred_cash: number,
        cs_note: string
    }
}

export const FromCreateTask: React.FC<IFromCreateTaskProps> = ({ task, listReason, handleUserInput, userInput }) => {
    const assignGroup = React.useMemo(() => Object.keys(DefaultValue.listAssignGroup).map(it => ({ label: DefaultValue.listAssignGroup[it], value: it })), [])


    return !isEmpty(task) &&
        <React.Fragment>
            <Row>
                <Col>
                    <Label>Chọn Lý do: </Label>
                    <MultiSelect
                        value={userInput.failure_types}
                        options={listReason && listReason.length > 0 ? listReason.map(item => ({ label: item.name, value: item.id })) : [{ label: "", value: null }]}
                        onChange={(value) => handleUserInput("failure_types", value)}
                        hasSelectAll={false}
                        labelledBy={"Select"}
                        valueRenderer={(selected) => `${selected.length} items`}
                    />
                </Col>
                <Col>
                    <Label>Chọn bộ phận tiếp nhận: </Label>
                    <Select
                        value={userInput.assign_group}
                        inputId="assignGroup"
                        options={assignGroup}
                        onChange={(value: ValueType<{
                            label: string;
                            value: any;
                        }>) => handleUserInput("assign_group", value)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Mã giao hàng tiết kiệm: (Mã return) </Label>
                    <Input placeholder="Mã giao hàng tiết kiệm" value={userInput.return_id}
                        onChange={(e) => handleUserInput("return_id", e.target.value)}
                    />
                </Col>
                <Col>
                    <Label>Số tiền trả lại </Label>
                    <NumberFormat
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        suffix={' VND'}
                        customInput={Input}
                        onValueChange={(e) => handleUserInput("transferred_cash", e.value)}
                        value={userInput.transferred_cash}
                        inputMode="numeric" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>Ghi chú (hàng trả về): </Label>
                    <Input type="textarea" name="text" id="exampleText" rows="4" value={userInput.cs_note}
                        onChange={(e) => handleUserInput("cs_note", e.target.value)}
                    />
                </Col>
            </Row>
        </React.Fragment>
}