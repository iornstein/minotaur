import React from 'react';
import ReactDOM from 'react-dom';
import {App, mapDispatchToProps} from './App';
import {shallow} from "enzyme";
import DaysSinceProduction from "./components/DaysSinceProduction";
import {Provider} from "react-redux";
import configureStore from "./store";
import {every} from "./services/Timing";
import {pollServer} from "./store/actions";
import DaysSinceLastProductionDeployPoller from "./components/DaysSinceLastProductionDeployPoller";

jest.mock("./services/Timing");

const mockedEvery: jest.MockInstance<{do: ()=> void}, any[]> = every as any;

describe('Application', function () {
    beforeEach(() => {
        mockedEvery.mockClear();
        mockedEvery.mockReturnValue({do: jest.fn()});
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={configureStore()}><App pollServer={jest.fn()}/></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render the DaysSinceProduction', function () {
        const subject = shallow(<App pollServer={jest.fn()}/>);
        expect(subject.find(DaysSinceProduction).exists()).toBeTruthy();
    });

    it('should add the DaysSinceLastProductionPoller to the page', function () {
        const subject = shallow(<App pollServer={jest.fn()}/>);
        expect(subject.find(DaysSinceLastProductionDeployPoller).exists()).toBeTruthy();
    });

    it('should send action to poll the server every 10 minutes', function () {
        const doCallback = jest.fn();
        mockedEvery.mockReturnValue({do: doCallback});
        expect(mockedEvery).not.toHaveBeenCalled();
        const mockPollServer = jest.fn();
        shallow(<App pollServer={mockPollServer}/>);

        expect(mockedEvery).toHaveBeenCalledWith(10 * 60 * 1000);
        expect(doCallback).toHaveBeenCalledWith(mockPollServer)
    });
});

describe('mapDispatchToProps', function () {
    it('should allow the component to trigger polling the server', function () {
        const mockDispatch = jest.fn();
        mapDispatchToProps(mockDispatch).pollServer();

        expect(mockDispatch).toHaveBeenCalledWith(pollServer());
    });
});