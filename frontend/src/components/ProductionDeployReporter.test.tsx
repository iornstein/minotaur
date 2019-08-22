import React from "react";
import {mapDispatchToProps, ProductionDeployReporter} from "./ProductionDeployReporter";
import {reportAProductionDeploy} from "../store/actions";
import {shallow} from "enzyme";

describe('Production Deploy Reporter', function () {
    describe('component', function () {
        it('should signify a production deploy happened when user clicks the button', function () {
            const reportAProductionDeploy = jest.fn();
            const subject = shallow(<ProductionDeployReporter reportAProductionDeploy={reportAProductionDeploy}/>);

            expect(reportAProductionDeploy).not.toHaveBeenCalled();

            subject.find("button").simulate("click");

            expect(reportAProductionDeploy).toHaveBeenCalled();
        });
    });

    describe('mapDispatchToProps', function () {
        it('should allow component to report a production deploy', function () {
            const mockDispatch = jest.fn();
            mapDispatchToProps(mockDispatch).reportAProductionDeploy();

            expect(mockDispatch).toHaveBeenCalledWith(reportAProductionDeploy())
        });
    });
});