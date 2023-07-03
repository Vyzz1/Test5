import { useParams } from "react-router";
import RevealAnswer from "../RevealAnswer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function DetailHistory() {
  const { date } = useParams();
  const [user_data, setUserData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const id = useSelector((state) => state.QuestionsHS);
  const fetchApi2 = () => {
    fetch(`https://api-quizz-one.vercel.app/questions?topicId=${id}`)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setQuestions(result);
        }
      });
  };
  const fetchApi1 = () => {
    fetch(`https://api-quizz-one.vercel.app/history?Date=${date}`)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setUserData(result);
        }
      });
  };
  useEffect(() => {
    fetchApi1();
    fetchApi2();
  }, []);

  let body = {};
  let answers = [];
  if (user_data.length > 0) {
    body = {
      selectedAnswers: user_data[user_data.length - 1].answers,
      count: user_data[user_data.length - 1].count,
      button: "None",
    };
    answers = [body];
  }

  return (
    <>
      {user_data.length > 0 && (
        <RevealAnswer answers={answers} questions={questions} />
      )}
    </>
  );
}
export default DetailHistory;
