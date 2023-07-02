import { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCookie } from "../../SetCookie";
import { params } from "../../SetCookie";
import Swal from "sweetalert2";
import { getCookie } from "../../GetCookie";
import { loginSuccess } from "../../action/login_logout";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const fectchApi = async () => {
    const response = await fetch("http://localhost:3002/users");
    const result = await response.json();
    if (result) {
      setData(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  function handleReload() {
    fectchApi();
  }
  params.seconds = 10;

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  let found = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    if (email.length > 0 && password.length > 0) {
      data.forEach((value) => {
        if (value.email === email && value.password === password) {
          setCookie("token", value.token, 1000, params.seconds);
          setCookie("info", JSON.stringify(value), 1000, 1000);
          const token = getCookie("token");
          dispatch(loginSuccess(token, value));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => {
            handleReload();
            navigate("/quizz");
          }, 1100);
          found = true;
        }
      });
      if (!found) {
        setError("Tên đăng nhập hoặc mật khẩu sai");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
      }
    } else {
      setError("Vui lòng nhập thông tin");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form__login">
        <h2> ĐĂNG NHẬP </h2>
        <input
          type="text"
          placeholder="Username"
          className="username"
          name="email"
        />
        <input
          type="password"
          placeholder="Password "
          className="password"
          name="password"
        />
        <button type="submit"> Đăng nhập </button>
      </form>
      {showError && (
        <div
          className="error-message"
          style={{ textAlign: "center", color: "red" }}
        >
          {error}
        </div>
      )}
    </>
  );
}

export default Login;
