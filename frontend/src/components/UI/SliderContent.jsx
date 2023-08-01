import classes from "./SliderContent.module.css"
import Slider from "react-slick";

function SliderContent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
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
        <div className={classes.slider_item}>
          <h3>2</h3>
        </div>
      </Slider>
    </div>
  );
}

export default SliderContent;