import { Outlet, Navigate } from "react-router-dom";
import AdminHeader from "../components/AdminPage/AdminHeader";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;

  if (!isLoggedIn) {
    alert("관리자 로그인이 필요한 기능입니다.");
  }

  return isLoggedIn ? (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
