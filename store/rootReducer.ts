import { combineReducers, Action, Reducer } from 'redux';
import { AppState } from 'app';
import offline from './modules/offline';

const rootReducer: Reducer<AppState, Action> = combineReducers({
  offline,
});

export default rootReducer;
