import "./History.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/request";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { history_answers } from "../../action/post_answers";
import { useDispatch } from "react-redux";

function History() {
  const navigate = useNavigate();
  const current_user_token = getCookie("token");
  if (!current_user_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2300);
  }
  const dispatch = useDispatch();

  function countTopic(array, topic) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].Topic === topic) {
        count++;
      }
    }
    return count;
  }

  const handleOnClick = (topic, date) => {
    let topicNum;
    switch (topic) {
      case "HTML5":
        topicNum = 1;
        break;
      case "CSS3":
        topicNum = 2;
        break;
      case "JAVASCRIPT":
        topicNum = 3;
        break;
      case "REACTJS":
        topicNum = 4;
        break;
      default:
        break;
    }
    dispatch(history_answers(topicNum));
    navigate("/history/" + date);
  };
  const error_styles = {
    textAlign: "center",
    fontSize: "20px",
    color: "#847e7e80",
    fontWeight: "650",
  };
  const current_info = JSON.parse(getCookie("info"));

  const [data, setData] = useState([]);
  const fetchApi = () => {
    fetch(`https://api-quizz-one.vercel.app/history?user_id=${current_info.id}`)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setData(result);
        }
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const handleTakingQuizz = (topic) => {
    let temp = topic.toLowerCase();
    console.log(temp);
    navigate(`/quizz/${temp}`);
  };
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="box-header">
            <div className="title"> LỊCH SỬ LÀM BÀI</div>
            <div className="description">
              <div> Tên: {current_info.fullName} </div>
              <div> Email: {current_info.email}</div>
            </div>
          </div>
          <table align="center">
            <tbody>
              <tr>
                <td> STT </td>
                <td> Chủ đề </td>
                <td> Kết quả </td>
                <td> Chi tiết </td>
                <td> Thời gian </td>
                <td> Làm lại </td>
              </tr>
              {data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {value.Topic} </td>
                    <td>
                      {value.count} / {value.answers.length}
                    </td>
                    <td>
                      <button
                        onClick={() => handleOnClick(value.Topic, value.Date)}
                      >
                        {" "}
                        Link{" "}
                      </button>
                    </td>
                    <td> {formatDateTime(value.Date)} </td>
                    <td>
                      {" "}
                      <button onClick={() => handleTakingQuizz(value.Topic)}>
                        {" "}
                        Làm lại{" "}
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="thongke">
            Số lượt làm bài
            <div className="description_thongke">
              HTML5: {countTopic(data, "HTML5")}
            </div>
            CSS3: {countTopic(data, "CSS3")}
            <div className="description_thongke">
              JAVASCRIPT: {countTopic(data, "JAVASCRIPT")}
            </div>
            REACTJS: {countTopic(data, "REACTJS")}
          </div>
        </>
      ) : (
        <>
          <div style={error_styles}> Không có dữ liệu </div>
        </>
      )}
    </>
  );
}
export default History;
