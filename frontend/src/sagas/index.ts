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
    requestTimeSinceProductionDeploy
} from "../clients/TimeSinceProductionDeployClient";
import {NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, RequestStatus} from "../store/reducer";

export function* fetchTimeSinceProductionDeploy(ignored: ApplicationAction) {
    try {
        const response = yield call(requestTimeSinceProductionDeploy);
        const days = response.data.days;
        yield put(receiveTimeSinceLastProductionDeploy(days === null ? NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET : days));
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