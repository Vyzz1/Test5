import { useState, useEffect } from "react";
import DrawQuestion from "../../../components/DrawQuestions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import submit_anwser from "../../../action/submit_anwser";
import { post_answers } from "../../../action/post_answers";
function CSS_PAGE() {
  const users_id = useSelector((state) => state.login_logout);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const fectchApi = async () => {
    const response = await fetch(
      "https://api-quizz-one.vercel.app/questions?topicId=2"
    );
    const result = await response.json();
    if (result) {
      setQuestions(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  const dispatch = useDispatch();

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
      user_id: users_id.info.id,
      Topic: "CSS3",
      answers: selectedAnswers,
      count: count,
      Date: Date.now(),
    };
    dispatch(post_answers(body));
    dispatch(submit_anwser(selectedAnswers, count));
    navigate("/quizz/css3/reveal");
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
export default CSS_PAGE;
