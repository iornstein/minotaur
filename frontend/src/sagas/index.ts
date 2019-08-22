import {call, put, takeEvery} from 'redux-saga/effects'
import {
    ApplicationAction,
    applicationError,
    receiveDaysSinceLastProductionDeploy,
    REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    updateStatusForDaysSinceLastProductionDeployRequest
} from "../store/actions";

import {requestDaysSinceLastProductionDeploy} from "../clients/DaysSinceLastProductionDeployClient";
import {RequestStatus} from "../store/reducer";

export function* fetchDaysSinceLastProductionDeploy(ignored: ApplicationAction) {
    try {
        const response = yield call(requestDaysSinceLastProductionDeploy);
        yield put(receiveDaysSinceLastProductionDeploy(response.data.days));
    } catch (e) {
        yield put(applicationError(e, "fetchDaysSinceLastProductionDeploy"));
    } finally {
        yield put(updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
    }
}

function* saga() {
    yield takeEvery(REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE, fetchDaysSinceLastProductionDeploy);
}

export default saga;