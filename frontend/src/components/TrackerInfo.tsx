import React from 'react';
import {connect} from "react-redux";
import {
    ApplicationState,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    PossiblyUnknownValue,
    TrackerAnalytics
} from "../store/reducer";

export type TrackerInfoProps = {
    analytics: PossiblyUnknownValue<TrackerAnalytics>
}

export class TrackerInfo extends React.Component<TrackerInfoProps, {}> {
    render() {
        const analytics = this.props.analytics;
        if (analytics === HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET) {
            return <div>... data from tracker is not loaded yet</div>
        }
        return <div>
            <h2>{analytics.projectName}</h2>
            <div>
                <span>Velocity: {analytics.velocity}</span><span>Volatility: {analytics.volatility}%</span>
            </div>
        </div>
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        analytics: state.trackerAnalytics
    };
};

export default connect(mapStateToProps, {})(TrackerInfo);