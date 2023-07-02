import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  // const token = "BSHH349FSD89FWE4";
  const token = null;

  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}

export default PrivateRoutes;