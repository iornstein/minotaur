import sagas, {fetchDaysSinceLastProductionDeploy} from "./index";

import {
    DaysSinceLastProductionDeployResponse,
    requestDaysSinceLastProductionDeploy
} from "../clients/DaysSinceLastProductionDeployClient";
import {AxiosResponse} from "axios";
import {ForkEffectDescriptor, SimpleEffect, takeEvery} from "@redux-saga/core/effects";
import {
    applicationError,
    receiveDaysSinceLastProductionDeploy,
    REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    requestDaysSinceLastProductionDeployAction
} from "../store/actions";
import {runSaga} from "redux-saga";
import {aNonNegativeNumber, aString} from "../utils/testGenerators/generatePrimitives.test";

jest.mock("../clients/DaysSinceLastProductionDeployClient");
const mockedRequestDaysSinceLastProductionDeploy: jest.MockInstance<Promise<AxiosResponse<DaysSinceLastProductionDeployResponse>>, any[]> = requestDaysSinceLastProductionDeploy as any;

describe("sagas", function () {
    describe("listening to actions", () => {
        it('should fetch the days since the last production deploy when it receives the appropriate action', function () {
            const sagasGenerator: IterableIterator<SimpleEffect<"FORK", ForkEffectDescriptor>> = sagas();
            const actual = sagasGenerator.next();
            expect(actual.value).toEqual(takeEvery(REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE, fetchDaysSinceLastProductionDeploy));
        });
    });

    const promiseResolvingTo200ResponseWith = <T>(data: T) => {
        const response : AxiosResponse<T> = {
            data: data,
            status: 200,
            statusText: "",
            headers: null,
            config: {},
        };
        return Promise.resolve<AxiosResponse<T>> (response)
    };

    describe("fetchDaysSinceLastProductionDeploy",  () => {
        const anyAction = requestDaysSinceLastProductionDeployAction();

        it('should use the client to request the days since the last production deploy', async function () {
            await runSaga({dispatch: jest.fn()}, fetchDaysSinceLastProductionDeploy, anyAction);

            expect(mockedRequestDaysSinceLastProductionDeploy).toHaveBeenCalled();
        });

        it('should dispatch the action with the days since the last production deploy from the server', async function () {
            const days = aNonNegativeNumber();
            mockedRequestDaysSinceLastProductionDeploy.mockReturnValue(Promise.resolve<AxiosResponse<DaysSinceLastProductionDeployResponse>>(promiseResolvingTo200ResponseWith({days: days})));

            const mockDispatcher = jest.fn();
            await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);
            expect(mockDispatcher).toHaveBeenCalledWith(receiveDaysSinceLastProductionDeploy(days));
        });

        describe('when there is an error', function () {
            it('should dispatch the error', async function () {
                const reason = aString();
                mockedRequestDaysSinceLastProductionDeploy.mockReturnValue(Promise.reject(reason));
                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);

                expect(mockDispatcher).toHaveBeenCalledWith(applicationError(reason, "fetchDaysSinceLastProductionDeploy"));
            });
        });
    });
});