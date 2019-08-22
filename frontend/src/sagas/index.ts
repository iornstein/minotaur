import {call, put, takeEvery, all} from 'redux-saga/effects'
import {
    ApplicationAction,
    applicationError,
    receiveDaysSinceLastProductionDeploy, REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE,
    REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    updateStatusForDaysSinceLastProductionDeployRequest
} from "../store/actions";

import {
    notifyThatAProductionDeployHappened,
    requestDaysSinceLastProductionDeploy
} from "../clients/DaysSinceLastProductionDeployClient";
import {NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, RequestStatus} from "../store/reducer";

export function* fetchDaysSinceLastProductionDeploy(ignored: ApplicationAction) {
    try {
        const response = yield call(requestDaysSinceLastProductionDeploy);
        const days = response.data.days;
        yield put(receiveDaysSinceLastProductionDeploy(days === null ? NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET : days));
    } catch (e) {
        yield put(applicationError(e, "fetchDaysSinceLastProductionDeploy"));
    } finally {
        yield put(updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
    }
}

export function* updateLastProductionDeploy(ignored: ApplicationAction) {
    try {
        yield call(notifyThatAProductionDeployHappened);
        yield call(fetchDaysSinceLastProductionDeploy, ignored);
    } catch (e) {
        yield put(applicationError(e, "updateLastProductionDeploy"));
    }
}

function* saga() {
    yield all([
        takeEvery(REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE, fetchDaysSinceLastProductionDeploy),
        takeEvery(REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE, updateLastProductionDeploy)
    ]);
}

export default saga;