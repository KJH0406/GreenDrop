import classes from "./SliderContent.module.css";
import Slider from "react-slick";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cn = classNames.bind(classes);

function SliderContent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 1000,
  };

  return (
    <div>
      <Slider {...settings} className={classes.slider}>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "https://www.hdec.kr/kr/newsroom/news_view.aspx?NewsSeq=240&NewsType=FUTURE&NewsListType=news_clist";
          }}
        >
          <div className={cn(`slider_item_img1`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              지구를 지키는 19가지 방법
            </div>
          </div>
        </div>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "http://www.hkbs.co.kr/news/articleView.html?idxno=709455";
          }}
        >
          <div className={cn(`slider_item_img2`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              이것만 알아두세요! <br />
              분리배출 상식
            </div>
          </div>
        </div>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "http://www.saegeoje.com/news/articleView.html?idxno=223332";
          }}
        >
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              잘 버리면 다시 쓴다 <br /> ‘재활용품 분리배출!’
            </div>
          </div>
        </div>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "https://www.hkbs.co.kr/news/articleView.html?idxno=723833";
          }}
        >
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              폐플라스틱이 옷걸이‧쇼핑백으로
            </div>
          </div>
        </div>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "http://m.dongascience.com/news.php?idx=58895";
          }}
        >
          <div className={cn(`slider_item_img4`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              "전세계 바다에 떠다니는
              <br /> 미세플라스틱 무려 230만톤"
            </div>
            <div className={classes.slider_item_subtitle}></div>
          </div>
        </div>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "http://www.jbnews.com/news/articleView.html?idxno=1397269";
          }}
        >
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              플라스틱 오염을 퇴치하려면
            </div>
            <div className={classes.slider_item_subtitle}></div>
          </div>
        </div>
        <div
          className={classes.slider_item}
          onClick={() => {
            window.location.href =
              "http://www.lifein.news/news/articleView.html?idxno=4890";
          }}
        >
          <div className={cn(`slider_item_img5`, `slider_item_img`)}></div>
          <div className={classes.text_section}>
            <div className={classes.slider_item_title}>
              플라스틱 문제 누가 해결하고 있을까?
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SliderContent;
