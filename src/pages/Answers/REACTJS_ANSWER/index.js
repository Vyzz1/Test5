import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RevealAnswer from "../../../components/RevealAnswer";
function REACTJS_ANSWER() {
  const [questions, setQuestions] = useState([]);
  const fectchApi = async () => {
    const response = await fetch(
      "https://json-demo-sigma.vercel.app/questions/?topicId=4"
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
export default REACTJS_ANSWER;
