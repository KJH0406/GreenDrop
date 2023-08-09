import classes from "./GreenStory.module.css";
import Slider from "../components/UI/SliderContent.jsx";

function GreenStoryPage() {
  return (
    <div className={classes.regist_box}>
      <div className={classes.title_box}>
        <div className={classes.title}>
          <h2 className={classes.first_word}>그린 &nbsp;</h2>
          <h2 className={classes.second_word}>스토리</h2>
        </div>
        <div className={classes.content}>
          그린 스토리는 <strong>환경 문제</strong>에 대한 인식을 높이고
          <br />
          <strong>환경 보호</strong> 및 <strong>지구 생태계를 보전</strong>
          하는데 도움이 되는
          <br /> 유익한 정보를 제공합니다.
        </div>
      </div>
      <div className={classes.slider_section}>
        <Slider />
      </div>
    </div>
  );
}

export default GreenStoryPage;
