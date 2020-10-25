import { useReducer } from "react";

import { userReducer } from "./useReducer";

import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: useReducer,
});
export default rootReducer;
