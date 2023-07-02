import { useParams } from "react-router";
import RevealAnswer from "../RevealAnswer";
import { useEffect, useState } from "react";

function DetailHistory() {
  const { date } = useParams();
  const historyData = JSON.parse(localStorage.getItem("history"));
  const currentData = historyData.find(
    (value) => parseInt(value.Date) === parseInt(date)
  );
  const [questions, SetQuestions] = useState([]);
  const fectchApi = async (topicNum) => {
    const response = await fetch(
      `https://json-demo-sigma.vercel.app/questions/?topicId=${topicNum}`
    );
    const result = await response.json();
    if (result) {
      return result;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let topicNum;
      switch (currentData.Topic) {
        case "HTML5":
          topicNum = "1";
          break;
        case "CSS3":
          topicNum = "2";
          break;
        case "JAVASCRIPT":
          topicNum = "3";
          break;
        case "REACTJS":
          topicNum = "4";
          break;
        // Thêm các case cho các chủ đề khác
        default:
          topicNum = "";
          break;
      }

      const result = await fectchApi(topicNum);
      SetQuestions(result);
    };

    fetchData();
  }, [currentData.Topic]);
  let body = {
    selectedAnswers: currentData.SelectedAnswers,
    count: currentData.Count,
    button: "None",
  };
  let answers = [body];
  console.log(answers);

  return (
    <>
      <RevealAnswer answers={answers} questions={questions} />
    </>
  );
}
export default DetailHistory;
