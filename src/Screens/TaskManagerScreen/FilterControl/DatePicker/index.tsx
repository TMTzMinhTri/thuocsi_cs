import * as React from 'react';
import DateRangePicker, { } from "react-datepicker";
import { Label, Col } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";


export const DatePicker = () => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    return <>
        <Col md={2} className="d-flex">
            <div >
                <Label for="exampleEmail">Từ ngày</Label>
                <DateRangePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control"
                />
            </div>
        </Col>
        <Col md={2}>
            <div className="">
                <Label for="exampleEmail">Đến ngày</Label>
                <DateRangePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date: any) => setEndDate(date)}
                    selectsEnd
                    maxDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
        </Col>
    </>
}