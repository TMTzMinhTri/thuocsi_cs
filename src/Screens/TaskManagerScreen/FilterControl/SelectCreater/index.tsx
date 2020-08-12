import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { IResponseUser } from 'Interface/Response/session.types';
import Select from 'react-select'

interface ISelectCreaterProps {
    listMember: IResponseUser[],
    handleOnSelect: (value: { type: string, value: any }) => void
    created_by: { label: string; value: number }
}

export const SelectCreater: React.FC<ISelectCreaterProps> = ({ listMember, created_by, handleOnSelect }) => {
    return <FormGroup>
        <Label >Creater</Label>
        <Select
            isClearable
            value={created_by}
            onChange={(value) => handleOnSelect({ type: "created_by_id", value })}
            options={listMember.map(item => ({ label: item.name, value: item.id }))}
        />
    </FormGroup>
}