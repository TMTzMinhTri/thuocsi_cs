import * as React from 'react';
import { FormGroup, Label, Col } from 'reactstrap';
import { IResponseUser } from 'Interface/Response/session.types';
import Select from 'react-select'

interface ISelectAssignedMemberProps {
    listMember: IResponseUser[]
}

export const SelectAssignedMember: React.FC<ISelectAssignedMemberProps> = ({ listMember }) => {
    return <Col md={2}>
        <FormGroup>
            <Label >Người tiếp nhận</Label>
            <Select options={listMember.map(item => ({ label: item.name, value: item.id }))} />
        </FormGroup>
    </Col>
}