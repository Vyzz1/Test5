export const post_answers = (body) => {
  return {
    type: "Post_Answers",
    body: body,
  };
};
export const history_answers = (topicId) => {
  return {
    type: "History_Answers",
    topicId: topicId,
  };
};
