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
            <h2 className="project-name">{analytics.projectName}</h2>
            <div className="metrics">
                <div className="metric-column">
                    <div className="boxed-value">
                        <div id="Velocity">{analytics.velocity}</div>
                    </div>
                    <label htmlFor="Velocity" className="boxed-label">Velocity</label>
                </div>
                <div className="metric-column">
                    <div className="boxed-value">
                        <div id="Volatility">{analytics.volatility}%</div>
                    </div>
                    <label htmlFor="Volatility" className="boxed-label">Volatility</label>
                </div>

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