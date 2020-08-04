import { SweetAlertProps } from 'react-bootstrap-sweetalert/dist/types';

export const SHOW_ALERT_ERROR = 'SHOW_ALERT_ERROR';
export const REMOVE_ALERT_ERROR = 'REMOVE_ALERT_ERROR';

interface IAlertProps extends SweetAlertProps {
  content: string;
}

export interface IShowAlertErrorAction {
  type: typeof SHOW_ALERT_ERROR;
  content: IAlertProps;
}
export interface IRemoveAlertErrorAction {
  type: typeof REMOVE_ALERT_ERROR;
}

export interface INotificationReducer {
  alert: IAlertProps | null;
}

export type NotificationActionTypes =
  | IShowAlertErrorAction
  | IRemoveAlertErrorAction