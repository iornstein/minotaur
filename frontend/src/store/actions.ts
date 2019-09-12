import {
    RequestStatus,
    TimeSinceProductionDeploy, TrackerAnalytics
} from "./reducer";

export const REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE = "REQUEST_TIME_SINCE_PRODUCTION_DEPLOY";
export type RequestTimeSinceProductionDeployAction = {
    type: typeof REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE;
}
export const requestTimeSinceProductionDeployAction = (): RequestTimeSinceProductionDeployAction => {
    return {
        type: REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE
    }
};

export const RECEIVE_TIME_SINCE_PRODUCTION_DEPLOY_ACTION_TYPE = "RECEIVE_TIME_SINCE_PRODUCTION_DEPLOY";
export type ReceiveTimeSinceProductionDeployAction = {
    type: typeof RECEIVE_TIME_SINCE_PRODUCTION_DEPLOY_ACTION_TYPE;
    time: TimeSinceProductionDeploy
}
export const receiveTimeSinceLastProductionDeploy = (time: TimeSinceProductionDeploy): ReceiveTimeSinceProductionDeployAction => {
    return {
        type: RECEIVE_TIME_SINCE_PRODUCTION_DEPLOY_ACTION_TYPE,
        time: time
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

export const UPDATE_STATUS_FOR_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION = "UPDATE_STATUS_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION";
export type UpdateStatusTimeSinceProductionDeployRequestAction = {
    type: typeof UPDATE_STATUS_FOR_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION,
    status: RequestStatus
}
export const updateStatusForTimeSinceProductionDeployRequest = (status: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT): UpdateStatusTimeSinceProductionDeployRequestAction => {
    return {
        type: UPDATE_STATUS_FOR_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION,
        status
    }
};

export const REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE = "REPORT_A_PRODUCTION_DEPLOY_ACTION";
export type ReportAProductionDeployAction = {
    type: typeof REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE
}
export const reportAProductionDeploy = () : ReportAProductionDeployAction => {
    return {
        type: REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE
    }
};

export const REQUEST_TRACKER_ANALYTICS_ACTION_TYPE = "REQUEST_TRACKER_ANALYTICS";
export type RequestTrackerAnalyticsAction = {
    type: typeof REQUEST_TRACKER_ANALYTICS_ACTION_TYPE;
}
export const requestTrackerAnalytics = (): RequestTrackerAnalyticsAction => {
    return {
        type: REQUEST_TRACKER_ANALYTICS_ACTION_TYPE
    }
};

export type UpdateStatusForTrackerAnalyticsAction = {
    type: "UPDATE_STATUS_FOR_TRACKER_ANALYTICS_ACTION",
    status: RequestStatus
}
export const updateStatusForTrackerAnalyticsRequest = (status: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT): UpdateStatusForTrackerAnalyticsAction => {
    return {
        type: "UPDATE_STATUS_FOR_TRACKER_ANALYTICS_ACTION",
        status,
    };
};

export type ReceiveTrackerAnalyticsAction = {
    type: "RECEIVE_TRACKER_ANALYTICS_ACTION",
    trackerAnalytics: TrackerAnalytics,
}
export const receiveTrackerAnalytics = (trackerAnalytics: TrackerAnalytics): ReceiveTrackerAnalyticsAction => {
    return {
        type: "RECEIVE_TRACKER_ANALYTICS_ACTION",
        trackerAnalytics: trackerAnalytics
    }
};

export type ApplicationAction =
    PollServerAction
    | ReceiveTimeSinceProductionDeployAction
    | RequestTimeSinceProductionDeployAction
    | UpdateStatusTimeSinceProductionDeployRequestAction
    | ReportAProductionDeployAction
    | RequestTrackerAnalyticsAction
    | UpdateStatusForTrackerAnalyticsAction
    | ReceiveTrackerAnalyticsAction
    | ApplicationErrorAction;