import {ApplicationState, RequestStatus} from "../store/reducer";
import {Dispatch} from "react";
import {ApplicationAction, requestTrackerAnalytics, updateStatusForTrackerAnalyticsRequest} from "../store/actions";
import {connect} from "react-redux";
import {RequestMaker} from "./RequestMaker";

export const mapStateToProps = (state: ApplicationState) => {
    return {
        requestStatus: state.trackerAnalyticsRequestStatus
    }
};

export const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => {
    return {
        makeRequest: () => {
            dispatch(requestTrackerAnalytics());
        },
        updateRequestStatusToInFlight: () => {
            dispatch(updateStatusForTrackerAnalyticsRequest(RequestStatus.IN_FLIGHT));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestMaker);