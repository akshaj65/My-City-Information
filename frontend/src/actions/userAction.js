import axios from "axios";
import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userConstatnts";
import MyAlert from "../utils/MyAlert";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/signin`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    MyAlert('Signed in successfully', false, 'success')

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    MyAlert(error.response.data.message, true, 'error')
  }
};

// Register
export const register = (name, email, password) => async (dispatch) => {
  try {

    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/register`, { name, email, password }, config);
    // console.log(data);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    MyAlert('Registration Successful', true, 'success')
  } catch (error) {
    // alert(error.response.data.message)
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
    MyAlert(error.response.data.message, true, 'error')
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};