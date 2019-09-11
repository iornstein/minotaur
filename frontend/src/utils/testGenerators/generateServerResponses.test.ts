import {
    NonNullTimeSinceProductionDeployResponse,
    TimeSinceProductionDeployResponse
} from "../../clients/TimeSinceProductionDeployClient";
import {aNonNegativeInteger, aPercent, aString, randomChoiceFrom} from "./generatePrimitives.test";
import {someHours} from "./generateDomain.test";
import {TrackerAnalyticsResponse} from "../../clients/TrackerAnalyticsClient";

export const someNonNullTimeSinceProductionFromServer: () => NonNullTimeSinceProductionDeployResponse = () => {
    return {days: aNonNegativeInteger(), hours: someHours()};
};
export const someTimeSinceProductionFromServer: () => TimeSinceProductionDeployResponse = () => {
    return randomChoiceFrom([
        {days: null, hours: null},
        someNonNullTimeSinceProductionFromServer()
    ]);
};

export const someTrackerAnalyticsResponse: () => TrackerAnalyticsResponse = () => {
    return {
        name: aString(),
        velocity: aNonNegativeInteger(),
        volatility: aPercent(),
    };
};

it('there needs to be a test until we eject from create react app', () => {});
