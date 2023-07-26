import Slider from "react-slick";
import classes from "./IntroSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function IntroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={classes.slider_container}>
      <div>
        <Slider {...settings}>
          <div className={classes.slider_item}>
            <div className={classes.slider_item_img}></div>
            <div className={classes.slider_item_title}>
              지구를 지키는 19가지 방법
            </div>
            <div className={classes.slider_item_subtitle}>
              내가 생활속에서 환경을 보호하는 방법
            </div>
          </div>
          <div>
            <h3>2</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default IntroSlider;
