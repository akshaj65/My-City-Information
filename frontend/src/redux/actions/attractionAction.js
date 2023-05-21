import axios from 'axios';
import {
    ALL_ATTRACTION_FAIL,
    ALL_ATTRACTION_REQUEST,
    ALL_ATTRACTION_SUCCESS,
    CLEAR_ERRORS
} from '../constants/attractionConstants';


// laod attractions

export const getAttraction = (city) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ATTRACTION_REQUEST });
        const {data}= await axios.get(`/api/v1/city/${city}/attractions`)
        dispatch({
            type:ALL_ATTRACTION_SUCCESS,
            payload:data.results,
        })
    } catch (error) {
        dispatch({
            type: ALL_ATTRACTION_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };