import { formatDateTime } from "../utils/request";
import { post } from "../utils/request";
export const submit_reducer = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case "SUBMIT":
      let body = {
        "users-id": action.id,
        topic: action.topic,
        date: formatDateTime(action.date),
        count: action.count,
        answer: action.answer,
      };
      post("history", body);
      return [
        ...newState,
        {
          count: action.count,
          selectedAnswers: action.answer,
        },
      ];
    default:
      return state;
  }
};
