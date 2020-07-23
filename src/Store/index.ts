import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { RootAction } from 'Interface/Store/index.types';
import { ILayoutReducer } from 'Interface/Store/layout.types';

interface IRootReducers {
  layout: ILayoutReducer;
  task_manager: any;
}

const requireReducers = require.context('./reducers', false, /\.reducer\.ts$/);
const reducers: any = {};

requireReducers.keys().forEach((filename) => {
  const moduleName: string = filename.replace(/(\.\/|\.reducer\.ts)/g, '');
  reducers[moduleName] = requireReducers(filename).default;
});

const rootReducer = combineReducers<IRootReducers>(reducers);

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk as ThunkMiddleware<RootState, RootAction>];

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));
