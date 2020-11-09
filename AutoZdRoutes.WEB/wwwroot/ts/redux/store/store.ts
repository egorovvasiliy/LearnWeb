import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../reducers/rootreducer'
import { rootSaga } from '../sagas/rootSagas'
//---------
const sagaMiddleware = createSagaMiddleware();
//export const rootStore = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//export const rootStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));
//export const rootStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware, logger)));
export const rootStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,sagaMiddleware)));
sagaMiddleware.run(rootSaga);