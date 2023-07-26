import Thumbnail from "../components/Intro/Thumbnail";
import ServiceIntroChat from "../components/Intro/ServiceIntroChat";
import classes from "./Intro.module.css";
import IntroSlider from "../components/Intro/IntroSlider";

function IntroPage() {
  return (
    <div className={classes.introContainer}>
      <Thumbnail />
      <ServiceIntroChat />
      <IntroSlider />
      <div style={{ height: "400px" }}></div>
    </div>
  );
}

export default IntroPage;
