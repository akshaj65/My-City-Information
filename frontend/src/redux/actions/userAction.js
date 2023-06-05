import axios from "axios";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS
} from "../constants/userConstatnts";
import handleServerError from "../../utils/handleServer";

import MyAlert from "../../utils/MyAlert";
import { API_URL } from '../../config/env';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${API_URL}/api/v1/signin`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    MyAlert('Signed in successfully', false, 'success')

  } catch (error) {
    const errorMessage = handleServerError(error);
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    MyAlert(errorMessage, true, 'error')
  }
};

// Register
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_URL}/api/v1/register`, { name, email, password }, config);
    // console.log(data);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    MyAlert('Registration Successful', true, 'success')
  } catch (error) {
    // alert(error.response.data.message)
    const errorMessage = handleServerError(error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: errorMessage,
    });
    MyAlert(errorMessage, true, 'error')
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${API_URL}/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
    MyAlert('Log Out Successfull', false, 'success')
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};