import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {someTrackerAnalyticsResponse} from "../utils/testGenerators/generateServerResponses.test";
import {requestTrackerAnalytics} from "./TrackerAnalyticsClient";

describe('requestTrackerAnalytics', function () {
    it('should return the tracker analytics', function () {
        const mock = new MockAdapter(axios);
        const expectedResponse = someTrackerAnalyticsResponse();
        mock.onGet('http://localhost:8525/tracker/project').reply(200, expectedResponse);

        requestTrackerAnalytics().then((response) => {
            expect(response.data).toEqual(expectedResponse);
        }).catch(error => expect("no errors").toEqual("but received: " + error));
    });
});