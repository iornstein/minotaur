import {ApplicationAction} from "./actions";

export const HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET = "HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET";
export type DaysSinceLastProductionDeployType = number | null | typeof HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET;

export type ApplicationState = {
    daysSinceProduction: DaysSinceLastProductionDeployType;
    daysSinceLastProductionRequestStatus: RequestStatus;
}

export enum RequestStatus {
    NOT_IN_FLIGHT = "NOT_IN_FLIGHT",
    IN_FLIGHT = "IN_FLIGHT",
    SHOULD_BE_MADE = "SHOULD_BE_MADE",
}

const initialState: ApplicationState = {
    daysSinceProduction: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    daysSinceLastProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT,
};

export const reducer = (state: ApplicationState = initialState, action: ApplicationAction): ApplicationState => {
    switch (action.type) {
        case "UPDATE_STATUS_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION":
            return {...state, daysSinceLastProductionRequestStatus: action.status};
        case "POLL_SERVER_ACTION_TYPE":
            return {
                ...state,
                daysSinceLastProductionRequestStatus: state.daysSinceLastProductionRequestStatus === RequestStatus.IN_FLIGHT ? RequestStatus.IN_FLIGHT : RequestStatus.SHOULD_BE_MADE
            };
        case "RECEIVE_DAYS_SINCE_LAST_PRODUCTION_DEPLOY":
            return {...state, daysSinceProduction: action.days};
        case "REQUEST_DAYS_TO_PRODUCTION":
        case "APPLICATION_ERROR_ACTION_TYPE":
        default:
            return state;
    }
};