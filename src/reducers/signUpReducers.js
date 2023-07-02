import RandomString from "../RandomString";
import { post } from "../utils/request";

export const sign_Up = (state = [], action) => {
  switch (action.type) {
    case "SIGN_UP":
      let body = {
        fullName: action.fullname,
        email: action.email,
        password: action.password,
        token: RandomString(20),
      };
      post("users", body);
      return null;
    default:
      return state;
  }
};
