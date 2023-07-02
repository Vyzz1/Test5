import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RevealAnswer from "../../../components/RevealAnswer";

function JS_ANSWER() {
  const [questions, setQuestions] = useState([]);
  const fectchApi = async () => {
    const response = await fetch("http://localhost:3002/questions/?topicId=3");
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
export default JS_ANSWER;
