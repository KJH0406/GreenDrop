import classes from "./GreenStory.module.css"
import Slider from "../components/UI/SliderContent.jsx";

function GreenStoryPage() {
  return (
    <div className={classes.regist_box}>
      <div className={classes.title_box}>
        <div className={classes.title}>
          <h2 className={classes.first_word}>그린 &nbsp;</h2>
          <h2 className={classes.second_word}>스토리</h2>
        </div>
        <div className={classes.content}>환경을 지키는 다양한 이야기</div>
      </div>
      <div className={classes.slider_section}>
        <Slider />
      </div>
    </div>
  );
}

export default GreenStoryPage;
