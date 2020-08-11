import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select'

import { DefaultValue } from "Utils";

export const SelectStatus: React.FC<{}> = () => {
    return <FormGroup>
        <Label >Trạng thái</Label>
        <Select
            options={DefaultValue.listTaskStatus.map(item => ({ value: item.key, label: item.name }))}
        />
    </FormGroup>
}