import React from 'react';
import {
    ApplicationState,
    TimeSinceProductionDeployType,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
} from "../store/reducer";
import {connect} from "react-redux";

export type TimeSinceProductionProps = {
    timeSinceProduction: TimeSinceProductionDeployType
};

export class TimeSinceProduction extends React.Component<TimeSinceProductionProps, {}> {

    render() {
        const time = this.props.timeSinceProduction;
        if (time === HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET) {
            return <></>
        }
        if (time === NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET) {
            return <div>
            There has not yet been a deploy to production recorded
        </div>
        }

        return <div>
            It has been <span className="time">{TimeSinceProduction.textFor(time)}</span> since your last production deploy.
        </div>
    }

    static textFor(days: number) {
        return days === 1 ? "1 day" : `${days} days`;
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        timeSinceProduction: state.timeSinceProduction
    }
};

export default connect(mapStateToProps, {})(TimeSinceProduction);