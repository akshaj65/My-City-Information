import { CITY_FAIL, CITY_REQUEST, CITY_SUCCESS, CLEAR_ERRORS } from "../constants/cityConstants";

export const cityReducer = (state = { city: [] }, action) => {
    switch (action.type) {
        case CITY_REQUEST:
            return {
                loading: true,
                city: []
            };
        case CITY_SUCCESS:
            return {
                loading: false,
                city: action.payload
            };
        case CITY_FAIL:
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