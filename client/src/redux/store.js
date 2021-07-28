import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'


import rootReducer from './RootReducer';

export const history = createBrowserHistory()

export default function configureStore() {
    const store = createStore(
    rootReducer(history), // root reducer with router state
      compose(
        applyMiddleware(
          routerMiddleware(history), // for dispatching history actions
          thunk
        ),
      ),
    )
  
    return store
  }