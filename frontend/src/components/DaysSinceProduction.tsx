import React, {Dispatch} from 'react';
import {ApplicationState} from "../store/reducer";
import {connect} from "react-redux";
import {ApplicationAction, requestDaysSinceLastProductionDeployAction} from "../store/actions";

export type DaysSinceProductionProps = {
    days: number | null;
    getDaysSinceLastProductionDeploy: () => void;
};

export class DaysSinceProduction extends React.Component<DaysSinceProductionProps, {}> {

    componentDidMount(): void {
        this.props.getDaysSinceLastProductionDeploy();
    }

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

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        getDaysSinceLastProductionDeploy: () => {
            dispatch(requestDaysSinceLastProductionDeployAction());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DaysSinceProduction);