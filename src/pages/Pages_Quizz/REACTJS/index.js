import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DrawQuestion from "../../../components/DrawQuestions";
import submit_anwser from "../../../action/submit_anwser";

function REACTJS() {
  const users_id = useSelector((state) => state.login_logout);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const fectchApi = async () => {
    const response = await fetch("http://localhost:3002/questions/?topicId=4");
    const result = await response.json();
    if (result) {
      setQuestions(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAnswers = [];
    for (let i = 1; i <= 20; i++) {
      const answer = e.target.elements[`answer_${i}`].value;
      selectedAnswers.push(parseInt(answer));
    }
    const correctAnswers = [];
    questions.forEach((value) => {
      correctAnswers.push(value.correctAnswer);
    });
    let count = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (correctAnswers[i] === selectedAnswers[i]) {
        count++;
      }
    }
    let body = {
      info: users_id.info,
      SelectedAnswers: selectedAnswers,
      Count: count,
      User_id: users_id.info.id,
      Date: Date.now(),
      Topic: "REACTJS",
    };
    const history = localStorage.getItem("history");
    let arr = [];
    if (history) {
      arr = JSON.parse(history);
    }
    arr.push(body);
    localStorage.setItem("history", JSON.stringify(arr));
    dispatch(submit_anwser(selectedAnswers, count));
    navigate("/quizz/reactjs/reveal");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DrawQuestion questions={questions} />
        <div className="button__submit">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </>
  );
}
export default REACTJS;
