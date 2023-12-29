import { combineReducers } from "redux";
import profile from "./profile/action";
import filter from "./filter/action";
import payload from "./payload/action";

const combinedReducer = combineReducers({
  profile,
  filter,
  payload
});

export default combinedReducer;

export type State = ReturnType<typeof combinedReducer>;