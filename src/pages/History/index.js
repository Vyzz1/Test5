import "./History.css";
import { Link, useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/request";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2";

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
  var infoCookie = getCookie("info");
  var infoObject = JSON.parse(infoCookie);
  const data = JSON.parse(localStorage.getItem("history"));
  function countTopic(array, topic) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].Topic === topic) {
        count++;
      }
    }
    return count;
  }
  let user_history = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].User_id === infoObject.id) {
      user_history.push(data[i]);
    }
  }

  const error_styles = {
    textAlign: "center",
    fontSize: "20px",
    color: "#847e7e80",
    fontWeight: "650",
  };
  // console.log(user_history);
  return (
    <>
      {user_history.length > 0 ? (
        <>
          <div className="box-header">
            <div className="title"> LỊCH SỬ LÀM BÀI</div>
            <div className="description">
              <div>
                {" "}
                Tên: {user_history[user_history.length - 1].info.fullName}{" "}
              </div>
              <div>
                {" "}
                Email: {user_history[user_history.length - 1].info.email}
              </div>
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
              </tr>
              {user_history.map((value, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {value.Topic} </td>
                    <td>
                      {value.Count} / {value.SelectedAnswers.length}
                    </td>
                    <td>
                      <Link to={"/history/" + value.Date}> Link </Link>
                    </td>
                    <td> {formatDateTime(value.Date)} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="thongke">
            Số lượt làm bài
            <div className="description_thongke">
              HTML5: {countTopic(user_history, "HTML5")}
            </div>
            CSS3: {countTopic(user_history, "CSS3")}
            <div className="description_thongke">
              JAVASCRIPT: {countTopic(user_history, "JAVASCRIPT")}
            </div>
            REACTJS: {countTopic(user_history, "REACTJS")}
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
