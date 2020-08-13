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
        <div>
            <DateRangePicker
                maxDate={new Date()}
                className="w-100"
                onChange={(value) => handleSelectDate(value)}
                value={date}
                format="dd-MM-y"
                calendarIcon={<i className="fa fa-calendar" aria-hidden="true"></i>}
                rangeDivider='>'
                clearIcon={null}
            />
        </div>
    </FormGroup>
}