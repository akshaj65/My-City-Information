
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./reducers/userReducer";
import { attractionReducer } from "./reducers/attractionReducer";
import placeTypeReducer from "./reducers/placeTypeReducer";
import { allPlaceReducer } from "./reducers/allPlacesReducer";

const reducer=combineReducers({
    user:userReducer,
    attractions: attractionReducer,
    placeType:placeTypeReducer,
    places:allPlaceReducer
});

let initialState={};

const middleware =[thunk];

const store=legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;