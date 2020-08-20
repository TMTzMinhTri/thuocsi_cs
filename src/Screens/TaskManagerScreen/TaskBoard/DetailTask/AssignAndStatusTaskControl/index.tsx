import * as React from 'react';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import Select from "react-select";
import { DefaultValue } from "Utils";
import { Icstasks } from 'Interface/Response/task_manager.types';
import { IResponseUser } from 'Interface/Response/session.types';
import _ from "lodash";
import * as Components from "Components";


interface IAssignAndStatusTaskControlProps {
    task_selected: Icstasks,
    list_member: IResponseUser[]
}

export const AssignAndStatusTaskControl: React.FC<IAssignAndStatusTaskControlProps> = ({ task_selected, list_member }) => {
    const [listMemberFilterd, FilterListMember] = React.useState(_.filter(list_member, (it) => `${it.roles}_group` === task_selected.assign_group).map(it => ({ label: it.name, value: it.id })))
    const assignGroup = React.useMemo(() => Object.keys(DefaultValue.listAssignGroup).map(it => ({ label: DefaultValue.listAssignGroup[it], value: it })), [])

    const changeAssignGroup = (value: { label: string, value: string }) => {
        const filtermember = _.filter(list_member, (it) => `${it.roles}_group` === value.value).map(it => ({ label: it.name, value: it.id }))
        FilterListMember(filtermember)
    }

    return <Row>
        <Col>
            <FormGroup>
                <Label for="assignGroup">Assign Group</Label>
                <Select
                    inputId="assignGroup"
                    defaultValue={{ label: DefaultValue.listAssignGroup[task_selected.assign_group], value: task_selected.assign_group }}
                    options={assignGroup}
                    onChange={changeAssignGroup} />
            </FormGroup>
        </Col>
        <Col>
            <FormGroup>
                <Label for="assign_member">Assign member</Label>
                <Select
                    inputId="assign_member"
                    defaultValue={{ value: task_selected.assigned_member_id, label: task_selected.assigned_member_name }}
                    formatOptionLabel={FormatOptionLabel}
                    options={listMemberFilterd} />
            </FormGroup>
        </Col>
        <Col>
            <FormGroup>
                <Label for="status_task">Status task</Label>
                <Select
                    inputId="status_task"
                    defaultValue={{ label: task_selected.status, value: task_selected.status }}
                    options={DefaultValue.listTaskStatus.map(it => ({ label: it.name, value: it.key }))} />
            </FormGroup>
        </Col>
    </Row>
}

const FormatOptionLabel: React.FC<any> = (item) => (
    // _.isEmpty(item)
    < div style={{ display: "flex", alignItems: "center" }}>
        <Components.Avata name={item.label ? item.label : "Unassigned"} target={`user_${item.value}`} />
        <div className="ml-2"> {item.label ? item.label : "Unassigned"}</div>
    </div >
    // : <div>Unassigned</div>
);