import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { IResponeListReason } from 'Interface/Response/task_manager.types';

interface ISelectReasonProps {
    listReason: IResponeListReason[],
    reasons: Array<{ label: string; value: number }> | [],
    handleOnSelect: (value: { type: string, value: any }) => void
}

export const SelectReason: React.FC<ISelectReasonProps> = ({ listReason, reasons, handleOnSelect }) => {

    return <FormGroup>
        <Label >Lý do</Label>
        <MultiSelect
            options={listReason.map(item => ({ label: item.name, value: item.id }))}
            value={reasons}
            onChange={(value) => handleOnSelect({ type: "failure_type_ids", value })}
            valueRenderer={(selected) => `${selected.length} items`}
            labelledBy={"Select"}
            hasSelectAll={false}
        />
    </FormGroup>
}