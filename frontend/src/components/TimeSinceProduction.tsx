import React from 'react';
import {
    ApplicationState,
    UNKNOWN_VALUE,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
    TimeSinceProductionDeploy,
    PossiblyUnknownValue,
} from "../store/reducer";
import {connect} from "react-redux";

export type TimeSinceProductionProps = {
    timeSinceProduction: PossiblyUnknownValue<TimeSinceProductionDeploy>
};

export class TimeSinceProduction extends React.Component<TimeSinceProductionProps, {}> {

    render() {
        const time = this.props.timeSinceProduction;
        if (time === UNKNOWN_VALUE) {
            return <></>
        }
        if (time === NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET) {
            return <div className="time-since-production">
                There has not yet been a deploy to production recorded.
            </div>
        }

        return <div className="time-since-production">
            It has been <span className="highlighted-value">{TimeSinceProduction.textFor(time)}</span> since your last production
            deploy.
        </div>
    }

    static textFor(time: { days: number, hasBeenAtLeastADay: true } | { hours: number, hasBeenAtLeastADay: false }) {
        return time.hasBeenAtLeastADay ? this.pluralize(time.days, "day") : this.pluralize(time.hours, "hour");
    }

    static pluralize(amount: number, unit: string) {
        return amount === 1 ? `1 ${unit}` : `${amount} ${unit}s`;
    }
}

export const mapStateToProps = (state: ApplicationState) : TimeSinceProductionProps => {
    return {
        timeSinceProduction: state.timeSinceProduction
    }
};

export default connect(mapStateToProps, {})(TimeSinceProduction);