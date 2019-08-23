import React from 'react';
import {shallow, ShallowWrapper} from "enzyme";
import {TimeSinceProduction, TimeSinceProductionProps, mapStateToProps} from "./TimeSinceProduction";
import {aNonNegativeNumber, aPositiveNumber} from "../utils/testGenerators/generatePrimitives.test";
import {aState, someTimeSinceProduction} from "../utils/testGenerators/generateDomain.test";
import {
    ApplicationState,
    HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET,
    NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET
} from "../store/reducer";

describe("TimeSinceProduction", function () {
    describe('component', function () {
        let subject: ShallowWrapper<TimeSinceProductionProps>;

        beforeEach(() => {
            subject = shallow(<TimeSinceProduction timeSinceProduction={aNonNegativeNumber()}/>);

        });

        describe('when it has loaded the time since production', function () {
            describe('when it has been at least 24 hours since a production deploy', function () {
                it('should displays the days since the last production deploy', function () {
                    const days = aPositiveNumber() + 1;
                    subject.setProps({timeSinceProduction: days});

                    expect(subject.text()).toContain(`${days} days`);
                });

                it('should display 1 day as singular if it has only been 1 day', function () {
                    subject.setProps({timeSinceProduction: 1});

                    expect(subject.text()).toContain("1 day");
                    expect(subject.text()).not.toContain("days");
                });
            });

            it('should pluralize zero', function () {
                subject.setProps({timeSinceProduction: 0});

                expect(subject.text()).toContain("0 days");
            });
        });

        describe("when it has not yet loaded the time since production", function () {
            it('should not display anything', function () {
                subject.setProps({timeSinceProduction: HAS_NOT_GOTTEN_RESPONSE_FROM_SERVER_YET});
                expect(subject.text()).toEqual("");
            });
        });

        describe("when the server has responded that there has not been a deploy to production", function () {
            it('should display a message that indicates that', function () {
                subject.setProps({timeSinceProduction: NO_PRODUCTION_DEPLOYS_HAVE_HAPPENED_YET});
                expect(subject.text()).toEqual("There has not yet been a deploy to production recorded");
            });
        });
    });

    describe("mapStateToProps", () => {
        it('should read the time since production', function () {
            const time = someTimeSinceProduction();
            const state: ApplicationState = {...aState(), timeSinceProduction: time};
            expect(mapStateToProps(state).timeSinceProduction).toEqual(time);
        });
    });
});
