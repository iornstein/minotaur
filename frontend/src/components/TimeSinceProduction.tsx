import React from 'react';
import {
    ApplicationState,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, KnownOrUnknownTimeSinceProductionDeployType,
} from "../store/reducer";
import {connect} from "react-redux";

export type TimeSinceProductionProps = {
    timeSinceProduction: KnownOrUnknownTimeSinceProductionDeployType
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
            It has been <span className="time">{TimeSinceProduction.textFor(time)}</span> since your last production
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