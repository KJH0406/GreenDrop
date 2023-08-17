import classes from "./Slider.module.css";
import Slider from "../UI/SliderContent.jsx";

function IntroSlider() {
  return (
    <div className={classes.slider_container}>
      <div className={classes.slider_comment}>
        <div className={classes.slider_comment_title}>
          <p>
            <span style={{ color: "green" }}>환경</span>문제 해결을 위한
          </p>
          <div className={classes.slider_comment_title_sub}>
            <p>다양한 노력</p>
          </div>
        </div>
      </div>
      <div className={classes.slider_section}>
        <Slider />
      </div>
    </div>
  );
}

export default IntroSlider;
