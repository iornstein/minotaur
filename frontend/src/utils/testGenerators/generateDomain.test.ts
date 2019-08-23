import {
    ApplicationState,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
    RequestStatus,
    TimeSinceProductionDeployFromServerType,
    TimeSinceProductionDeployType
} from "../../store/reducer";
import {aNonNegativeNumber, randomChoiceFrom} from "./generatePrimitives.test";

const requestStatuses = Object.keys(RequestStatus).map(value => (value as unknown as RequestStatus));

export const aRequestStatus = () => randomChoiceFrom(requestStatuses);

export const someTimeSinceProduction: () => TimeSinceProductionDeployType = () => {
    return randomChoiceFrom([someTimeSinceProductionFromServer(), HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET]);
};

export const someTimeSinceProductionFromServer: () => TimeSinceProductionDeployFromServerType = () => {
    return randomChoiceFrom([aNonNegativeNumber(), NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET]);
};

export const aState = () : ApplicationState => {
    return {
        timeSinceProduction: someTimeSinceProduction(),
        timeSinceProductionRequestStatus: aRequestStatus(),
    };
};

it('there needs to be a test until we eject from create react app', () => {});