import {ApplicationState, RequestStatus} from "../../store/reducer";
import {aNonNegativeNumber, randomChoiceFrom} from "./generatePrimitives.test";

const requestStatuses = Object.keys(RequestStatus).map(value => (value as unknown as RequestStatus));

export const aRequestStatus = () => randomChoiceFrom(requestStatuses);

export const aState = () : ApplicationState => {
    return {
        daysSinceProduction: aNonNegativeNumber(),
        daysSinceLastProductionRequestStatus: aRequestStatus(),
    };
};

it('there needs to be a test until we eject from create react app', () => {});