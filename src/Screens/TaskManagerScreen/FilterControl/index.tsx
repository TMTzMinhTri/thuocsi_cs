import * as React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

import { DatePicker } from "./DatePicker";
import { SearchOrder } from "./SearchOrder";
import { SelectAssignedMember } from "./SelectAssignedMember";
import { SelectReason } from "./SelectReason";
import { SelectStatus } from "./SelectStatus";
import { getListReason, getListMember } from 'Api/TaskManager';
import { IResponeListReason } from 'Interface/Response/task_manager.types';
import { IResponseUser } from 'Interface/Response/session.types';

interface IProps {
    showFilter: () => void
}

export const FilterControl = React.forwardRef<HTMLDivElement, IProps>(({ showFilter }, innerRef: React.Ref<HTMLDivElement>) => {
    const [listReason, setListReason] = React.useState<IResponeListReason[]>([])
    const [listMember, setListMember] = React.useState<IResponseUser[]>([])

    React.useEffect(() => {
        Promise.all([getListReason(), getListMember()]).then(rsp => {
            setListReason(rsp[0].data)
            setListMember(rsp[1].data)
        })
    }, [])

    return <div className="filter-control show" ref={innerRef} >
        <Card className="h-100">
            <RenderHeader showFilter={showFilter} />
            <CardBody>
                <DatePicker />
                <SelectReason listReason={listReason} />
                <SelectStatus />
                <SelectAssignedMember listMember={listMember} />
                <SearchOrder />
            </CardBody>
            <CardFooter className="text-muted"><Button color="primary" block>Fillter</Button></CardFooter>
        </Card>
    </div>
})

const RenderHeader: React.FC<{ showFilter: () => void }> = React.memo(({ showFilter }) => {
    return <CardHeader className="d-flex justify-content-between" tag="h3">
        <div>Filter</div>
        <div onClick={showFilter} className="cursor-pointer">
            <i className="fa fa-times" aria-hidden="true"></i>
        </div>
    </CardHeader>
})