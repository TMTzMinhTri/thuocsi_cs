import {
  NotificationActionTypes,
  INotificationReducer,
  REMOVE_ALERT_ERROR,
  SHOW_ALERT_ERROR,
} from 'Interface/Store/notification.types';

const initialState: INotificationReducer = {
  alert: null,
};

export default function (
  state = initialState,
  action: NotificationActionTypes
): INotificationReducer {
  switch (action.type) {
    case SHOW_ALERT_ERROR:
      return {
        ...state,
        alert: action.content,
      };
    case REMOVE_ALERT_ERROR:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
}
