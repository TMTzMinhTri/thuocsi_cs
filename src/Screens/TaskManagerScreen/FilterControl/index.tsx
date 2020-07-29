import * as React from 'react';
import { Row } from 'reactstrap';

import { DatePicker } from "./DatePicker";
import { SearchOrder } from "./SearchOrder";
import { SelectAssignedMember } from "./SelectAssignedMember";
import { SelectReason } from "./SelectReason";
import { SelectStatus } from "./SelectStatus";
import { getListReason, getListMember } from 'Api/TaskManager';
import { IResponeListReason } from 'Interface/Response/task_manager.types';
import { IResponseUser } from 'Interface/Response/session.types';



export const FilterControl: React.FC<any> = () => {
    const [listReason, setListReason] = React.useState<IResponeListReason[]>([])
    const [listMember, setListMember] = React.useState<IResponseUser[]>([])

    React.useEffect(() => {
        Promise.all([getListReason(), getListMember()]).then(rsp => {
            setListReason(rsp[0].data)
            setListMember(rsp[1].data)
        })
    }, [])

    return <div className='mb-2'>
        <Row>
            <DatePicker />
            <SearchOrder />
            <SelectStatus />
            <SelectReason listReason={listReason} />
            <SelectAssignedMember listMember={listMember} />
        </Row>
    </div>
}