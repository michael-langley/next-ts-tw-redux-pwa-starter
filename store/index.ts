import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './rootReducer';
import { AppState, Action } from 'app';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {} as AppState;
const enhancers = [];
const middleware = [thunk as ThunkMiddleware<AppState, Action>];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);
export default createStore(rootReducer, initialState, composedEnhancers);