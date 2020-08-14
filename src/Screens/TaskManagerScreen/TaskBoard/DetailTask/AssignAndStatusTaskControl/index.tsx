import * as React from 'react';
import { Row, Col } from 'reactstrap';
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

    return <Row className="mt-1 mb-3">
        <Col>
            <Select
                defaultValue={{ label: DefaultValue.listAssignGroup[task_selected.assign_group], value: task_selected.assign_group }}
                options={assignGroup}
                onChange={changeAssignGroup} />
        </Col>
        <Col>
            <Select
                defaultValue={{ value: task_selected.assigned_member_id, label: task_selected.assigned_member_name }}
                formatOptionLabel={FormatOptionLabel}
                options={listMemberFilterd} />
        </Col>
        <Col>
            <Select
                defaultValue={{ label: task_selected.status, value: task_selected.status }}
                options={DefaultValue.listTaskStatus.map(it => ({ label: it.name, value: it.key }))} />
        </Col>
    </Row>
}

const FormatOptionLabel: React.FC<any> = (item) => (
    _.isEmpty(item)
        ? < div style={{ display: "flex", alignItems: "center" }}>
            <Components.Avata name={item.label} target={`user_${item.value}`} />
            <div className="ml-2"> {item.label}</div>
        </div >
        : <div>Unassigned</div>
);