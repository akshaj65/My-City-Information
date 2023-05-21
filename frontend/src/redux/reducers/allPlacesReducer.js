import { FETCH_PLACES_FAIL, FETCH_PLACES_REQUEST, FETCH_PLACES_SUCCESS } from "../constants/allPlacesConstants";
import { CLEAR_ERRORS } from "../constants/attractionConstants";

export const allPlaceReducer = (state = { data: [] } ,action) => {
    switch (action.type) {
        case FETCH_PLACES_REQUEST:
            return {
                allPlacesLoading: true,
                data: []
            };
        case FETCH_PLACES_SUCCESS:
            return {
                allPlacesLoading: false,
                data: action.payload,
            };
        case FETCH_PLACES_FAIL:
            return {
                allPlacesLoading: false,
                allPlacesError: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                allPlacesError: null,
            };
        default:
            return state;
    }
}