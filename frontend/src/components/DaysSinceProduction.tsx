import React from 'react';
import {ApplicationState} from "../store/reducer";
import {connect} from "react-redux";

type DaysSinceProductionProps = {
    days: number | null;
};

export class DaysSinceProduction extends React.Component<DaysSinceProductionProps, {}> {

    render() {
        const days = this.props.days;
        if (days === null) {
            return <></>
        }
        return <span className="days-since-production">
            It has been {DaysSinceProduction.textFor(days)} since your last production deploy
        </span>
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