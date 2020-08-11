import * as React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Select, { components } from 'react-select'
import { IResponeListReason } from 'Interface/Response/task_manager.types';
interface ISelectReasonProps {
    listReason: IResponeListReason[]
}

export const SelectReason: React.FC<ISelectReasonProps> = ({ listReason }) => {

    const ValueContainer = ({ children, ...props }: any) => {
        const selected = props.getValue();
        const selectedC = React.Children.toArray(children).filter((it: any) => ["Input"].indexOf(it.type.name) >= 0)
        const content = `${selected.length} items`
        return <components.ValueContainer {...props}>
            {content}
            {selectedC}
        </components.ValueContainer>
    };

    return <FormGroup>
        <Label >Lý do</Label>
        <Select
            options={listReason.map(item => ({ label: item.name, value: item.id }))}
            isMulti
            components={{ ValueContainer }}
            closeMenuOnSelect={false}
            openMenuOnClick={true}
            hideSelectedOptions={false}
        />
    </FormGroup>
}