import {
    ApplicationState,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET,
    RequestStatus
} from "../../store/reducer";
import {aNonNegativeNumber, randomChoiceFrom} from "./generatePrimitives.test";

const requestStatuses = Object.keys(RequestStatus).map(value => (value as unknown as RequestStatus));

export const aRequestStatus = () => randomChoiceFrom(requestStatuses);

export const aState = () : ApplicationState => {
    return {
        daysSinceProduction: randomChoiceFrom([aNonNegativeNumber(), NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET, HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET]),
        daysSinceLastProductionRequestStatus: aRequestStatus(),
    };
};

it('there needs to be a test until we eject from create react app', () => {});