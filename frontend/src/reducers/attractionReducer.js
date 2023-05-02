import {
    ALL_ATTRACTION_FAIL,
    ALL_ATTRACTION_REQUEST,
    ALL_ATTRACTION_SUCCESS,
    CLEAR_ERRORS
} from '../constants/attractionConstants'


export const attractionReducer = (state = { attractions: [] }, action) => {
    switch (action.type) {
        case ALL_ATTRACTION_REQUEST:
            return {
                loading: true,
                attraction: []
            };
        case ALL_ATTRACTION_SUCCESS:
            return {
                loading: false,
                attraction: action.payload.attractions
            };
        case ALL_ATTRACTION_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}