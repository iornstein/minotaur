import {call, put, takeEvery, all} from 'redux-saga/effects'
import {
    ApplicationAction,
    applicationError,
    receiveTimeSinceLastProductionDeploy, REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE,
    REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    updateStatusForTimeSinceProductionDeployRequest
} from "../store/actions";

import {
    notifyThatAProductionDeployHappened,
    requestTimeSinceProductionDeploy, TimeSinceProductionDeployResponse
} from "../clients/TimeSinceProductionDeployClient";
import {
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
    RequestStatus,
    KnownTimeSinceProductionDeployType
} from "../store/reducer";
import {AxiosResponse} from "axios";

const convertToDomainResponse = (time: TimeSinceProductionDeployResponse) : KnownTimeSinceProductionDeployType => {
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

export function* fetchTimeSinceProductionDeploy(ignored: ApplicationAction) {
    try {
        const response: AxiosResponse<TimeSinceProductionDeployResponse> = yield call(requestTimeSinceProductionDeploy);
        yield put(receiveTimeSinceLastProductionDeploy(convertToDomainResponse(response.data)));
    } catch (e) {
        yield put(applicationError(e, "fetchTimeSinceProductionDeploy"));
    } finally {
        yield put(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
    }
}

export function* updateLastProductionDeploy(ignored: ApplicationAction) {
    try {
        yield call(notifyThatAProductionDeployHappened);
        yield call(fetchTimeSinceProductionDeploy, ignored);
    } catch (e) {
        yield put(applicationError(e, "updateLastProductionDeploy"));
    }
}

function* saga() {
    yield all([
        takeEvery(REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE, fetchTimeSinceProductionDeploy),
        takeEvery(REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE, updateLastProductionDeploy)
    ]);
}

export default saga;