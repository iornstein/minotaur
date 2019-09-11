import {
    ApplicationState,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
    RequestStatus,
    KnownTimeSinceProductionDeployType, KnownOrUnknownTimeSinceProductionDeployType, TrackerAnalytics
} from "../../store/reducer";
import {
    aNonNegativeInteger,
    aPercent,
    aString,
    randomChoiceFrom,
    randomIntegerBetween
} from "./generatePrimitives.test";

const requestStatuses = Object.keys(RequestStatus).map(value => (value as unknown as RequestStatus));

export const aRequestStatus = () => randomChoiceFrom(requestStatuses);

export const someKnownOrUnknownTimeSinceProduction: () => KnownOrUnknownTimeSinceProductionDeployType = () => {
    return randomChoiceFrom([someKnownTimeSinceProduction(), HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET]);
};

export const someKnownTimeSinceProduction: () => KnownTimeSinceProductionDeployType = () => {
    return randomChoiceFrom([
        {days: aNonNegativeInteger(), hasBeenAtLeastADay: true},
        {hours: someHours(), hasBeenAtLeastADay: false},
        NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET]);
};

export const aState = (): ApplicationState => {
    return {
        timeSinceProduction: someKnownOrUnknownTimeSinceProduction(),
        timeSinceProductionRequestStatus: aRequestStatus(),
        trackerAnalyticsRequestStatus: aRequestStatus(),
        trackerAnalytics: someTrackerAnalytics(),
    };
};

export const someHours = (): number => {
    return randomIntegerBetween(0, 24);
};

export const someTrackerAnalytics: () => TrackerAnalytics = () => {
    return {
        projectName: aString(),
        volatility: aPercent(),
        velocity: aNonNegativeInteger(),
    };
};

it('there needs to be a test until we eject from create react app', () => {
});