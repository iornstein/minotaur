import {aRequestStatus, aState} from "../utils/testGenerators/generateDomain.test";
import {ApplicationState, RequestStatus} from "../store/reducer";
import {mapDispatchToProps, mapStateToProps} from "./TrackerAnalyticsPoller";
import {requestTrackerAnalytics, updateStatusForTrackerAnalyticsRequest} from "../store/actions";

describe('TrackerAnalyticsPoller', function () {
    describe('mapStateToProps', function () {
        it('should allow component to read status of the tracker analytics request', function () {
            const requestStatus = aRequestStatus();
            const state : ApplicationState = {...aState(), trackerAnalyticsRequestStatus: requestStatus};
            expect(mapStateToProps(state).requestStatus).toEqual(requestStatus);
        });
    });

    describe("mapDispatchToProps", () => {
        it('should allow the component to load the tracker analytics', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).makeRequest();
            expect(mockDispatch).toHaveBeenCalledWith(requestTrackerAnalytics());
        });

        it('should allow the component to signify that a request is in flight', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).updateRequestStatusToInFlight();
            expect(mockDispatch).toHaveBeenCalledWith(updateStatusForTrackerAnalyticsRequest(RequestStatus.IN_FLIGHT));
        });
    });
});