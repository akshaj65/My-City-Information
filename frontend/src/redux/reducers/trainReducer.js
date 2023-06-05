import { TRAIN_FAIL, TRAIN_REQUEST, TRAIN_SUCCESS, CLEAR_ERRORS } from "../constants/trainConstants";

export const trainReducer = (state = { trains: [] }, action) => {
    switch (action.type) {
        case TRAIN_REQUEST:
            return {
                loading: true,
                trains: []
            };
        case TRAIN_SUCCESS:
            return {
                loading: false,
                trains: action.payload
            };
        case TRAIN_FAIL:
            return {
                loading: false,
                trains: [],
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