import { useEffect, useState, useCallback } from "react";
import "./Topics.css";
import { useNavigate } from "react-router";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2";

function Topics() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (e) => {
      navigate(`/quizz/${e.toLowerCase()}`);
    },
    [navigate]
  );
  const [categoryResult, setCategory] = useState([]);
  const fectchApi = async () => {
    const response = await fetch("https://json-demo-sigma.vercel.app/topics");
    const result = await response.json();
    if (getCookie("token")) {
      setCategory(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);

  if (!getCookie("token")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2500);
  }

  return (
    <>
      <h1 className="title"> CHỌN CHỦ ĐỀ</h1>
      <div className="button">
        {categoryResult.map((value) => (
          <button
            key={value.id}
            className="button-49"
            onClick={() => handleOnClick(value.name)}
          >
            {value.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Topics;
