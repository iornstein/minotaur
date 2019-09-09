import {RequestMaker, UpdatingProps} from "./RequestMaker";
import {shallow, ShallowWrapper} from "enzyme";
import React from 'react';
import {aRequestStatus} from "../utils/testGenerators/generateDomain.test";
import {randomChoiceFrom} from "../utils/testGenerators/generatePrimitives.test";
import {RequestStatus} from "../store/reducer";

describe('TimeSinceProductionPoller', function () {
    describe("component", () => {
        let subject: ShallowWrapper<UpdatingProps>;
        beforeEach(() => {
            subject = shallow(<RequestMaker requestStatus={aRequestStatus()} makeRequest={jest.fn()}
                                            updateRequestStatusToInFlight={jest.fn()}/>);
        });

        describe("when a request should be made", function () {
            describe('when the request has not been made yet', function () {
                beforeEach(() => {
                    subject.setProps({requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT])})
                });

                it('should make the request', function () {
                    const mockMakeRequest = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        makeRequest: mockMakeRequest
                    });

                    expect(mockMakeRequest).toHaveBeenCalled();
                });

                it('should signify that the request is being made', function () {
                    const mockUpdateRequestStatusToInFlight = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        updateRequestStatusToInFlight: mockUpdateRequestStatusToInFlight
                    });

                    expect(mockUpdateRequestStatusToInFlight).toHaveBeenCalled();
                });
            });

            describe('when the request has already been made', function () {
                beforeEach(() => {
                    subject.setProps({requestStatus: RequestStatus.SHOULD_BE_MADE})
                });

                it('should NOT make the request', function () {
                    const mockMakeRequest = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        makeRequest: mockMakeRequest
                    });

                    expect(mockMakeRequest).not.toHaveBeenCalled();
                });

                it('should NOT signify that the request is being made', function () {
                    const mockUpdateRequestStatusToInFlight = jest.fn();

                    subject.setProps({
                        requestStatus: RequestStatus.SHOULD_BE_MADE,
                        updateRequestStatusToInFlight: mockUpdateRequestStatusToInFlight
                    });

                    expect(mockUpdateRequestStatusToInFlight).not.toHaveBeenCalled();
                });
            })
        });

        describe("when a request should NOT be made", function () {
            it('should NOT make the request', function () {
                const mockMakeRequest = jest.fn();

                subject.setProps({
                    requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]),
                    makeRequest: mockMakeRequest
                });

                expect(mockMakeRequest).not.toHaveBeenCalled();
            });

            it('should NOT signify that the request is being made', function () {
                const mockUpdateRequestStatusToInFlight = jest.fn();

                subject.setProps({
                    requestStatus: randomChoiceFrom([RequestStatus.IN_FLIGHT, RequestStatus.NOT_IN_FLIGHT]),
                    updateRequestStatusToInFlight: mockUpdateRequestStatusToInFlight
                });

                expect(mockUpdateRequestStatusToInFlight).not.toHaveBeenCalled();
            });
        });
    });
});