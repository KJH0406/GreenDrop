import classes from "./BalanceGameReason.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BalanceGameReason() {
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
      <div className={classes.down}>
        <div className={classes.down_image}></div>
      </div>
      <div className={classes.balance_game_container}>
        <div className={classes.balance_game_title}>
          <div>
            <span>우리 서비스는</span>&nbsp;
            <span style={{ color: "green" }}>밸런스 게임</span>
            <span>을 통해</span>
          </div>
          <div>
            <span style={{ color: "green" }}>
              넛지 효과<sup>*</sup>
            </span>
            <span>를 불러일으켜</span>
          </div>
          <div>올바른 플라스틱 분리배출을 유도합니다.</div>
        </div>
        <div className={classes.balance_game_explanation}>
          * 넛지 효과 : 강요에 의하지 않고 유연하게 개입함으로써 선택을 유도하는
          방법
        </div>
      </div>
      <div className={classes.slider_section}>
        <Slider {...settings} className={classes.slider}>
          <div className={classes.slider_item}>
            <div
              className={`${classes.slider_item_img1} ${classes.slider_item_img}`}
            ></div>
            <div className={classes.balance_game_item}>
              <span>
                반에 있는 일반 쓰레기통이 아닌 <br /> 카페의{" "}
              </span>
              <span style={{ fontWeight: "bold" }}>분리수거함</span>
              <span>까지 발걸음을 옮기도록 </span>
              <br />
              <span style={{ fontWeight: "bold" }}>밸런스 게임</span>
              <span>이라는 재미 요소를 첨가했어요.</span>
            </div>
          </div>
          <div className={classes.slider_item}>
            <div
              className={`${classes.slider_item_img2} ${classes.slider_item_img}`}
            ></div>
            <div className={classes.balance_game_item}>
              <span>분리수거함 위에 놓여진 </span>
              <span style={{ fontWeight: "bold" }}>QR 코드</span>
              <span>를 통해 </span>
              <br />
              <span>웹 페이지에 접속하여 </span>
              <span style={{ fontWeight: "bold" }}>주제를 등록</span>
              <span>하거나 </span>
              <br />
              <span style={{ fontWeight: "bold" }}>
                다른 사람의 주제에 좋아요
              </span>
              <span>를 누를 수 있어요!</span>
            </div>
          </div>
          <div className={classes.slider_item}>
            <div
              className={`${classes.slider_item_img3} ${classes.slider_item_img}`}
            ></div>
            <div className={classes.balance_game_item}>
              <span>원하는 주제에 하트가 많다면 언젠가 </span>
              <br />
              <span>분리수거함 밸런스 게임의 주제로 </span>
              <br />
              <span>선택될 지도 몰라요!</span>
            </div>
          </div>
          <div className={classes.slider_item}>
            <div
              className={`${classes.slider_item_img4} ${classes.slider_item_img}`}
            ></div>
            <div className={classes.balance_game_item}>
              <span>저희 프로젝트를 계기로 분리배출에 대한</span>
              <br />
              <span>생각을 재고하고 올바른 분리배출 문화가 </span>
              <br />
              <span>정착하길 기대하고 있어요!</span>
            </div>
          </div>
        </Slider>
      </div>
      {/* <div className={classes.balance_game_container}>
        <div className={classes.balance_game_title}>
          <div>
            <span>우리 서비스는</span>&nbsp;
            <span style={{ color: "green" }}>밸런스 게임</span>
            <span>을 통해</span>
          </div>
          <div>
            <span style={{ color: "green" }}>
              넛지 효과<sup>*</sup>
            </span>
            <span>를 불러일으켜</span>
          </div>
          <div>올바른 플라스틱 분리배출을 유도합니다.</div>
        </div>
        <div className={classes.balance_game_explanation}>
          * 넛지 효과 : 강요에 의하지 않고 유연하게 개입함으로써 선택을 유도하는
          방법
        </div>
      </div>
      <div className={classes.balance_game_box}>
        <div className={classes.balance_game_item}>
          <span>
            반에 있는 일반 쓰레기통이 아닌 <br /> 카페에 있는{" "}
          </span>
          <span style={{ fontWeight: "bold" }}>분리수거함</span>
          <span>까지 발걸음을 옮길 수 있도록 </span>
          <br />
          <span style={{ fontWeight: "bold" }}>밸런스 게임</span>
          <span>이라는 재미 요소를 첨가했어요.</span>
        </div>
        <div className={classes.balance_game_item}>
          <span>분리수거함 위에 놓여진 </span>
          <span style={{ fontWeight: "bold" }}>QR 코드</span>
          <span>를 통해 </span>
          <br />
          <span>웹 페이지에 접속하여 주제를 등록하거나 </span>
          <br />
          <span>다른 사람의 주제에 좋아요를 누를 수 있어요!</span>
        </div>
        <div className={classes.balance_game_item}>
          <span>원하는 주제에 하트가 많다면 언젠가 </span>
          <br />
          <span>분리수거함 밸런스 게임의 주제로 선택될 지도 몰라요!</span>
        </div>
        <div className={classes.balance_game_item}>
          <span>
            저희 프로젝트를 계기로 <br /> 분리배출에 대한 생각을 재고하고{" "}
          </span>
          <br />
          <span>앞으로도 자연스레 카페에 있는 분리수거함으로 </span>
          <br />
          <span>분리배출 하길 기대하고 있어요!</span>
        </div>
      </div> */}
    </div>
  );
}

export default BalanceGameReason;
