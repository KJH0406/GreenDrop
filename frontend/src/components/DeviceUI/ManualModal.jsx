import classes from "./ManualModal.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ManualModal() {
  // 메뉴얼 모달
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings} className={classes.manual_container}>
      <div className={classes.sliderItem}>
        <div className={classes.item_title}>
          <span style={{ color: "green" }}>Green</span> Drop 이용방법
        </div>
        <div className={classes.item_content}>
          <div className={classes.item_box}>
            <div className={classes.item_circle}></div>
            <div className={classes.item_text}>
              <h1 className={classes.item_text_top}>STEP 1</h1>
              <p className={classes.item_text_bottom}>
                <span className={classes.highlight}>
                  웰 스토리(1층 홀 카페)
                  <br />
                  플라스틱 컵
                </span>
                으로만 <br /> 이용해주세요
              </p>
            </div>
          </div>
          <div className={classes.item_box}>
            <div className={classes.item_circle}></div>
            <div className={classes.item_text}>
              <h1 className={classes.item_text_top}>STEP 2</h1>
              <p className={classes.item_text_bottom}>
                <span className={classes.highlight}>
                  컵홀더, 빨대, 음료(얼음)
                </span>
                을
                <br />
                <span className={classes.highlight}>제거</span>해주세요!
              </p>
            </div>
          </div>
          <div className={classes.item_box}>
            <div className={classes.item_circle}></div>
            <div className={classes.item_text}>
              <h1 className={classes.item_text_top}>STEP 3</h1>
              <p className={classes.item_text_bottom}>
                투표하고 싶은 곳에
                <br />{" "}
                <span className={classes.highlight}>컵을 올려주세요</span>
                <br />
                <span style={{ fontSize: "1.7rem", color: "red" }}>
                  ※ 절대 컵을 눌러넣지 마세요!
                </span>
                <span style={{ fontSize: "1.5rem", color: "red" }}>
                  컵을 올려두면 자동으로 수거됩니다
                </span>
              </p>
            </div>
          </div>
          <div className={classes.item_box}>
            <div className={classes.item_circle}></div>
            <div className={classes.item_text}>
              <h1 className={classes.item_text_top}>STEP 4</h1>
              <p className={classes.item_text_bottom}>
                Green Drop 웹 서비스를 이용해보세요!
                <br />
                <span className={classes.highlight}>
                  모니터 우측 QR 코드 👉
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.sliderItem}>
        <h3 className={classes.item}>2</h3>
      </div>
    </Slider>
  );
}

export default ManualModal;
