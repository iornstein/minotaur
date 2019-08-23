import sagas, {fetchTimeSinceProductionDeploy, updateLastProductionDeploy} from "./index";

import {
    TimeSinceProductionDeployResponse, notifyThatAProductionDeployHappened,
    requestTimeSinceProductionDeploy
} from "../clients/TimeSinceProductionDeployClient";
import {AxiosResponse} from "axios";
import {call, takeEvery} from "@redux-saga/core/effects";
import {
    applicationError,
    receiveTimeSinceLastProductionDeploy, REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE,
    REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    requestTimeSinceProductionDeployAction,
    UPDATE_STATUS_FOR_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION,
    updateStatusForTimeSinceProductionDeployRequest
} from "../store/actions";
import {runSaga} from "redux-saga";
import {aNonNegativeNumber, aString} from "../utils/testGenerators/generatePrimitives.test";
import {NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, RequestStatus} from "../store/reducer";

jest.mock("../clients/TimeSinceProductionDeployClient");
const mockedRequestTimeSinceProductionDeploy: jest.MockInstance<Promise<AxiosResponse<TimeSinceProductionDeployResponse>>, any[]> = requestTimeSinceProductionDeploy as any;
const mockedNotifyThatAProductionDeployHappened: jest.MockInstance<Promise<AxiosResponse<TimeSinceProductionDeployResponse>>, any[]> = notifyThatAProductionDeployHappened as any;

describe("sagas", function () {
    describe("listening to actions", () => {
        it('should fetch the time since the last production deploy when it receives the appropriate action', function () {
            const sagasGenerator = sagas();
            const actual = sagasGenerator.next();
            expect(actual.value.payload).toContainEqual(takeEvery(REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE, fetchTimeSinceProductionDeploy));
        });

        it('should report a production deploy when it receives the appropriate action', function () {
            const sagasGenerator = sagas();
            const actual = sagasGenerator.next();
            expect(actual.value.payload).toContainEqual(takeEvery(REPORT_A_PRODUCTION_DEPLOY_ACTION_TYPE, updateLastProductionDeploy));
        });
    });

    const promiseResolvingTo200ResponseWith = <T>(data: T) => {
        const response: AxiosResponse<T> = {
            data: data,
            status: 200,
            statusText: "",
            headers: null,
            config: {},
        };
        return Promise.resolve<AxiosResponse<T>>(response)
    };
    const anyAction = requestTimeSinceProductionDeployAction();

    describe("fetchTimeSinceProductionDeploy", () => {
        it('should use the client to request the time since the last production deploy', async function () {
            await runSaga({dispatch: jest.fn()}, fetchTimeSinceProductionDeploy, anyAction);

            expect(mockedRequestTimeSinceProductionDeploy).toHaveBeenCalled();
        });

        describe("when the request is successful", function () {
            const mockServerToReturnTimeSinceProductionDeploy = (days: number | null) => {
                mockedRequestTimeSinceProductionDeploy.mockReturnValue(Promise.resolve<AxiosResponse<TimeSinceProductionDeployResponse>>(promiseResolvingTo200ResponseWith({days: days})));
            };

            describe('when a production deploy has happened', function () {
                it('should dispatch the action with the time since the last production deploy from the server', async function () {
                    const time = aNonNegativeNumber();
                    mockServerToReturnTimeSinceProductionDeploy(time);

                    const mockDispatcher = jest.fn();
                    await runSaga({dispatch: mockDispatcher}, fetchTimeSinceProductionDeploy, anyAction);
                    expect(mockDispatcher).toHaveBeenCalledWith(receiveTimeSinceLastProductionDeploy(time));
                });
            });

            describe('when there has not yet been a production deploy', function () {
                it('should dispatch the action with the information that a production deploy has never happened', async function () {
                    mockServerToReturnTimeSinceProductionDeploy(null);

                    const mockDispatcher = jest.fn();
                    await runSaga({dispatch: mockDispatcher}, fetchTimeSinceProductionDeploy, anyAction);
                    expect(mockDispatcher).toHaveBeenCalledWith(receiveTimeSinceLastProductionDeploy(NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET));
                });
            });

            it('should dispatch that the request is no longer in flight AFTER the response is received', async function () {
                mockedRequestTimeSinceProductionDeploy.mockReturnValue(Promise.resolve<AxiosResponse<TimeSinceProductionDeployResponse>>(promiseResolvingTo200ResponseWith({days: aNonNegativeNumber()})));

                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchTimeSinceProductionDeploy, anyAction);

                const dispatchCalls = mockDispatcher.mock.calls;

                expect(mockDispatcher).toHaveBeenCalledWith(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
                const indexOfUpdateRequestStatus = dispatchCalls.findIndex(call => call[0].type === UPDATE_STATUS_FOR_TIME_SINCE_PRODUCTION_DEPLOY_REQUEST_ACTION);
                const indexOfReceiveTimeSinceLastProductionDeploy = dispatchCalls.findIndex(call => call[0].type === receiveTimeSinceLastProductionDeploy(0).type);
                expect(indexOfReceiveTimeSinceLastProductionDeploy).toBeLessThan(indexOfUpdateRequestStatus);
            });
        });

        describe('when there is an error', function () {
            it('should dispatch the error', async function () {
                const reason = aString();
                mockedRequestTimeSinceProductionDeploy.mockReturnValue(Promise.reject(reason));
                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchTimeSinceProductionDeploy, anyAction);

                expect(mockDispatcher).toHaveBeenCalledWith(applicationError(reason, "fetchTimeSinceProductionDeploy"));
            });

            it('should dispatch that the request is no longer in flight', async function () {
                mockedRequestTimeSinceProductionDeploy.mockReturnValue(Promise.reject(aString()));
                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, fetchTimeSinceProductionDeploy, anyAction);

                expect(mockDispatcher).toHaveBeenCalledWith(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
            });
        });
    });

    describe("updateLastProductionDeploy", () => {
        it('should use the client to put the new most recent production deploy', async function () {
            await runSaga({dispatch: jest.fn()}, updateLastProductionDeploy, anyAction);

            expect(mockedNotifyThatAProductionDeployHappened).toHaveBeenCalled();
        });

        it('should fetchTimeSinceLastProductionDeploy after a successful update', function () {
            const generator = updateLastProductionDeploy(anyAction);
            expect(generator.next().value).toEqual(call(notifyThatAProductionDeployHappened));
            expect(generator.next().value).toEqual(call(fetchTimeSinceProductionDeploy, anyAction));
        });

        describe('when there is an error', function () {
            it('should dispatch the error', async function () {
                const reason = aString();
                mockedNotifyThatAProductionDeployHappened.mockReturnValue(Promise.reject(reason));
                const mockDispatcher = jest.fn();
                await runSaga({dispatch: mockDispatcher}, updateLastProductionDeploy, anyAction);

                expect(mockDispatcher).toHaveBeenCalledWith(applicationError(reason, "updateLastProductionDeploy"));
            });
        });
    });
});