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
    requestDaysSinceLastProductionDeployAction,
    UPDATE_STATUS_FOR_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION,
    updateStatusForDaysSinceLastProductionDeployRequest
} from "../store/actions";
import {runSaga} from "redux-saga";
import {aNonNegativeNumber, aString} from "../utils/testGenerators/generatePrimitives.test";
import {NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, RequestStatus} from "../store/reducer";

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

        describe("when the request is successful", function () {
            const mockServerToReturnDaysSinceProductionDeploy = (days: number | null) => {
                mockedRequestDaysSinceLastProductionDeploy.mockReturnValue(Promise.resolve<AxiosResponse<DaysSinceLastProductionDeployResponse>>(promiseResolvingTo200ResponseWith({days})));
            };

            describe('when a production deploy has happened', function () {
                it('should dispatch the action with the days since the last production deploy from the server', async function () {
                    const days = aNonNegativeNumber();
                    mockServerToReturnDaysSinceProductionDeploy(days);

                    const mockDispatcher = jest.fn();
                    await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);
                    expect(mockDispatcher).toHaveBeenCalledWith(receiveDaysSinceLastProductionDeploy(days));
                });
            });

            describe('when there has not yet been a production deploy', function () {
                it('should dispatch the action with the information that a production deploy has never happened', async function () {
                    mockServerToReturnDaysSinceProductionDeploy(null);

                    const mockDispatcher = jest.fn();
                    await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);
                    expect(mockDispatcher).toHaveBeenCalledWith(receiveDaysSinceLastProductionDeploy(NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET));
                });
            });

            it('should dispatch that the request is no longer in flight AFTER the response is received', async function () {
                mockedRequestDaysSinceLastProductionDeploy.mockReturnValue(Promise.resolve<AxiosResponse<DaysSinceLastProductionDeployResponse>>(promiseResolvingTo200ResponseWith({days: aNonNegativeNumber()})));

                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);

                const dispatchCalls = mockDispatcher.mock.calls;

                expect(mockDispatcher).toHaveBeenCalledWith(updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
                const indexOfUpdateRequestStatus = dispatchCalls.findIndex(call => call[0].type === UPDATE_STATUS_FOR_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_REQUEST_ACTION);
                const indexOfReceiveDaysSinceLastProductionDeploy = dispatchCalls.findIndex(call => call[0].type === receiveDaysSinceLastProductionDeploy(0).type);
                expect(indexOfReceiveDaysSinceLastProductionDeploy).toBeLessThan(indexOfUpdateRequestStatus);
            });
        });

        describe('when there is an error', function () {
            it('should dispatch the error', async function () {
                const reason = aString();
                mockedRequestDaysSinceLastProductionDeploy.mockReturnValue(Promise.reject(reason));
                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);

                expect(mockDispatcher).toHaveBeenCalledWith(applicationError(reason, "fetchDaysSinceLastProductionDeploy"));
            });

            it('should dispatch that the request is no longer in flight', async function () {
                mockedRequestDaysSinceLastProductionDeploy.mockReturnValue(Promise.reject(aString()));
                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchDaysSinceLastProductionDeploy, anyAction);

                expect(mockDispatcher).toHaveBeenCalledWith(updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
            });
        });
    });
});