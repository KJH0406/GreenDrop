import classes from "./Intro.module.css";
import Thumbnail from "../components/Intro/Thumbnail";
import ServiceChat from "../components/Intro/ServiceChat";
import Slider from "../components/Intro/Slider";
import HomeDescription from "../components/Intro/HomeDescription";
import Closing from "../components/Intro/Closing";
import Footer from "../components/Layout/Footer";
// import ToHome from "../components/Intro/ToHome";

function IntroPage() {
  return (
    <div className={classes.introContainer}>
      <Thumbnail />
      <ServiceChat />
      <HomeDescription />
      <Slider />
      <Closing />
      {/* <ToHome /> */}
      <Footer />
    </div>
  );
}

export default IntroPage;
