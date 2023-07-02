import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getCookie } from "../../GetCookie";

function DrawQuestion(props) {
  const navigate = useNavigate();
  const token = getCookie("token");
  const { questions } = props;
  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2300);
  }
  return (
    <>
      {token &&
        questions.map((value, index) => (
          <div key={value.id} className="question">
            <div className="question__text">
              <h3>
                {index + 1}.{value.question}
              </h3>
            </div>
            <div className="question__answer">
              <input type="radio" name={`answer_${index + 1}`} value={0} />
              <span className="answer__choice"> A . {value.answers[0]} </span>
            </div>
            <div className="question__answer">
              <input type="radio" name={`answer_${index + 1}`} value={1} />
              <span className="answer__choice"> B . {value.answers[1]} </span>
            </div>
            {value.answers.length > 2 && (
              <div className="question__answer">
                <input type="radio" name={`answer_${index + 1}`} value={2} />
                <span className="answer__choice"> C. {value.answers[2]}</span>
              </div>
            )}
            {value.answers.length > 3 && (
              <div className="question__answer">
                <input type="radio" name={`answer_${index + 1}`} value={3} />
                <span className="answer__choice"> D. {value.answers[3]}</span>
              </div>
            )}
          </div>
        ))}
    </>
  );
}
export default DrawQuestion;
