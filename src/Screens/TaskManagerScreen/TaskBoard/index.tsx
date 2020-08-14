import * as React from "react";
import { Table } from "reactstrap";

import { Icstasks } from "Interface/Response/task_manager.types";
import { DetailTask } from "./DetailTask";
import { HeaderBoard } from "./Header";
import { ListTask } from "./ListTask";

interface ITaskBoardProps {
   cs_tasks: Icstasks[],
   loading: boolean,
   taskSelected: number
}

type IProps = ITaskBoardProps

export const TaskBoard: React.FC<IProps> = React.memo(({ cs_tasks, loading, taskSelected }) => {

   return <div className="d-flex">
      <div className="sticky_table">
         <Table className="h-100 m-0" hover style={{ width: "100%", tableLayout: "fixed" }} >
            <HeaderBoard />
            <ListTask cs_tasks={cs_tasks} loading={loading} taskSelected={taskSelected} />
         </Table>
      </div>
      {!loading && <DetailTask />}
   </div>
})
