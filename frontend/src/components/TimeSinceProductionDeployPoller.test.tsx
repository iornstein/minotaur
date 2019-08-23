import {
    TimeSinceProductionDeployPoller,
    mapDispatchToProps,
    mapStateToProps,
    Props
} from "./TimeSinceProductionDeployPoller";
import {aRequestStatus, aState} from "../utils/testGenerators/generateDomain.test";
import {
    requestTimeSinceProductionDeployAction,
    updateStatusForTimeSinceProductionDeployRequest
} from "../store/actions";
import {shallow, ShallowWrapper} from "enzyme";
import React from 'react';
import {ApplicationState, RequestStatus} from "../store/reducer";
import {randomChoiceFrom} from "../utils/testGenerators/generatePrimitives.test";

describe('TimeSinceProductionPoller', function () {
    describe("component", () => {
        let subject: ShallowWrapper<Props>;
        beforeEach(() => {
            subject = shallow(<TimeSinceProductionDeployPoller
                getTimeSinceProductionDeploy={jest.fn()}
                requestStatus={aRequestStatus()}
                updateStatusToInFlightForTimeSinceProductionDeployRequest={jest.fn()}
            />);
        });

        describe("when a request should be made", function () {
            describe('when the request has not been made yet', function () {
                beforeEach(() => {
                    subject.setProps({requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT])})
                });

                it('should request the time since last production deploy', function () {
                    const mockGetTimeSinceProductionDeploy = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        getTimeSinceProductionDeploy: mockGetTimeSinceProductionDeploy
                    });

                    expect(mockGetTimeSinceProductionDeploy).toHaveBeenCalled();
                });

                it('should signify that the request is being made', function () {
                    const mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        updateStatusToInFlightForTimeSinceProductionDeployRequest: mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest
                    });

                    expect(mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest).toHaveBeenCalled();
                });
            });

            describe('when the request has already been made', function () {
                beforeEach(() => {
                    subject.setProps({requestStatus: RequestStatus.SHOULD_BE_MADE})
                });

                it('should NOT request the time since last production deploy', function () {
                    const mockGetTimeSinceProductionDeploy = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        getTimeSinceProductionDeploy: mockGetTimeSinceProductionDeploy
                    });

                    expect(mockGetTimeSinceProductionDeploy).not.toHaveBeenCalled();
                });

                it('should NOT signify that the request is being made', function () {
                    const mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        updateStatusToInFlightForTimeSinceProductionDeployRequest: mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest
                    });

                    expect(mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest).not.toHaveBeenCalled();
                });
            })
        });

        describe("when a request should NOT be made", function () {
            it('should NOT request the time since last production deploy', function () {
                const mockGetTimeSinceProductionDeploy = jest.fn();

                subject.setProps({
                    requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]),
                    getTimeSinceProductionDeploy: mockGetTimeSinceProductionDeploy
                });

                expect(mockGetTimeSinceProductionDeploy).not.toHaveBeenCalled();
            });

            it('should NOT signify that the request is being made', function () {
                const mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest = jest.fn();

                subject.setProps({
                    requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]),
                    updateStatusToInFlightForTimeSinceProductionDeployRequest: mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest
                });

                expect(mockUpdateStatusToInFlightForTimeSinceProductionDeployRequest).not.toHaveBeenCalled();
            });
        });
    });

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
            mapDispatchToProps(mockDispatch).getTimeSinceProductionDeploy();
            expect(mockDispatch).toHaveBeenCalledWith(requestTimeSinceProductionDeployAction());
        });

        it('should allow the component to signify that a request is in flight', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).updateStatusToInFlightForTimeSinceProductionDeployRequest();
            expect(mockDispatch).toHaveBeenCalledWith(updateStatusForTimeSinceProductionDeployRequest(RequestStatus.IN_FLIGHT));
        });
    });
});