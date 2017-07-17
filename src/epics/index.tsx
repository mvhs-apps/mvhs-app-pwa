import { combineEpics } from 'redux-observable';

export type LightStore = { getState: Function; dispatch: Function };

const rootEpic = combineEpics();

export default rootEpic;
