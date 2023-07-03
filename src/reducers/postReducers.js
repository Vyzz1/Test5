import { post } from "../utils/request";

export const postReducers = async (state = [], action) => {
  switch (action.type) {
    case "Post_Answers":
      post("history", action.body);
      return null;

    default:
      return state;
  }
};
