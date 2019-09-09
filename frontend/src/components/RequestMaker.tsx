import {RequestStatus} from "../store/reducer";
import React from "react";

export type UpdatingProps = {
    requestStatus: RequestStatus,
    makeRequest: () => void,
    updateRequestStatusToInFlight: () => void,
}

export class RequestMaker extends React.Component<UpdatingProps, {}> {

    componentDidUpdate(previousProps: Readonly<UpdatingProps>): void {
        if (this.props.requestStatus === RequestStatus.SHOULD_BE_MADE && previousProps.requestStatus !== RequestStatus.SHOULD_BE_MADE) {
            this.props.makeRequest();
            this.props.updateRequestStatusToInFlight();
        }
    }

    render() {
        return <></>
    }
}