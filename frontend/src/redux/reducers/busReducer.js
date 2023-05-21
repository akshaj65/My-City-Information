import { BUS_FAIL, BUS_REQUEST, BUS_SUCCESS, CLEAR_ERRORS } from "../constants/busConstants";

export const busReducer = (state = { buses: [] }, action) => {
    switch (action.type) {
        case BUS_REQUEST:
            return {
                loading: true,
                buses: []
            };
        case BUS_SUCCESS:
            return {
                loading: false,
                buses: action.payload
            };
        case BUS_FAIL:
            return {
                loading: false,
                buses: [],
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