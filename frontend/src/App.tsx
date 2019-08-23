import React, {Dispatch} from 'react';
import './App.css';
import TimeSinceProduction from "./components/TimeSinceProduction";
import {every} from "./services/Timing";
import {ApplicationAction, pollServer} from "./store/actions";
import TimeSinceLastProductionDeployPoller from "./components/TimeSinceProductionDeployPoller";
import {connect} from "react-redux";
import ProductionDeployReporter from "./components/ProductionDeployReporter";

export type Props = {
    pollServer: () => void;
}

export class App extends React.Component<Props, {}> {
    componentDidMount(): void {
        every(600000).do(this.props.pollServer);
    }

    render() {
        return (
            <div className="minotaur">
                <TimeSinceLastProductionDeployPoller/>
                <TimeSinceProduction/>
                <ProductionDeployReporter/>
            </div>
        );
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        pollServer: () => {
            dispatch(pollServer());
        }
    }
};

export default connect(null, mapDispatchToProps)(App);
