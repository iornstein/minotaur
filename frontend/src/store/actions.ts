import {RequestStatus} from "./reducer";

export const REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE = "REQUEST_DAYS_TO_PRODUCTION";
export type RequestDaysSinceLastProductionDeployAction = {
    type: typeof REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE;
}
export const requestDaysSinceLastProductionDeployAction = (): RequestDaysSinceLastProductionDeployAction => {
    return {
        type: REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE
    }
};

export const RECEIVE_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE = "RECEIVE_DAYS_SINCE_LAST_PRODUCTION_DEPLOY";
export type ReceiveDaysSinceLastProductionDeployAction = {
    type: typeof RECEIVE_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE;
    days: number
}
export const receiveDaysSinceLastProductionDeploy = (days: number): ReceiveDaysSinceLastProductionDeployAction => {
    return {
        type: RECEIVE_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
        days
    };
};

export const APPLICATION_ERROR_ACTION_TYPE = "APPLICATION_ERROR_ACTION_TYPE";
export type ApplicationErrorAction = {
    type: typeof APPLICATION_ERROR_ACTION_TYPE
    error: any,
    location: string
}
export const applicationError = (error: any, location: string) => {
    return {
        type: APPLICATION_ERROR_ACTION_TYPE,
        error,
        location,
    }
};

export const POLL_SERVER_ACTION_TYPE = "POLL_SERVER_ACTION_TYPE";
export type PollServerAction = {
    type: typeof POLL_SERVER_ACTION_TYPE
}
export const pollServer = (): PollServerAction => {
    return {
        type: POLL_SERVER_ACTION_TYPE
    }
};

export const UPDATE_STATUS_FOR_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION = "UPDATE_STATUS_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION";
export type UpdateStatusDaysSinceLastProductionDeployRequestAction = {
    type: typeof UPDATE_STATUS_FOR_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION,
    status: RequestStatus
}
export const updateStatusForDaysSinceLastProductionDeployRequest = (status: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT): UpdateStatusDaysSinceLastProductionDeployRequestAction => {
    return {
        type: UPDATE_STATUS_FOR_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION,
        status
    }
};

export type ApplicationAction =
    PollServerAction
    | ReceiveDaysSinceLastProductionDeployAction
    | RequestDaysSinceLastProductionDeployAction
    | UpdateStatusDaysSinceLastProductionDeployRequestAction
    | ApplicationErrorAction;