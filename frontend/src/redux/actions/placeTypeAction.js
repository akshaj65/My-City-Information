import { SET_PLACE_TYPE } from '../constants/placeTypeConstatnts'


export const setPlaceType = (placeType) =>(dispatch)=> {
    dispatch({
        type: SET_PLACE_TYPE,
        payload: placeType,
    });
}