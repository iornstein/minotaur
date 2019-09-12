import {all, call, put, takeEvery} from 'redux-saga/effects'
import {
    ApplicationAction,
    applicationError,
    receiveTimeSinceLastProductionDeploy,
    receiveTrackerAnalytics,
    REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE,
    REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    REQUEST_TRACKER_ANALYTICS_ACTION_TYPE,
    updateStatusForTimeSinceProductionDeployRequest,
    updateStatusForTrackerAnalyticsRequest
} from "../store/actions";

import {
    notifyThatAProductionDeployHappened,
    requestTimeSinceProductionDeploy,
    TimeSinceProductionDeployResponse
} from "../clients/TimeSinceProductionDeployClient";
import {
    TimeSinceProductionDeploy,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
    RequestStatus,
    TrackerAnalytics
} from "../store/reducer";
import {AxiosResponse} from "axios";
import {requestTrackerAnalytics, TrackerAnalyticsResponse} from "../clients/TrackerAnalyticsClient";

const convertResponseToTimeSinceProductionDomainObject = (time: TimeSinceProductionDeployResponse): TimeSinceProductionDeploy => {
    if (time.days === null || time.hours === null) {
        return NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET;
    }
    if (time.days >= 1) {
        return {
            days: time.days,
            hasBeenAtLeastADay: true
        }
    }
    return {
        hours: time.hours,
        hasBeenAtLeastADay: false
    };
};

const convertResponseToTrackerAnalyticsDomainObject = (response: TrackerAnalyticsResponse): TrackerAnalytics => {
    return {
        projectName: response.name,
        velocity: response.velocity,
        volatility: response.volatility,
    };
};

export function* fetchTimeSinceProductionDeploy(ignored: ApplicationAction) {
    yield requestFromServerAndDispatchResponses(
        requestTimeSinceProductionDeploy,
        convertResponseToTimeSinceProductionDomainObject,
        receiveTimeSinceLastProductionDeploy,
        "fetchTimeSinceProductionDeploy",
        updateStatusForTimeSinceProductionDeployRequest
    );
}

export function* updateLastProductionDeploy(ignored: ApplicationAction) {
    try {
        yield call(notifyThatAProductionDeployHappened);
        yield call(fetchTimeSinceProductionDeploy, ignored);
    } catch (e) {
        yield put(applicationError(e, "updateLastProductionDeploy"));
    }
}

export function* fetchTrackerAnalytics(ignored: ApplicationAction) {
    yield requestFromServerAndDispatchResponses(
        requestTrackerAnalytics,
        convertResponseToTrackerAnalyticsDomainObject,
        receiveTrackerAnalytics,
        "fetchTrackerAnalytics",
        updateStatusForTrackerAnalyticsRequest
    );
}

function* requestFromServerAndDispatchResponses<SERVER_RESPONSE,DOMAIN_RESPONSE>(
    requester: () => Promise<AxiosResponse<SERVER_RESPONSE>>,
    converter: (response: SERVER_RESPONSE) => DOMAIN_RESPONSE,
    receiveActionCreator: (data: DOMAIN_RESPONSE) => ApplicationAction,
    location: string,
    requestStatusUpdater: (status: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT) => ApplicationAction) {
    try {
        const response = (yield call(requester)).data;
        yield put(receiveActionCreator(converter(response)));
    } catch (e) {
        yield put(applicationError(e, location));
    } finally {
        yield put(requestStatusUpdater(RequestStatus.NOT_IN_FLIGHT));
    }
}

function* saga() {
    yield all([
        takeEvery(REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE, fetchTimeSinceProductionDeploy),
        takeEvery(REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE, updateLastProductionDeploy),
        takeEvery(REQUEST_TRACKER_ANALYTICS_ACTION_TYPE, fetchTrackerAnalytics)
    ]);
}

export default saga;