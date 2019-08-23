import React from 'react';
import {
    ApplicationState,
    DaysSinceLastProductionDeployType,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
} from "../store/reducer";
import {connect} from "react-redux";

export type DaysSinceProductionProps = {
    days: DaysSinceLastProductionDeployType
};

export class DaysSinceProduction extends React.Component<DaysSinceProductionProps, {}> {

    render() {
        const days = this.props.days;
        if (days === HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET) {
            return <></>
        }
        if (days === NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET) {
            return <div>
            There has not yet been a deploy to production recorded
        </div>
        }

        return <div>
            It has been <span className="days">{DaysSinceProduction.textFor(days)}</span> since your last production deploy.
        </div>
    }

    static textFor(days: number) {
        return days === 1 ? "1 day" : `${days} days`;
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        days: state.daysSinceProduction
    }
};

export default connect(mapStateToProps, {})(DaysSinceProduction);