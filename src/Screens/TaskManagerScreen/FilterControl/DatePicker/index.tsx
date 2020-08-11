import * as React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import { Label, FormGroup } from 'reactstrap';



export const DatePicker = () => {
    const [value, onChange] = React.useState([new Date(), new Date()]);

    return <FormGroup>
        <Label >Date</Label>
        <DateRangePicker
            className="w-100"
            onChange={onChange}
            value={value}
        />
    </FormGroup>
}