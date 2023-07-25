import Thumbnail from "../components/Intro/Thumbnail";
import ServiceIntroChat from "../components/Intro/ServiceIntroChat";
import classes from "./Intro.module.css";

function IntroPage() {
  return (
    <div className={classes.introContainer}>
      <Thumbnail />
      <ServiceIntroChat />
    </div>
  );
}

export default IntroPage;
