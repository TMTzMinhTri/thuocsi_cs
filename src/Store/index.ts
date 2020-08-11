import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { RootAction } from 'Interface/Store/index.types';
import { ILayoutReducer } from 'Interface/Store/layout.types';
import { ITask_managerReducer } from 'Interface/Store/task_manager.types';
import { INotificationReducer } from 'Interface/Store/notification.types';

interface IRootReducers {
  layout: ILayoutReducer;
  task_manager: ITask_managerReducer;
  notification: INotificationReducer;
}

const requireReducers = require.context('./reducers', false, /\.reducer\.ts$/);
const reducers: any = {};

requireReducers.keys().forEach((filename) => {
  const moduleName: string = filename.replace(/(\.\/|\.reducer\.ts)/g, '');
  reducers[moduleName] = requireReducers(filename).default;
});

const rootReducer = combineReducers<IRootReducers>(reducers);

const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = (store: any) => (next: any) => (action: any) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const middleware = [thunk as ThunkMiddleware<RootState, RootAction>, logger as any];

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));
