import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select'

import { DefaultValue } from "Utils";


interface ISelectStatusProps {
    handleOnSelect: (value: { type: string, value: any }) => void,
    status: { label: string; value: string } | null
}

export const SelectStatus: React.FC<ISelectStatusProps> = ({ handleOnSelect, status }) => {
    return <FormGroup>
        <Label >Trạng thái</Label>
        <Select
            isClearable
            value={status}
            onChange={(val: any) => handleOnSelect({ type: "status", value: val })}
            options={DefaultValue.listTaskStatus.map(item => ({ value: item.key, label: item.name }))}
        />
    </FormGroup>
}