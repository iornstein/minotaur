import React from 'react';
import {shallow, ShallowWrapper} from "enzyme";
import {DaysSinceProduction, DaysSinceProductionProps, mapStateToProps} from "./DaysSinceProduction";
import {aNonNegativeNumber, aPositiveNumber} from "../utils/testGenerators/generatePrimitives.test";
import {aState} from "../utils/testGenerators/generateDomain.test";
import {HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET} from "../store/reducer";

describe("DaysSinceProduction", function () {
    describe('component', function () {
        let subject: ShallowWrapper<DaysSinceProductionProps>;

        beforeEach(() => {
            subject = shallow(<DaysSinceProduction days={aNonNegativeNumber()}/>);

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
                subject.setProps({days: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET});
                expect(subject.text()).toEqual("");
            });
        });

        describe("when the server has responded that there has not been a deploy to production", function () {
            it('should display a message that indicates that', function () {
                subject.setProps({days: null});
                expect(subject.text()).toEqual("There has not yet been a deploy to production recorded");
            });
        });
    });

    describe("mapStateToProps", () => {
        it('should read the days since production', function () {
            const days = aPositiveNumber();
            expect(mapStateToProps({...aState(), daysSinceProduction: days}).days).toEqual(days);
        });
    });
});
