import {ApplicationAction} from "./actions";

export const HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET = "HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET";
export const NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET = "NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET";
export type KnownTimeSinceProductionDeployType =
    { days: number, hasBeenAtLeastADay: true }
    | { hours: number, hasBeenAtLeastADay: false }
    | typeof NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET;

export type KnownOrUnknownTimeSinceProductionDeployType =
    KnownTimeSinceProductionDeployType
    | typeof HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET;

export type ApplicationState = {
    timeSinceProduction: KnownOrUnknownTimeSinceProductionDeployType;
    timeSinceProductionRequestStatus: RequestStatus;
}

export enum RequestStatus {
    NOT_IN_FLIGHT = "NOT_IN_FLIGHT",
    IN_FLIGHT = "IN_FLIGHT",
    SHOULD_BE_MADE = "SHOULD_BE_MADE",
}

const initialState: ApplicationState = {
    timeSinceProduction: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    timeSinceProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT,
};

export const reducer = (state: ApplicationState = initialState, action: ApplicationAction): ApplicationState => {
    switch (action.type) {
        case "UPDATE_STATUS_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION":
            return {...state, timeSinceProductionRequestStatus: action.status};
        case "POLL_SERVER_ACTION_TYPE":
            return {
                ...state,
                timeSinceProductionRequestStatus: state.timeSinceProductionRequestStatus === RequestStatus.IN_FLIGHT ? RequestStatus.IN_FLIGHT : RequestStatus.SHOULD_BE_MADE
            };
        case "RECEIVE_TIME_SINCE_PRODUCTION_DEPLOY":
            return {...state, timeSinceProduction: action.time};
        case "REQUEST_TIME_SINCE_PRODUCTION_DEPLOY":
        case "REPORT_A_PRODUCTION_DEPLOY_ACTION":
        case "APPLICATION_ERROR_ACTION_TYPE":
        default:
            return state;
    }
};