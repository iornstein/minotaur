import {reducer, RequestStatus} from "./reducer";
import {aNonNegativeNumber, randomChoiceFrom} from "../utils/testGenerators/generatePrimitives.test";
import {aState} from "../utils/testGenerators/generateDomain.test";
import {
    pollServer,
    receiveDaysSinceLastProductionDeploy,
    REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE,
    updateStatusForDaysSinceLastProductionDeployRequest
} from "./actions";

describe("reducer", function () {
    it('should default to the initial state', function () {
        const initialState = reducer(undefined, {type: REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE});
        expect(initialState).toEqual({
            daysSinceProduction: null,
            daysSinceLastProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT
        })
    });

    describe("when receiving days since last production deploy", () => {
        it('should update the days since the last production deploy', function () {
            const days = aNonNegativeNumber();
            const newState = reducer(aState(), receiveDaysSinceLastProductionDeploy(days));

            expect(newState.daysSinceProduction).toEqual(days);
        });

        it('should keep the rest of the state the same', function () {
            const days = aNonNegativeNumber();
            const oldState = {...aState(), daysSinceProduction: days};
            const newState = reducer(oldState, receiveDaysSinceLastProductionDeploy(days));
            expect(newState).toEqual(oldState);
        });
    });

    describe('when it is time to poll the server', () => {
        describe("when there are NO ongoing requests to retrieve the days since the last production deploy", () => {
            it('should signify the client should request for the days since the last production deploy', function () {
                const state = {...aState(), daysSinceLastProductionRequestStatus: RequestStatus.NOT_IN_FLIGHT};
                const newState = reducer(state, pollServer());

                expect(newState.daysSinceLastProductionRequestStatus).toEqual(RequestStatus.SHOULD_BE_MADE);
            });
        });

        describe("when there is an ongoing requests to retrieve the days since the last production deploy", () => {
            it('should NOT signify the client should request for the days since the last production deploy', function () {
                const state = {...aState(), daysSinceLastProductionRequestStatus: RequestStatus.IN_FLIGHT};
                const newState = reducer(state, pollServer());
                expect(newState.daysSinceLastProductionRequestStatus).toEqual(RequestStatus.IN_FLIGHT);
            });
        });

        describe("when the retrieve the days since the last production deploy is already signified to be made", () => {
            it('should NOT change the status', function () {
                const state = {...aState(), daysSinceLastProductionRequestStatus: RequestStatus.SHOULD_BE_MADE};
                const newState = reducer(state, pollServer());
                expect(newState.daysSinceLastProductionRequestStatus).toEqual(RequestStatus.SHOULD_BE_MADE);
            });
        });

        it('should keep the rest of the state the same', function () {
            const oldState = {...aState(), daysSinceLastProductionRequestStatus: RequestStatus.SHOULD_BE_MADE};
            const newState = reducer(oldState, pollServer());
            expect(newState).toEqual(oldState);
        });
    });

    describe("updating the last production deploy request status", function () {
        describe('when a request for the days since last production deploy is about to be made', () => {
            it('should update the status to in flight so we do not make simultaneous requests', function () {
                const state = reducer(aState(), updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.IN_FLIGHT));
                expect(state.daysSinceLastProductionRequestStatus).toEqual(RequestStatus.IN_FLIGHT);
            });
        });

        describe('when a request for the days since last production deploy has finished', () => {
            it('should update the status to in flight so we can make a new request later', function () {
                const state = reducer(aState(), updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.NOT_IN_FLIGHT));
                expect(state.daysSinceLastProductionRequestStatus).toEqual(RequestStatus.NOT_IN_FLIGHT);
            });
        });

        it('should keep the rest of the state the same', function () {
            const sameRequestStatus: RequestStatus.IN_FLIGHT | RequestStatus.NOT_IN_FLIGHT = randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]);
            const oldState = {...aState(), daysSinceLastProductionRequestStatus: sameRequestStatus};
            const newState = reducer(oldState, updateStatusForDaysSinceLastProductionDeployRequest(sameRequestStatus));
            expect(newState).toEqual(oldState);
        });
    });
});