import axios from "axios";
import { TRAIN_FAIL, TRAIN_REQUEST, TRAIN_SUCCESS, CLEAR_ERRORS } from "../constants/trainConstants";
import { API_URL } from '../../config/env';



export const getTrains = (stnStn) => async (dispatch) => {
    try {
        dispatch({ type: TRAIN_REQUEST });
        const {data}= await axios.get(`${API_URL}/api/v1/trains?stationCode=${stnStn}`)
        dispatch({
            type:TRAIN_SUCCESS,
            payload:data.data,
        })
    } catch (error) {
        dispatch({
            type: TRAIN_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };