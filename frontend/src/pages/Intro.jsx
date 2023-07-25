import Thumbnail from "../components/Intro/Thumbnail";
import classes from "./Intro.module.css";

function IntroPage() {
  return (
    <div className={classes.introContainer}>
      <Thumbnail />
    </div>
  );
}

export default IntroPage;
