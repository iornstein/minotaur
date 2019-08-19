import React from 'react';
import {shallow} from "enzyme";
import {DaysSinceProduction, mapStateToProps} from "./DaysSinceProduction";
import {aPositiveNumber} from "../utils/testGenerators/generatePrimitives.test";

describe("DaysSinceProduction", function () {
    describe('component', function () {
        describe('when it has loaded the days since production', function () {
            it('should displays the days since the last production deploy', function () {
                const days = aPositiveNumber() + 1;
                const subject = shallow(<DaysSinceProduction days={days}/>);

                expect(subject.text()).toContain(`${days} days`);
            });

            it('should display 1 day as singular if it has only been 1 day', function () {
                const subject = shallow(<DaysSinceProduction days={1}/>);

                expect(subject.text()).toContain("1 day");
                expect(subject.text()).not.toContain("days");
            });

            it('should pluralize zero', function () {
                const subject = shallow(<DaysSinceProduction days={0}/>);

                expect(subject.text()).toContain("0 days");
            });
        });

        describe("when it has not yet loaded the days since production", function () {
            it('should not display anything', function () {
                const subject = shallow(<DaysSinceProduction days={null}/>);
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
});
