import { LayoutActionTypes } from './layout.types';
import { TaskManagerActionTypes } from './task_manager.types';
import { NotificationActionTypes } from './notification.types';

export type RootAction = LayoutActionTypes | TaskManagerActionTypes | NotificationActionTypes;
