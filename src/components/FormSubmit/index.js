import { useDispatch, useSelector } from "react-redux";
import DrawQuestion from "../DrawQuestions";
import { useNavigate } from "react-router";
import submit_anwser from "../../action/submit_anwser";
import Swal from "sweetalert2";

function FormSubmit(props) {
  const { questions } = props;
  const dispatch = useDispatch();
  const users_id = useSelector((state) => state.login_logout);
  const navigate = useNavigate();
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
      Topic: "CSS3",
    };
    const history = localStorage.getItem("history");
    let arr = [];
    if (history) {
      arr = JSON.parse(history);
    }
    arr.push(body);
    localStorage.setItem("history", JSON.stringify(arr));
    dispatch(submit_anwser(selectedAnswers, count));
    Swal.fire({
      imageUrl:
        "https://imgflip.com/memetemplate/284413603/John-Cena-are-you-sure-about-that",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    navigate("/quizz/css3/reveal");
  };
  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <DrawQuestion questions={questions} />
          <div className="button__submit">
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </>
    </>
  );
}

export default FormSubmit;
