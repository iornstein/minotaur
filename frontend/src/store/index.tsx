import {createStore, applyMiddleware} from "redux";
import {reducer} from "./reducer";
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    return createStore(reducer,  applyMiddleware(sagaMiddleware));
}