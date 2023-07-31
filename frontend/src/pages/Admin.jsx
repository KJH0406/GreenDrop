import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminPage/AdminHeader";

function AdminPage() {
  return (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
