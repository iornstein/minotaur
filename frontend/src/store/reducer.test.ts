import {ApplicationState, HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET, reducer, RequestStatus} from "./reducer";
import {randomChoiceFrom} from "../utils/testGenerators/generatePrimitives.test";
import {aState, someTimeSinceProductionFromServer} from "../utils/testGenerators/generateDomain.test";
import {
    pollServer,
    receiveTimeSinceLastProductionDeploy,
    REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    updateStatusForTimeSinceProductionDeployRequest
} from "./actions";

describe("reducer", function () {
    let state : ApplicationState;

    it('should default to the initial state', function () {
        const initialState = reducer(undefined, {type: REQUEST_TIME_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE});
        const expectedState : ApplicationState = {
            timeSinceProduction: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
            timeSinceProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT
        };
        expect(initialState).toEqual(expectedState)
    });

    describe("when receiving time since most recent production deploy", () => {
        it('should update the time since the last production deploy', function () {
            const timeSinceProduction = someTimeSinceProductionFromServer();
            const newState = reducer(aState(), receiveTimeSinceLastProductionDeploy(timeSinceProduction));

            expect(newState.timeSinceProduction).toEqual(timeSinceProduction);
        });

        it('should keep the rest of the state the same', function () {
            const timeSinceProduction = someTimeSinceProductionFromServer();
            const oldState : ApplicationState = {...aState(), timeSinceProduction};
            const newState = reducer(oldState, receiveTimeSinceLastProductionDeploy(timeSinceProduction));
            expect(newState).toEqual(oldState);
        });
    });

    describe('when it is time to poll the server', () => {
        describe("when there are NO ongoing requests to retrieve the time since the most recent production deploy", () => {
            it('should signify the client should request for the time since the most recent production deploy', function () {
                state = {...aState(), timeSinceProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT};
                const newState = reducer(state, pollServer());

                expect(newState.timeSinceProductionRequestStatus).toEqual(RequestStatus.SHOULD_BE_MADE);
            });
        });

        describe("when there is an ongoing requests to retrieve the time since the most recent production deploy", () => {
            it('should NOT signify the client should request for the time since the most recent production deploy', function () {
                state = {...aState(), timeSinceProductionRequestStatus: RequestStatus.IN_FLIGHT};
                const newState = reducer(state, pollServer());
                expect(newState.timeSinceProductionRequestStatus).toEqual(RequestStatus.IN_FLIGHT);
            });
        });

        describe("when the retrieve the time since the last production deploy is already signified to be made", () => {
            it('should NOT change the status', function () {
                state = {...aState(), timeSinceProductionRequestStatus: RequestStatus.SHOULD_BE_MADE};
                const newState = reducer(state, pollServer());
                expect(newState.timeSinceProductionRequestStatus).toEqual(RequestStatus.SHOULD_BE_MADE);
            });
        });

        it('should keep the rest of the state the same', function () {
            const oldState: ApplicationState = {...aState(), timeSinceProductionRequestStatus: RequestStatus.SHOULD_BE_MADE};
            const newState = reducer(oldState, pollServer());
            expect(newState).toEqual(oldState);
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
            const oldState : ApplicationState = {...aState(), timeSinceProductionRequestStatus: sameRequestStatus};
            const newState = reducer(oldState, updateStatusForTimeSinceProductionDeployRequest(sameRequestStatus));
            expect(newState).toEqual(oldState);
        });
    });
});