import { Answer_Reveal } from "../../Answer_Reveal";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router";
import { getCookie } from "../../GetCookie";
import { FcCheckmark } from "react-icons/fc";
import Swal from "sweetalert2";
function RevealAnswer(props) {
  const navigate = useNavigate();
  const { answers, questions } = props;

  if (!getCookie("token")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2300);
  }
  const handleRestart = () => {
    navigate("/quizz");
  };
  let check = [];
  let selected = [];

  if (answers.length > 0) {
    selected = answers[answers.length - 1].selectedAnswers;
    check = Answer_Reveal(questions, answers);
  }
  const error_styles = {
    textAlign: "center",
    fontSize: "20px",
    color: "#847e7e80",
    fontWeight: "650",
  };

  return (
    <>
      {answers.length ? (
        <>
          <div className="box-header">
            <div className="title"> ĐÁP ÁN</div>
            <div className="description">
              <div> Số câu đúng : {answers[answers.length - 1].count} </div>
              <div>
                Số câu sai :{" "}
                {answers[0].selectedAnswers.length -
                  answers[answers.length - 1].count}{" "}
              </div>
              <div>
                {" "}
                Phần trăm đúng :
                {(answers[answers.length - 1].count /
                  answers[answers.length - 1].selectedAnswers.length) *
                  100}{" "}
                %{" "}
              </div>
            </div>
          </div>
          <form>
            {questions.map((value, index) => (
              <div key={value.id} className="question">
                <div className="question__text">
                  <h3>
                    {index + 1}.{value.question}
                  </h3>
                </div>
                <div className="question__answer">
                  <input
                    type="radio"
                    name={`answer_${index + 1}`}
                    value={0}
                    defaultChecked={value.correctAnswer === 0}
                    disabled
                  />
                  <span className="answer__choice">
                    {" "}
                    A . {value.answers[0]}{" "}
                  </span>
                  {check[index] === false && selected[index] === 0 && (
                    <TfiClose color="red" />
                  )}
                  {check[index] === true && selected[index] === 0 && (
                    <FcCheckmark color="red" />
                  )}
                </div>
                <div className="question__answer">
                  <input
                    type="radio"
                    name={`answer_${index + 1}`}
                    value={1}
                    defaultChecked={value.correctAnswer === 1}
                    disabled
                  />
                  <span className="answer__choice">
                    {" "}
                    B . {value.answers[1]}{" "}
                  </span>
                  {check[index] === false && selected[index] === 1 && (
                    <TfiClose color="red" />
                  )}
                  {check[index] === true && selected[index] === 1 && (
                    <FcCheckmark color="red" />
                  )}
                </div>
                {value.answers.length > 2 && (
                  <div className="question__answer">
                    <input
                      type="radio"
                      name={`answer_${index + 1}`}
                      value={2}
                      defaultChecked={value.correctAnswer === 2}
                      disabled
                    />
                    <span className="answer__choice">
                      {" "}
                      C. {value.answers[2]}
                    </span>
                    {check[index] === false && selected[index] === 2 && (
                      <TfiClose color="red"> {index} </TfiClose>
                    )}
                    {check[index] === true && selected[index] === 2 && (
                      <FcCheckmark color="red" />
                    )}
                  </div>
                )}
                {value.answers.length > 3 && (
                  <div className="question__answer">
                    <input
                      type="radio"
                      name={`answer_${index + 1}`}
                      value={2}
                      defaultChecked={value.correctAnswer === 3}
                      disabled
                    />
                    <span className="answer__choice">
                      {" "}
                      D. {value.answers[3]}
                    </span>
                    {check[index] === false && selected[index] === 3 && (
                      <span>
                        {" "}
                        <TfiClose color="red" />{" "}
                      </span>
                    )}
                    {check[index] === true && selected[index] === 3 && (
                      <FcCheckmark color="red" />
                    )}
                  </div>
                )}
              </div>
            ))}
            {answers[0].button !== "None" && (
              <div className="button__submit">
                <button onClick={handleRestart}> Làm lại </button>
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          <div className="error" style={error_styles}>
            Không có dữ liệu
          </div>
        </>
      )}
    </>
  );
}
export default RevealAnswer;
