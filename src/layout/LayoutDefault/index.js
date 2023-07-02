import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefault.css";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function LayoutDefault() {
  const handleDelete = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const handleLogout = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Bạn có muốn đăng xuất không ?",
        // icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ok !",
        cancelButtonText: "HỦY !",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return;
        }
      });
  };

  const token = getCookie("token");
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to="/">Logo</Link>
        </div>
        <ul className="header__menu">
          <li>
            <NavLink to="/">Trang chủ</NavLink>
          </li>
          {!token ? (
            <>
              <li>
                <NavLink to="/login">Đăng nhập</NavLink>
              </li>
              <li>
                <NavLink to="/register">Đăng kí</NavLink>
              </li>
            </>
          ) : token ? (
            <>
              <li>
                <NavLink to="/quizz">Chọn chủ đề</NavLink>
              </li>
              <li>
                <NavLink to="/history">Lịch sử làm bài</NavLink>
              </li>
              <li>
                <button className="log_out_button " onClick={handleLogout}>
                  {" "}
                  Đăng xuất{" "}
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">Copyright @ 2023</footer>
    </>
  );
}

export default LayoutDefault;
