import {
    NonNullTimeSinceProductionDeployResponse,
    TimeSinceProductionDeployResponse
} from "../../clients/TimeSinceProductionDeployClient";
import {aNonNegativeNumber, randomChoiceFrom} from "./generatePrimitives.test";
import {someHours} from "./generateDomain.test";

export const someNonNullTimeSinceProductionFromServer: () => NonNullTimeSinceProductionDeployResponse = () => {
    return {days: aNonNegativeNumber(), hours: someHours()};
};
export const someTimeSinceProductionFromServer: () => TimeSinceProductionDeployResponse = () => {
    return randomChoiceFrom([
        {days: null, hours: null},
        someNonNullTimeSinceProductionFromServer()
    ]);
};

it('there needs to be a test until we eject from create react app', () => {});
