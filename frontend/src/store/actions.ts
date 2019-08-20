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

export type ApplicationAction = ReceiveDaysSinceLastProductionDeployAction | RequestDaysSinceLastProductionDeployAction | ApplicationErrorAction;