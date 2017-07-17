import { Action as ReduxAction, combineReducers } from 'redux';

export interface Action extends ReduxAction {
  type: string;
  payload?: any;
  error?: boolean;
}

export interface StoreState {}

const rootReducer = combineReducers({});

export default rootReducer;
