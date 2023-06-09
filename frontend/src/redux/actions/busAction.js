import axios from "axios";
import { BUS_FAIL, BUS_REQUEST, BUS_SUCCESS, CLEAR_ERRORS } from "../constants/busConstants";
import { API_URL } from '../../config/env';



export const getBuses = (srcStn,destStn) => async (dispatch) => {
    try {
        dispatch({ type: BUS_REQUEST });
        const {data}= await axios.get(`${API_URL}/api/v1/buses?srcStn=${srcStn}&destStn=${destStn}`)
        dispatch({
            type:BUS_SUCCESS,
            payload:data.data,
        })
    } catch (error) {
        dispatch({
            type: BUS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };