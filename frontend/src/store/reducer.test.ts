import {ApplicationState, UNKNOWN_VALUE, reducer, RequestStatus} from "./reducer";
import {randomChoiceFrom} from "../utils/testGenerators/generatePrimitives.test";
import {
    aRequestStatus,
    aState,
    someTimeSinceProduction,
    someTrackerAnalytics
} from "../utils/testGenerators/generateDomain.test";
import {
    pollServer,
    receiveTimeSinceLastProductionDeploy, receiveTrackerAnalytics,
    REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    updateStatusForTimeSinceProductionDeployRequest, updateStatusForTrackerAnalyticsRequest
} from "./actions";

describe("reducer", function () {
    let state: ApplicationState;

    it('should default to the initial state', function () {
        const initialState = reducer(undefined, {type: REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE});
        const expectedState: ApplicationState = {
            timeSinceProduction: UNKNOWN_VALUE,
            timeSinceProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT,
            trackerAnalyticsRequestStatus: RequestStatus.NOT_IN_FLIGHT,
            trackerAnalytics: UNKNOWN_VALUE
        };
        expect(initialState).toEqual(expectedState)
    });

    describe("when receiving time since most recent production deploy", () => {
        it('should update the time since the last production deploy', function () {
            const timeSinceProduction = someTimeSinceProduction();
            const newState = reducer(aState(), receiveTimeSinceLastProductionDeploy(timeSinceProduction));

            expect(newState.timeSinceProduction).toEqual(timeSinceProduction);
        });

        it('should keep the rest of the state the same', function () {
            const timeSinceProduction = someTimeSinceProduction();
            const oldState: ApplicationState = {...aState(), timeSinceProduction};
            const newState = reducer(oldState, receiveTimeSinceLastProductionDeploy(timeSinceProduction));
            expect(newState).toEqual(oldState);
        });
    });

    describe('when receiving the tracker analytics', function () {
        it('should update the tracker analytics', function () {
            const trackerAnalytics = someTrackerAnalytics();
            const newState = reducer(aState(), receiveTrackerAnalytics(trackerAnalytics));

            expect(newState.trackerAnalytics).toEqual(trackerAnalytics);
        });

        it('should keep the rest of the state the same', function () {
            const trackerAnalytics = someTrackerAnalytics();
            const oldState: ApplicationState = {...aState(), trackerAnalytics};
            const newState = reducer(oldState, receiveTrackerAnalytics(trackerAnalytics));
            expect(oldState).toEqual(newState);
        });
    });

    describe('when it is time to poll the server', () => {
        const pollingTests = [
            {
                requestDescription: "time since the most recent production deploy",
                stateWithStatus: (status: RequestStatus): ApplicationState => ({
                    ...aState(),
                    timeSinceProductionRequestStatus: status
                }),
                expectStateToHaveRequestStatus: (newState: ApplicationState, status: RequestStatus) => expect(newState.timeSinceProductionRequestStatus).toEqual(status)
            },
            {
                requestDescription: "tracker analytics",
                stateWithStatus: (status: RequestStatus): ApplicationState => ({
                    ...aState(),
                    trackerAnalyticsRequestStatus: status
                }),
                expectStateToHaveRequestStatus: (newState: ApplicationState, status: RequestStatus) => expect(newState.trackerAnalyticsRequestStatus).toEqual(status)
            }
        ];

        pollingTests.forEach(({requestDescription, stateWithStatus, expectStateToHaveRequestStatus}) => {
            describe('for the ' + requestDescription + ' request', function () {
                describe("when there are NO ongoing requests", () => {
                    it('should signify the client should make that request', function () {
                        const newState = reducer(stateWithStatus(RequestStatus.NOT_IN_FLIGHT), pollServer());

                        expectStateToHaveRequestStatus(newState, RequestStatus.SHOULD_BE_MADE);
                    });
                });

                describe("when there is an ongoing request", () => {
                    it('should NOT signify the client should make the request', function () {
                        const newState = reducer(stateWithStatus(RequestStatus.IN_FLIGHT), pollServer());
                        expectStateToHaveRequestStatus(newState, RequestStatus.IN_FLIGHT);
                    });
                });

                describe("when the request is already acknowledged as needing to be made", () => {
                    it('should NOT change the status', function () {
                        const newState = reducer(stateWithStatus(RequestStatus.SHOULD_BE_MADE), pollServer());
                        expectStateToHaveRequestStatus(newState, RequestStatus.SHOULD_BE_MADE);
                    });
                });

                it('should keep the rest of the state the same', function () {
                    const oldState: ApplicationState = stateWithStatus(aRequestStatus());
                    const newState = reducer(oldState, pollServer());
                    //ignore the request status fields
                    newState.trackerAnalyticsRequestStatus = oldState.trackerAnalyticsRequestStatus;
                    newState.timeSinceProductionRequestStatus = oldState.timeSinceProductionRequestStatus;

                    expect(newState).toEqual(oldState);
                });
            });
        });
    });

    describe("updating the last production deploy request status", function () {
        describe('when a request for the time since last production deploy is about to be made', () => {
            it('should update the status to in flight so we do not make simultaneous requests', function () {
                state = reducer(aState(), updateStatusForTimeSinceProductionDeployRequest(RequestStatus.IN_FLIGHT));
                expect(state.timeSinceProductionRequestStatus).toEqual(RequestStatus.IN_FLIGHT);
            });
        });

        describe('when a request for the time since last production deploy has finished', () => {
            it('should update the status to in flight so we can make a new request later', function () {
                state = reducer(aState(), updateStatusForTimeSinceProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
                expect(state.timeSinceProductionRequestStatus).toEqual(RequestStatus.NOT_IN_FLIGHT);
            });
        });

        it('should keep the rest of the state the same', function () {
            const sameRequestStatus: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT = randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]);
            const oldState: ApplicationState = {...aState(), timeSinceProductionRequestStatus: sameRequestStatus};
            const newState = reducer(oldState, updateStatusForTimeSinceProductionDeployRequest(sameRequestStatus));
            expect(newState).toEqual(oldState);
        });
    });

    describe("updating the tracker analytics request status", function () {
        describe('when a request for the tracker analytics is about to be made', () => {
            it('should update the status to in flight so we do not make simultaneous requests', function () {
                state = reducer(aState(), updateStatusForTrackerAnalyticsRequest(RequestStatus.IN_FLIGHT));
                expect(state.trackerAnalyticsRequestStatus).toEqual(RequestStatus.IN_FLIGHT);
            });
        });

        describe('when a request for the tracker analytics has finished', () => {
            it('should update the status to in flight so we can make a new request later', function () {
                state = reducer(aState(), updateStatusForTrackerAnalyticsRequest(RequestStatus.NOT_IN_FLIGHT));
                expect(state.trackerAnalyticsRequestStatus).toEqual(RequestStatus.NOT_IN_FLIGHT);
            });
        });

        it('should keep the rest of the state the same', function () {
            const sameRequestStatus: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT = randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]);
            const oldState: ApplicationState = {...aState(), trackerAnalyticsRequestStatus: sameRequestStatus};
            const newState = reducer(oldState, updateStatusForTrackerAnalyticsRequest(sameRequestStatus));
            expect(newState).toEqual(oldState);
        });
    })
});