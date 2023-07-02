import { useState, useEffect } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { signUP } from "../../action/signUp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
function SignUp() {
  const [data, setData] = useState([]);
  const fectchApi = async () => {
    const response = await fetch("https://json-demo-sigma.vercel.app/users");
    const result = await response.json();
    if (result) {
      setData(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let fullname = e.target.elements.fullname.value;
    let email = e.target.elements.email.value;
    let password1 = e.target.elements.password1.value;
    let password2 = e.target.elements.password2.value;
    let emailExists = false; // Biến kiểm soát
    data.forEach((value) => {
      if (value.email === email) {
        emailExists = true;
        setError("Email đã tồn tại");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
      }
    });
    if (!emailExists && password1 === password2) {
      dispatch(signUP(fullname, email, password1));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tạo tài khoản thành công",
        text: "Hãy đăng nhập để chứng tỏ là bạn",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        nagivate("/login");
      }, 1800);
    } else if (!emailExists) {
      setError("Mật khẩu không khớp");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form__signup">
        <h1 className="title">Sign Up</h1>
        <input type="text" placeholder="Full Name" name="fullname" />
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Pass Word" name="password1" />
        <input
          type="password"
          placeholder=" Enter Pass Word Again "
          name="password2"
        />
        <button type="reset"> Tạo lại </button>
        <button type="submit"> Tạo tài khoản </button>
      </form>
      {showError && (
        <div style={{ textAlign: "center", color: "red" }}>{error}</div>
      )}
    </>
  );
}

export default SignUp;
