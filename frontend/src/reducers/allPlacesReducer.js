import { FETCH_PLACES_FAIL, FETCH_PLACES_REQUEST, FETCH_PLACES_SUCCESS } from "../constants/allPlacesConstants";
import { CLEAR_ERRORS } from "../constants/attractionConstants";

export const allPlaceReducer = (state = { data: [] } ,action) => {
    switch (action.type) {
        case FETCH_PLACES_REQUEST:
            return {
                loading: true,
                data: []
            };
        case FETCH_PLACES_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            };
        case FETCH_PLACES_FAIL:
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