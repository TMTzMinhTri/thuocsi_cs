import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { RootState } from 'Store';
import { RootAction } from 'Interface/Store/index.types';
import { bindActionCreators, Dispatch } from 'redux';
import { searchTask, createTask } from 'Store/actions/task_manager.actions';
import { toast } from 'react-toastify';
import { SearchTask } from './SearchTask';
import { BankInfomation } from './BankInformation';
import { ListTask } from './ListTask';
import { FromCreateTask } from './FormCreateTask';
import { IParamsPostCreateTask } from 'Interface/Store/task_manager.types';

interface ICreateTaskComponent {
    isOpenModal: boolean,
    toggle: () => void
}

const mapState = (state: RootState) => ({
    task_manager_state: state.task_manager
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    searchTask, createTask
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction> & ICreateTaskComponent

export const CreateTaskComponent: React.FC<Iprops> = ({ isOpenModal, toggle, searchTask, task_manager_state: { taskBySearch, list_reason }, createTask }) => {
    const defaultValueUserInput = React.useMemo(() => ({ failure_types: [], return_id: 0, cs_note: "", transferred_cash: 0, assign_group: { label: "Chưa chỉ định", value: 'not_set_group' } }), [])
    const [userInput, setUserInput] = React.useState(defaultValueUserInput)

    const onSearch = (search_text: string, callback: Function) => {
        searchTask(search_text, (err_message) => {
            err_message && toast.error(err_message, { autoClose: 2000 })
            callback()
        })
    }
    const closeModalCreate = () => {
        setUserInput(defaultValueUserInput)
        searchTask(null, () => toggle())
    }
    const handleCreateTask = () => {
        const data: IParamsPostCreateTask = {
            cs_task: {
                assign_group: userInput.assign_group.value,
                failure_types: userInput.failure_types.map(it => it.value),
                order_id: taskBySearch.orders[0].id,
                return_id: userInput.return_id,
                transferred_cash: userInput.transferred_cash,
                cs_note: userInput.cs_note
            },
            bank_information: taskBySearch.bank_information
        }
        createTask(data, (err_message) => {
            err_message ? toast.error(err_message, { autoClose: 2000 }) : closeModalCreate()
        })
    }
    const handleUserInput = (name: string, value: any) => {
        setUserInput({ ...userInput, [name]: value })
    }
    return <Modal
        isOpen={isOpenModal}
        toggle={toggle}
        scrollable
        backdrop="static"
        size="xl"
        className="h-100"
        modalTransition={{ baseClass: `animate__animated animate__faster ${isOpenModal ? "animate__fadeIn " : "animate__fadeOut"}`, timeout: 200 }}>
        <ModalHeader toggle={closeModalCreate}>Tạo mới</ModalHeader>
        <ModalBody >
            <SearchTask onSearch={onSearch} />
            <BankInfomation task={taskBySearch} />
            <ListTask task={taskBySearch} />
            <FromCreateTask listReason={list_reason} task={taskBySearch} handleUserInput={handleUserInput} userInput={userInput} />
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleCreateTask}>Do Something</Button>{' '}
            <Button color="secondary" onClick={closeModalCreate}>Cancel</Button>
        </ModalFooter>
    </Modal>
}

export const CreateTask = connect(mapState, mapAction)(CreateTaskComponent)