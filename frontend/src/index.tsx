import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import configureStore, {sagaMiddleware} from "./store";
import saga from "./sagas";

const store = configureStore();
sagaMiddleware.run(saga);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));