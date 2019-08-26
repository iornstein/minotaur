import {createStore, applyMiddleware, compose} from "redux";
import {reducer} from "./reducer";
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    return createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
}