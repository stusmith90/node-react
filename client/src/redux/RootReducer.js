import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import reducer from './reducer';

const rootReducer = (history) => combineReducers({
  // other feature reducers come in here
  router: connectRouter(history),
  app: reducer,
});

export default rootReducer;