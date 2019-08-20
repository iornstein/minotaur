import {reducer} from "./reducer";
import {aNonNegativeNumber} from "../utils/testGenerators/generatePrimitives.test";
import {aState} from "../utils/testGenerators/generateDomain.test";
import {receiveDaysSinceLastProductionDeploy, REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE} from "./actions";

describe("reducer", function () {
    it('should default to the initial state', function () {
        const initialState = reducer(undefined, {type: REQUEST_DAYS_SINCE_LAST_PRODUCTION_DEPLOY_ACTION_TYPE});
        expect(initialState).toEqual({
            daysSinceProduction: null
        })
    });

    describe("Receive days since last production deploy", () => {
        it('should update the days since the last production deploy', function () {
            const days = aNonNegativeNumber();
            const newState = reducer(aState(), receiveDaysSinceLastProductionDeploy(days));

            expect(newState.daysSinceProduction).toEqual(days);
        });
    });
});