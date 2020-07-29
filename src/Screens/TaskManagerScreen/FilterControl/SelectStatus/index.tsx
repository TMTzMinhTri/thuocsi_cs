import * as React from 'react';
import { FormGroup, Label, Col } from 'reactstrap';
import Select from 'react-select'

import { DefaultValue } from "Utils";

export const SelectStatus: React.FC<{}> = () => {
    return <Col md={2}>
        <FormGroup>
            <Label >Trạng thái</Label>
            <Select
                options={DefaultValue.listTaskStatus.map(item => ({ value: item.key, label: item.name }))}
            />
        </FormGroup>
    </Col>
}