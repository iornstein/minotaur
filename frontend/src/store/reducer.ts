import {ApplicationAction} from "./actions";

export type ApplicationState = {
    daysSinceProduction: number | null;
}

const initialState : ApplicationState = {
    daysSinceProduction: null
};

export const reducer = (state: ApplicationState = initialState, action: ApplicationAction) : ApplicationState => {
    switch(action.type){
        case "RECEIVE_DAYS_SINCE_LAST_PRODUCTION_DEPLOY":
            return {daysSinceProduction: action.days};
        case "REQUEST_DAYS_TO_PRODUCTION":
        case "APPLICATION_ERROR_ACTION_TYPE":
        default:
            return state;
    }
};