import { combineReducers } from "redux";
import { sign_Up } from "./signUpReducers";
import { submit_reducer } from "./submitReducers";
import { login_logout } from "./login_logout";
const allReducers = combineReducers({
  sign_Up,
  submit_reducer,
  login_logout,

  // Thêm nhiều reducer
});

export default allReducers;
