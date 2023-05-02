import * as types from "../constants/allPlacesConstants";
import { getAttraction } from "./attractionAction";
import axios from 'axios';

export const fetchPlacesRequest = () => ({
  type: types.FETCH_PLACES_REQUEST
});

export const fetchPlacesSuccess = (places) => ({
  type: types.FETCH_PLACES_SUCCESS,
  payload: places
});

export const fetchPlacesFailure = (error) => ({
  type: types.FETCH_PLACES_FAIL,
  payload: error,
});

export const fetchPlaces = (category, city) => {
  return (dispatch) => {
    dispatch(fetchPlacesRequest());
    axios
      .get(`/api/v1/city/${city}/${category.toLowerCase()}`)
      .then((response) => {
        const places = response.data.data.results;
        dispatch(fetchPlacesSuccess(places));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchPlacesFailure(errorMessage));
      });
  };
};