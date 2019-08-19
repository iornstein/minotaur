import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from "enzyme";
import DaysSinceProduction from "./components/DaysSinceProduction";
import {Provider} from "react-redux";
import configureStore from "./store";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={configureStore()}><App/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should render the DaysSinceProduction', function () {
    const subject = shallow(<App/>);
    expect(subject.find(DaysSinceProduction).exists()).toBeTruthy();
});