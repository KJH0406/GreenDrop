import Tumnail from "../components/Intro/Tumnail";
import classes from "./Intro.module.css";

function IntroPage() {
  return (
    <div className={classes.introContainer}>
      <Tumnail />
    </div>
  );
}

export default IntroPage;
