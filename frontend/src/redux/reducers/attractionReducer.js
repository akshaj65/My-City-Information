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
                attractionLoading: true,
                attraction: []
            };
        case ALL_ATTRACTION_SUCCESS:
            return {
                attractionLoading: false,
                attraction: action.payload.attractions
            };
        case ALL_ATTRACTION_FAIL:
            return {
                attractionLoading: false,
                attractionError: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                attractionError: null,
            };
        default:
            return state;
    }
}