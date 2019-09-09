import {ApplicationState, RequestStatus} from "../store/reducer";
import {
    ApplicationAction,
    requestTimeSinceProductionDeployAction,
    updateStatusForTimeSinceProductionDeployRequest
} from "../store/actions";
import React, {Dispatch} from 'react';
import {connect} from "react-redux";
import {RequestMaker} from "./RequestMaker";

export const mapStateToProps = (state: ApplicationState) => {
    return {
        requestStatus: state.timeSinceProductionRequestStatus
    }
};

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        makeRequest: () => {
            dispatch(requestTimeSinceProductionDeployAction());
        },
        updateRequestStatusToInFlight: () => {
            dispatch(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.IN_FLIGHT));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestMaker);