import { SET_PLACE_TYPE } from "../constants/placeTypeConstatnts";

const initialState = {
    placeType: 'Attractions',
};

export const placeTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACE_TYPE:
            return {
                ...state,
                placeType: action.payload,
            };
        default:
            return state;
    }
}

export default placeTypeReducer;