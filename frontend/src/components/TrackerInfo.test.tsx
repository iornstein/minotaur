import React from 'react';

import {shallow} from "enzyme";
import {mapStateToProps, TrackerInfo} from "./TrackerInfo";
import {aState, someTrackerAnalytics} from "../utils/testGenerators/generateDomain.test";
import {UNKNOWN_VALUE} from "../store/reducer";

describe('TrackerInfo', function () {
    describe('component', function () {
        describe('when there is tracker data available', function () {
            it('should display all the tracker data', function () {
                const analytics = someTrackerAnalytics();
                const subject = shallow(<TrackerInfo analytics={analytics}/>);

                expect(subject.text()).toContain(analytics.projectName);
                expect(subject.text()).toContain(analytics.velocity);
                expect(subject.text()).toContain(analytics.volatility);
            });
        });

        describe('when the data from tracker is NOT available', function () {
            const subject = shallow(<TrackerInfo analytics={UNKNOWN_VALUE}/>);

            expect(subject.text()).toContain("... data from tracker is not loaded yet");
        });
    });

    describe('mapStateToProps', function () {
        it('should allow the component to read the tracker analytics', function () {
            const state = aState();
            expect(mapStateToProps(state).analytics).toEqual(state.trackerAnalytics)
        });
    });
});