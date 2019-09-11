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

export type PossiblyUnknownValue<T> = T | typeof HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET;

export type TrackerAnalytics = {
        projectName: string,
        velocity: number,
        volatility: number
    };

export type ApplicationState = {
    timeSinceProduction: KnownOrUnknownTimeSinceProductionDeployType;
    timeSinceProductionRequestStatus: RequestStatus;
    trackerAnalyticsRequestStatus: RequestStatus;
    trackerAnalytics: PossiblyUnknownValue<TrackerAnalytics>;
}

export enum RequestStatus {
    NOT_IN_FLIGHT = "NOT_IN_FLIGHT",
    IN_FLIGHT = "IN_FLIGHT",
    SHOULD_BE_MADE = "SHOULD_BE_MADE",
}

const initialState: ApplicationState = {
    timeSinceProduction: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    timeSinceProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT,
    trackerAnalyticsRequestStatus: RequestStatus.NOT_IN_FLIGHT,
    trackerAnalytics: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
};

export const reducer = (state: ApplicationState = initialState, action: ApplicationAction): ApplicationState => {
    switch (action.type) {
        case "UPDATE_STATUS_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION":
            return {...state, timeSinceProductionRequestStatus: action.status};
        case "UPDATE_STATUS_FOR_TRACKER_ANALYTICS_ACTION":
            return {...state, trackerAnalyticsRequestStatus: action.status};
        case "POLL_SERVER_ACTION_TYPE":
            return {
                ...state,
                timeSinceProductionRequestStatus: updateRequestStatusUponPolling(state.timeSinceProductionRequestStatus),
                trackerAnalyticsRequestStatus: updateRequestStatusUponPolling(state.trackerAnalyticsRequestStatus)
            };
        case "RECEIVE_TIME_SINCE_PRODUCTION_DEPLOY":
            return {...state, timeSinceProduction: action.time};
        case "RECEIVE_TRACKER_ANALYTICS_ACTION":
            return {...state, trackerAnalytics: action.trackerAnalytics};
        case "REQUEST_TIME_SINCE_PRODUCTION_DEPLOY":
        case "REPORT_A_PRODUCTION_DEPLOY_ACTION":
        case "APPLICATION_ERROR_ACTION_TYPE":
        case "REQUEST_TRACKER_ANALYTICS":
        default:
            return state;
    }
};

const updateRequestStatusUponPolling = (currentRequestStatus: RequestStatus) => {
    return currentRequestStatus === RequestStatus.IN_FLIGHT ? RequestStatus.IN_FLIGHT : RequestStatus.SHOULD_BE_MADE
};