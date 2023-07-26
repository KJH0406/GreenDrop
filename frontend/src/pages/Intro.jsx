import classes from "./Intro.module.css";
import Thumbnail from "../components/Intro/Thumbnail";
import ServiceChat from "../components/Intro/ServiceChat";
import Slider from "../components/Intro/Slider";
import HomeDescription from "../components/Intro/HomeDescription";

function IntroPage() {
  return (
    <div className={classes.introContainer}>
      <Thumbnail />
      <ServiceChat />
      <HomeDescription />
      <Slider />
    </div>
  );
}

export default IntroPage;
