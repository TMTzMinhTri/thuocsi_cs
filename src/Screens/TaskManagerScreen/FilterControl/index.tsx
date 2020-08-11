import * as React from 'react';
import { Input, Row, Col, Button } from 'reactstrap';
import DateRangePicker, { } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DefaultValue } from "Utils";

// import { DatePicker } from "./DatePicker";
// import { SearchOrder } from "./SearchOrder";
// import { SelectAssignedMember } from "./SelectAssignedMember";
// import { SelectReason } from "./SelectReason";
// import { SelectStatus } from "./SelectStatus";
import { getListReason, getListMember } from 'Api/TaskManager';
import { IResponeListReason } from 'Interface/Response/task_manager.types';
import { IResponseUser } from 'Interface/Response/session.types';
import Select, { components } from 'react-select';



export const FilterControl: React.FC<any> = () => {
    const [listReason, setListReason] = React.useState<IResponeListReason[]>([])
    const [listMember, setListMember] = React.useState<IResponseUser[]>([])
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    React.useEffect(() => {
        Promise.all([getListReason(), getListMember()]).then(rsp => {
            setListReason(rsp[0].data)
            setListMember(rsp[1].data)
        })
    }, [])
    const ValueContainer = ({ children, ...props }: any) => {
        const selected = props.getValue();
        const selectedC = React.Children.toArray(children).filter((it: any) => ["Input"].indexOf(it.type.name) >= 0)
        const content = `${selected.length} items`
        return <components.ValueContainer {...props}>
            {content}
            {selectedC}
        </components.ValueContainer>
    };

    return <div className="filter-control">
        <Row>
            <Col md={6}>
                <Row className="mb-3">
                    <Col md={6} className="filter-control__search-container">
                        <i className="fa fa-search" />
                        <Input placeholder="case# or order# or account#" className="filter-control__input" />
                    </Col>
                    <Col md={6} className="d-flex">
                        <DateRangePicker
                            selected={startDate}
                            dateFormat="dd / MM / yyyy"
                            onChange={(date: any) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control filter-control__date-range"
                        />
                        <DateRangePicker
                            className="form-control ml-3 filter-control__date-range"
                            selected={endDate}
                            dateFormat="dd / MM / yyyy"
                            onChange={(date: any) => setEndDate(date)}
                            selectsEnd
                            maxDate={new Date()}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Select options={listMember.map(item => ({ label: item.name, value: item.id }))} isClearable />
                    </Col>
                    <Col md={4}>
                        <Select
                            options={listReason.map(item => ({ label: item.name, value: item.id }))}
                            isMulti
                            components={{ ValueContainer }}
                            closeMenuOnSelect={false}
                            openMenuOnClick={true}
                            hideSelectedOptions={false}
                            isClearable
                        />
                    </Col>
                    <Col md={4}>
                        <Select options={DefaultValue.listTaskStatus.map(item => ({ value: item.key, label: item.name }))} placeholder="Status" isClearable />
                    </Col>
                </Row>
            </Col>
            <Col md={1} className="d-flex flex-column ">
                <Button color="primary" block>Search</Button>
                <Button color="primary" block className="mt-3">Export</Button>
            </Col>
        </Row>
    </div>
}