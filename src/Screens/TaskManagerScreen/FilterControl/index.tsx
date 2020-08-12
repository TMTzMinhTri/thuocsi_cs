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
import { IUserInput } from 'Interface/Store/task_manager.types';
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { RootAction } from 'Interface/Store/index.types';
import { Dispatch, bindActionCreators } from 'redux';
import { SelectCreater } from './SelectCreater';
import { getListTaskByFilter } from 'Store/actions/task_manager.actions';

interface IFilterControlComponentProps {
    showFilter: () => void
}
const mapState = (state: RootState) => ({
    userInputState: state.task_manager.userInput
})
const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    getListTaskByFilter
}, dispatch)
type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & IFilterControlComponentProps


const FilterControlComponent = React.forwardRef<HTMLDivElement, Iprops>((props, ref) => {
    const [listReason, setListReason] = React.useState<IResponeListReason[]>([])
    const [listMember, setListMember] = React.useState<IResponseUser[]>([])
    const [userInput, setUserInput] = React.useState<IUserInput>(props.userInputState)

    React.useEffect(() => {
        Promise.all([getListReason(), getListMember()]).then(rsp => {
            setListReason(rsp[0].data)
            setListMember(rsp[1].data)
        })
    }, [])
    const handleOnSelect = (value: { type: string, value: any }) => {
        setUserInput({ ...userInput, [value.type]: value.value })
    }
    const handleSelectDate = (value: Array<Date>) => {
        setUserInput({ ...userInput, from: value[0], to: value[1] })
    }

    const Filter = () => {
        const dataSearch: IUserInput = {
            ...userInput,
            page: 1
        }
        props.getListTaskByFilter(dataSearch)
    }
    return <div className="filter-control show" ref={ref} >
        <Card className="h-100">
            <RenderHeader showFilter={props.showFilter} />
            <CardBody style={{ overflowY: "auto" }}>
                <SearchOrder />
                <DatePicker date={[userInput.from, userInput.to]} handleSelectDate={handleSelectDate} />
                <SelectStatus handleOnSelect={handleOnSelect} status={userInput.status} />
                <SelectReason listReason={listReason} reasons={userInput.failure_type_ids} handleOnSelect={handleOnSelect} />
                <SelectAssignedMember listMember={listMember} assigned_member={userInput.assigned_member_id} handleOnSelect={handleOnSelect} />
                <SelectCreater listMember={listMember} created_by={userInput.created_by_id} handleOnSelect={handleOnSelect} />
            </CardBody>
            <CardFooter className="text-muted"><Button color="primary" block onClick={Filter}>Fillter</Button></CardFooter>
        </Card>
    </div>
},
);

export const FilterControl = connect(mapState, mapAction, null, { forwardRef: true, })(FilterControlComponent)

const RenderHeader: React.FC<{ showFilter: () => void }> = React.memo(({ showFilter }) => {
    return <CardHeader className="d-flex justify-content-between" tag="h5">
        <div>Filter</div>
        <div onClick={showFilter} className="cursor-pointer">
            <i className="fa fa-times" aria-hidden="true"></i>
        </div>
    </CardHeader>
})