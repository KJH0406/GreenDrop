import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import classes from "./Root.module.css";
import ScrollToTop from "../components/ScrollToTopComponent";

function RootLayout() {
  return (
    <div className={classes.container}>
      <Header />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
