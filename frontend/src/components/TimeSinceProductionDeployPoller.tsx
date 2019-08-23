import {ApplicationState, RequestStatus} from "../store/reducer";
import {
    ApplicationAction,
    requestTimeSinceProductionDeployAction,
    updateStatusForTimeSinceProductionDeployRequest
} from "../store/actions";
import React, {Dispatch} from 'react';
import {connect} from "react-redux";

export type Props = {
    requestStatus: RequestStatus,
    getTimeSinceProductionDeploy: () => void,
    updateStatusToInFlightForTimeSinceProductionDeployRequest: () => void,
}

export class TimeSinceProductionDeployPoller extends React.Component<Props, {}> {

    componentDidUpdate(previousProps: Readonly<Props>): void {
        if (this.props.requestStatus === RequestStatus.SHOULD_BE_MADE && previousProps.requestStatus !== RequestStatus.SHOULD_BE_MADE) {
            this.props.getTimeSinceProductionDeploy();
            this.props.updateStatusToInFlightForTimeSinceProductionDeployRequest();
        }
    }

    render() {
        return <></>
    }
}

export const mapStateToProps = (state: ApplicationState) => {
    return {
        requestStatus: state.timeSinceProductionRequestStatus
    }
};

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        getTimeSinceProductionDeploy: () => {
            dispatch(requestTimeSinceProductionDeployAction());
        },
        updateStatusToInFlightForTimeSinceProductionDeployRequest: () => {
            dispatch(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.IN_FLIGHT));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSinceProductionDeployPoller);