import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { IResponseUser } from 'Interface/Response/session.types';
import Select from 'react-select'

interface ISelectAssignedMemberProps {
    listMember: IResponseUser[],
    handleOnSelect: (value: { type: string, value: any }) => void
    assigned_member: { label: string; value: number }
}

export const SelectAssignedMember: React.FC<ISelectAssignedMemberProps> = ({ listMember, assigned_member, handleOnSelect }) => {
    return <FormGroup>
        <Label >Người tiếp nhận</Label>
        <Select
            isClearable
            value={assigned_member}
            onChange={(value) => handleOnSelect({ type: "assigned_member_id", value })}
            options={listMember.map(item => ({ label: item.name, value: item.id }))}
        />
    </FormGroup>
}