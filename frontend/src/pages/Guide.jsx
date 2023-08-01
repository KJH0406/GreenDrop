import classes from './Guide.module.css';
import Slider from "react-slick";
import classNames from "classnames/bind";

const cn = classNames.bind(classes);

function GuidePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.guide_box}>
      <div className={classes.title_box}>
        <div className={classes.title}>
          <h2 className={classes.first_word}>올바른 &nbsp;</h2>
          <h2 className={classes.second_word}>분리배출 &nbsp;</h2>
          <h2 className={classes.third_word}>가이드</h2>
        </div>
        <div className={classes.content}>환경을 위한 분리배출 어떻게 하고 계신가요?</div>
        <div className={classes.content}>분리배출을 어떻게 해야하는지 헷갈리신 적은 없으신가요?</div>
        <div className={classes.content}>분리배출 방법에 대해 꼼꼼히 알려드리도록 하겠습니다.</div>
      </div>
      <div className={classes.slider_section}>
        <Slider {...settings}>
        <div className={classes.slider_item}>
          <div className={cn(`slider_item_img1`, `slider_item_img`)}></div>
        </div>
        <div className={classes.slider_item}>
          <div className={cn(`slider_item_img2`, `slider_item_img`)}></div>
        </div>
        <div className={classes.slider_item}>
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
        </div>
        <div className={classes.slider_item}>
          <div className={cn(`slider_item_img4`, `slider_item_img`)}></div>
        </div>
        <div className={classes.slider_item}>
          <div className={cn(`slider_item_img5`, `slider_item_img`)}></div>
        </div>
      </Slider>
      </div>
    </div>
  );
}

export default GuidePage;
