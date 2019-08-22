import {
    DaysSinceLastProductionDeployPoller,
    mapDispatchToProps,
    mapStateToProps,
    Props
} from "./DaysSinceLastProductionDeployPoller";
import {aRequestStatus, aState} from "../utils/testGenerators/generateDomain.test";
import {
    requestDaysSinceLastProductionDeployAction,
    updateStatusForDaysSinceLastProductionDeployRequest
} from "../store/actions";
import {shallow, ShallowWrapper} from "enzyme";
import React from 'react';
import {RequestStatus} from "../store/reducer";
import {randomChoiceFrom} from "../utils/testGenerators/generatePrimitives.test";

describe('DaysSinceLastProductionPoller', function () {
    describe("component", () => {
        let subject: ShallowWrapper<Props>;
        beforeEach(() => {
            subject = shallow(<DaysSinceLastProductionDeployPoller
                getDaysSinceLastProductionDeploy={jest.fn()}
                requestStatus={aRequestStatus()}
                updateStatusToInFlightForDaysSinceLastProductionDeployRequest={jest.fn()}
            />);
        });

        describe("when a request should be made", function () {
            describe('when the request has not been made yet', function () {
                beforeEach(() => {
                    subject.setProps({requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT])})
                });

                it('should request the days since last production deploy', function () {
                    const mockGetDaysSinceLastProductionDeploy = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        getDaysSinceLastProductionDeploy: mockGetDaysSinceLastProductionDeploy
                    });

                    expect(mockGetDaysSinceLastProductionDeploy).toHaveBeenCalled();
                });

                it('should signify that the request is being made', function () {
                    const mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        updateStatusToInFlightForDaysSinceLastProductionDeployRequest: mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest
                    });

                    expect(mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest).toHaveBeenCalled();
                });
            });

            describe('when the request has already been made', function () {
                beforeEach(() => {
                    subject.setProps({requestStatus: RequestStatus.SHOULD_BE_MADE})
                });

                it('should NOT request the days since last production deploy', function () {
                    const mockGetDaysSinceLastProductionDeploy = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        getDaysSinceLastProductionDeploy: mockGetDaysSinceLastProductionDeploy
                    });

                    expect(mockGetDaysSinceLastProductionDeploy).not.toHaveBeenCalled();
                });

                it('should NOT signify that the request is being made', function () {
                    const mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        updateStatusToInFlightForDaysSinceLastProductionDeployRequest: mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest
                    });

                    expect(mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest).not.toHaveBeenCalled();
                });
            })
        });

        describe("when a request should NOT be made", function () {
            it('should NOT request the days since last production deploy', function () {
                const mockGetDaysSinceLastProductionDeploy = jest.fn();

                subject.setProps({
                    requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]),
                    getDaysSinceLastProductionDeploy: mockGetDaysSinceLastProductionDeploy
                });

                expect(mockGetDaysSinceLastProductionDeploy).not.toHaveBeenCalled();
            });

            it('should NOT signify that the request is being made', function () {
                const mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest = jest.fn();

                subject.setProps({
                    requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]),
                    updateStatusToInFlightForDaysSinceLastProductionDeployRequest: mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest
                });

                expect(mockUpdateStatusToInFlightForDaysSinceLastProductionDeployRequest).not.toHaveBeenCalled();
            });
        });
    });

    describe('mapStateToProps', function () {
        it('should allow component to read status of the days since last production deploy request', function () {
            const requestStatus = aRequestStatus();
            const state = {...aState(), daysSinceLastProductionRequestStatus: requestStatus};
            expect(mapStateToProps(state).requestStatus).toEqual(requestStatus);
        });
    });

    describe("mapDispatchToProps", () => {
        it('should allow the component to load the days since last production deploy', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).getDaysSinceLastProductionDeploy();
            expect(mockDispatch).toHaveBeenCalledWith(requestDaysSinceLastProductionDeployAction());
        });

        it('should allow the component to signify that a request is in flight', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).updateStatusToInFlightForDaysSinceLastProductionDeployRequest();
            expect(mockDispatch).toHaveBeenCalledWith(updateStatusForDaysSinceLastProductionDeployRequest(RequestStatus.IN_FLIGHT));
        });
    });
});