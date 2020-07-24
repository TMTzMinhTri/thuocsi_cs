import { LayoutActionTypes } from './layout.types';
import { TaskManagerActionTypes } from './task_manager.types';

export type RootAction = LayoutActionTypes | TaskManagerActionTypes;
