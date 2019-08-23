import React, {Dispatch} from 'react';
import {connect} from "react-redux";
import {ApplicationAction, reportAProductionDeploy} from "../store/actions";

type Props = {
    reportAProductionDeploy: () => void
}

export class ProductionDeployReporter extends React.Component<Props, {}> {
    render() {
        return <div><button onClick={this.props.reportAProductionDeploy}>Report a production deploy</button></div>
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        reportAProductionDeploy: () => {
            dispatch(reportAProductionDeploy());
        }
    }
};

export default connect(null, mapDispatchToProps)(ProductionDeployReporter);