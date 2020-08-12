import * as React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import { Label, FormGroup } from 'reactstrap';


interface IDatePickerProps {
    date: Array<Date>,
    handleSelectDate: (value: Array<Date>) => void
}

export const DatePicker: React.FC<IDatePickerProps> = ({ date, handleSelectDate }) => {
    return <FormGroup>
        <Label >Date</Label>
        <DateRangePicker
            className="w-100"
            onChange={(value) => handleSelectDate(value)}
            value={date}
            format="dd-MM-y"
            rangeDivider='>'
            clearIcon={null}
        />
    </FormGroup>
}