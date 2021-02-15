import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from './reducers/index';
// import createSagaMiddleware from 'redux-saga'
// import providerloginAction from'./saga/saga'
const createBrowserHistory = require("history").createBrowserHistory;
// const sagaMiddleware=createSagaMiddleware()
let store = createStore(rootReducer, applyMiddleware(
  thunk
))
// sagaMiddleware.run(providerloginAction)


let history = createBrowserHistory();

export {
    store,
    history
}