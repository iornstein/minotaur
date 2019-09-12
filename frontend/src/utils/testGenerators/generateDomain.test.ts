import {
    ApplicationState,
    UNKNOWN_VALUE,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, PossiblyUnknownValue,
    RequestStatus,
    TimeSinceProductionDeploy, TrackerAnalytics
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

export const someTimeSinceProduction: () => TimeSinceProductionDeploy = () => {
    return randomChoiceFrom([
        {days: aNonNegativeInteger(), hasBeenAtLeastADay: true},
        {hours: someHours(), hasBeenAtLeastADay: false},
        NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET]);
};

export const aState = (): ApplicationState => {
    return {
        timeSinceProduction: knownOrUnknown(someTimeSinceProduction),
        timeSinceProductionRequestStatus: aRequestStatus(),
        trackerAnalyticsRequestStatus: aRequestStatus(),
        trackerAnalytics: knownOrUnknown(someTrackerAnalytics),
    };
};

export const someHours = (): number => {
    return randomIntegerBetween(0, 24);
};

export const knownOrUnknown = <T>(valueProducer: () => T) : PossiblyUnknownValue<T> => {
    return randomChoiceFrom([UNKNOWN_VALUE, valueProducer()]);
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