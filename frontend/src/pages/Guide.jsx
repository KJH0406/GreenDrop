import { useRef } from "react";
import classes from "./Guide.module.css";
import Slider from "react-slick";
import classNames from "classnames/bind";

const cn = classNames.bind(classes);

function GuidePage() {
  const resultRef = useRef();
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
        <div className={classes.content}>
          분리배출을 어떻게 해야하는지 헷갈리신 적은 없으신가요?
        </div>
        <div className={classes.content}>
          <span style={{ fontWeight: "bold" }}>분리배출 방법</span>
          <span>에 대해 꼼꼼히 알려드리도록 하겠습니다!</span>
        </div>
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
      <div className={classes.down}>
        <div
          className={classes.down_image}
          onClick={() => {
            resultRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        ></div>
      </div>
      <div ref={resultRef} className={classes.detail_content}>
        <div className={classes.detail_title}>분리배출 방법</div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>1. 플라스틱 류</p>
          <div className={classes.detail_item_content}>
            페트병과 플라스틱 용기는 안에 내용물을 깨끗이 비우고, 부착상표와
            뚜껑 등 다른 재질로 된 부분은 제거해주세요. 알약 포장재와
            카세트테이프 등 여러 재질이 섞이고 분리가 어려운 제품은 종량제봉투에
            담아 버려주세요.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>2. 비닐류</p>
          <div className={classes.detail_item_content}>
            과자, 라면봉지, 1회용 비닐봉투에 음식물과 이물질이 묻었다면 물로
            2~3번 헹궈 잔여물을 없애고 버리고, 이물질 제거가 어려운 경우에는
            종량제봉투에 배출하시면 됩니다.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>3. 스티로품</p>
          <div className={classes.detail_item_content}>
            라면 국물이 밴 컵라면 용기는 남아있는 음식물 찌꺼기를 물에 한번 행군
            후 버리고, 농·수·축산물의 포장에 사용된 스티로폼은 내용물을 완전히
            비우고 테이프나 운송장, 상표 등을 완전히 제거한 뒤 버려야 합니다.
            이물질이 많이 묻었다면 스티로폼을 쪼개 종량제봉투에 담아 버려주세요.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>4. 유리병류</p>
          <div className={classes.detail_item_content}>
            탄산음료병이나 맥주병, 소주병은 담배꽁초와 같은 이물질을 넣지 말고
            버려주세요. 하지만 거울, 깨진 유리, 도자기류,유리 식기류는
            유리병류가 아니기 때문에 종량제봉투나 전용 마대에 버려주세요.
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidePage;
