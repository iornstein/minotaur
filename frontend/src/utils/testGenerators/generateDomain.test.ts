import {ApplicationState} from "../../store/reducer";
import {aNonNegativeNumber} from "./generatePrimitives.test";

export const aState = () : ApplicationState => {
    return {
        daysSinceProduction: aNonNegativeNumber()
    };
};

it('there needs to be a test until we eject from create react app', () => {});