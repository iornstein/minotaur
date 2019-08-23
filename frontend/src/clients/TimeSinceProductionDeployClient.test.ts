import {
    TimeSinceProductionDeployResponse, notifyThatAProductionDeployHappened,
    requestTimeSinceProductionDeploy
} from "./TimeSinceProductionDeployClient";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {aNonNegativeNumber, aString} from "../utils/testGenerators/generatePrimitives.test";

describe('requestTimeSinceProductionDeploy', function () {
    it('should return the time since the last production deploy', function () {
        const mock = new MockAdapter(axios);
        const expectedResponse : TimeSinceProductionDeployResponse = {
            days: aNonNegativeNumber()
        };
        mock.onGet('http://localhost:8080/daysSinceLastProductionDeploy').reply(200, expectedResponse);

        requestTimeSinceProductionDeploy().then((response) => {
            expect(response.data).toEqual(expectedResponse);
        }).catch(error => expect("no errors").toEqual("but received: " + error))
    });
});

describe('notifyThatAProductionDeployHappened', function () {
    it('should send a put request to signify that a new production deploy occurred', function () {
        const mock = new MockAdapter(axios);
        const body = aString();
        mock.onPut('http://localhost:8080/daysSinceLastProductionDeploy').reply(200, body);

        notifyThatAProductionDeployHappened().then((response) => {
            expect(response.data).toEqual(body);
        }).catch(error => expect("no errors").toEqual("but received: " + error));
    });
});