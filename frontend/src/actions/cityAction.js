import axios from "axios";
import { CITY_FAIL, CITY_REQUEST, CITY_SUCCESS, CLEAR_ERRORS } from "../constants/cityConstants";



export const getCity = (city) => async (dispatch) => {
    try {
        dispatch({ type: CITY_REQUEST });
        const {data}= await axios.get(`/api/v1/city/${city}`)
        dispatch({
            type:CITY_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type: CITY_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };