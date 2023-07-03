import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./HTML5_ANSWER.scss";
import RevealAnswer from "../../../components/RevealAnswer";

function HTML5_ANSWERS() {
  const [questions, setQuestions] = useState([]);
  const fectchApi = async () => {
    const response = await fetch(
      "https://api-quizz-one.vercel.app/questions?topicId=1"
    );
    const result = await response.json();
    if (result) {
      setQuestions(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  const answers = useSelector((state) => state.submit_reducer);

  return (
    <>
      <RevealAnswer answers={answers} questions={questions} />
    </>
  );
}
export default HTML5_ANSWERS;
