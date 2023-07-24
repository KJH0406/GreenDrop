import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import classes from "./Root.module.css";

function RootLayout() {
  return (
    <div className={classes.container}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
