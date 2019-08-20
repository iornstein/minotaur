import {
    DaysSinceLastProductionDeployResponse,
    requestDaysSinceLastProductionDeploy
} from "./DaysSinceLastProductionDeployClient";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {aNonNegativeNumber} from "../utils/testGenerators/generatePrimitives.test";

describe('requestDaysSinceLastProductionDeploy', function () {
    it('should return the days since the last production deploy', function () {
        const mock = new MockAdapter(axios);
        const expectedResponse : DaysSinceLastProductionDeployResponse = {
            days: aNonNegativeNumber()
        };
        mock.onGet('http://localhost:8080/daysSinceLastProductionDeploy').reply(200, expectedResponse);

        requestDaysSinceLastProductionDeploy().then((response) => {
            expect(response.data).toEqual(expectedResponse);
        }).catch(error => expect("no errors").toEqual("but received: " + error))
    });
});