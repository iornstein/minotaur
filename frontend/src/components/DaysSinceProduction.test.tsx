import React from 'react';
import {shallow, ShallowWrapper} from "enzyme";
import {
    DaysSinceProduction,
    DaysSinceProductionProps,
    mapDispatchToProps,
    mapStateToProps
} from "./DaysSinceProduction";
import {aNonNegativeNumber, aPositiveNumber} from "../utils/testGenerators/generatePrimitives.test";
import {requestDaysSinceLastProductionDeployAction} from "../store/actions";

describe("DaysSinceProduction", function () {
    describe('component', function () {
        let subject: ShallowWrapper<DaysSinceProductionProps>;

        beforeEach(() => {
            subject = shallow(<DaysSinceProduction days={aNonNegativeNumber()} getDaysSinceLastProductionDeploy={jest.fn()}/>);

        });

        it('should request the days since production when it loads', function () {
            const mockDaysSinceLastProductionDeploy = jest.fn();
            const subject = shallow(<DaysSinceProduction days={aNonNegativeNumber()}
                                                         getDaysSinceLastProductionDeploy={mockDaysSinceLastProductionDeploy}/>);

            subject.update();

            expect(mockDaysSinceLastProductionDeploy).toHaveBeenCalled();
        });

        describe('when it has loaded the days since production', function () {
            it('should displays the days since the last production deploy', function () {
                const days = aPositiveNumber() + 1;
                subject.setProps({days: days});

                expect(subject.text()).toContain(`${days} days`);
            });

            it('should display 1 day as singular if it has only been 1 day', function () {
                subject.setProps({days: 1});

                expect(subject.text()).toContain("1 day");
                expect(subject.text()).not.toContain("days");
            });

            it('should pluralize zero', function () {
                subject.setProps({days: 0});

                expect(subject.text()).toContain("0 days");
            });
        });

        describe("when it has not yet loaded the days since production", function () {
            it('should not display anything', function () {
                subject.setProps({days: null});
                expect(subject.text()).toEqual("");
            });
        });
    });

    describe("mapStateToProps", () => {
        it('should read the days since production', function () {
            const days = aPositiveNumber();
            expect(mapStateToProps({daysSinceProduction: days}).days).toEqual(days);
        });
    });

    describe("mapDispatchToProps", () => {
        it('should allow the component to load the days since last production deploy', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).getDaysSinceLastProductionDeploy();
            expect(mockDispatch).toHaveBeenCalledWith(requestDaysSinceLastProductionDeployAction());
        });
    });
});
