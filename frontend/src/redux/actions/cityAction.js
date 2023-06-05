import axios from "axios";
import { CITY_FAIL, CITY_REQUEST, CITY_SUCCESS, CLEAR_ERRORS } from "../constants/cityConstants";
import { API_URL } from '../../config/env';



export const getCity = (city) => async (dispatch) => {
    try {
        dispatch({ type: CITY_REQUEST });
        const {data}= await axios.get(`${API_URL}/api/v1/city/${city}`)
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