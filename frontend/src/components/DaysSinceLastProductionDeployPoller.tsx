import {ApplicationState, RequestStatus} from "../store/reducer";
import {
    ApplicationAction,
    requestDaysSinceLastProductionDeployAction,
    updateStatusForDaysSinceLastProductionDeployRequest
} from "../store/actions";
import React, {Dispatch} from 'react';
import {connect} from "react-redux";

export type Props = {
    requestStatus: RequestStatus,
    getDaysSinceLastProductionDeploy: () => void,
    updateStatusToInFlightForDaysSinceLastProductionDeployRequest: () => void,
}

export class DaysSinceLastProductionDeployPoller extends React.Component<Props, {}> {

    componentDidUpdate(previousProps: Readonly<Props>): void {
        if (this.props.requestStatus === RequestStatus.SHOULD_BE_MADE && previousProps.requestStatus !== RequestStatus.SHOULD_BE_MADE) {
            this.props.getDaysSinceLastProductionDeploy();
            this.props.updateStatusToInFlightForDaysSinceLastProductionDeployRequest();
        }
    }

    render() {
        return <></>
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        requestStatus: state.daysSinceLastProductionRequestStatus
    }
};

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        getDaysSinceLastProductionDeploy: () => {
            dispatch(requestDaysSinceLastProductionDeployAction());
        },
        updateStatusToInFlightForDaysSinceLastProductionDeployRequest: () => {
            dispatch(updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.IN_FLIGHT));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DaysSinceLastProductionDeployPoller);