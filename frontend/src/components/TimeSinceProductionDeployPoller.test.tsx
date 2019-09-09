import {mapDispatchToProps, mapStateToProps} from "./TimeSinceProductionDeployPoller";
import {aRequestStatus, aState} from "../utils/testGenerators/generateDomain.test";
import {
    requestTimeSinceProductionDeployAction,
    updateStatusForTimeSinceProductionDeployRequest
} from "../store/actions";
import React from 'react';
import {ApplicationState, RequestStatus} from "../store/reducer";

describe('TimeSinceProductionPoller', function () {
    describe('mapStateToProps', function () {
        it('should allow component to read status of the time since last production deploy request', function () {
            const requestStatus = aRequestStatus();
            const state : ApplicationState = {...aState(), timeSinceProductionRequestStatus: requestStatus};
            expect(mapStateToProps(state).requestStatus).toEqual(requestStatus);
        });
    });

    describe("mapDispatchToProps", () => {
        it('should allow the component to load the time since last production deploy', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).makeRequest();
            expect(mockDispatch).toHaveBeenCalledWith(requestTimeSinceProductionDeployAction());
        });

        it('should allow the component to signify that a request is in flight', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).updateRequestStatusToInFlight();
            expect(mockDispatch).toHaveBeenCalledWith(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.IN_FLIGHT));
        });
    });
});