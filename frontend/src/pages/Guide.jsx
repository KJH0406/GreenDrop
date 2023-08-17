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
          <div className={classes.source_box}>
            <h6>출처 : 환경부</h6>
          </div>
        </div>
        <div className={classes.content}>
          분리배출 방법이 헷갈리신 적은 없으신가요?
        </div>
        <div className={classes.content}>
          <span style={{ fontWeight: "bold" }}>분리배출 방법</span>
          <span>에 대해 꼼꼼히 알려드릴게요!</span>
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
            페트병과 플라스틱 용기는 안에{" "}
            <span className={classes.highlight}>내용물을 깨끗이 비우고</span>,
            부착상표와 뚜껑 등{" "}
            <span className={classes.highlight}>
              다른 재질로 된 부분은 제거
            </span>
            해주세요. 알약 포장재와 카세트테이프 등
            <span className={classes.highlight}>
              {" "}
              여러 재질이 섞이고 분리가 어려운 제품은 종량제봉투
            </span>
            에 담아 버려주세요.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>2. 비닐류</p>
          <div className={classes.detail_item_content}>
            과자, 라면봉지, 1회용 비닐봉투에 음식물과 이물질이 묻었다면{" "}
            <span className={classes.highlight}>
              물로 2~3번 헹궈 잔여물을 없애고
            </span>{" "}
            버리고,{" "}
            <span className={classes.highlight}>
              이물질 제거가 어려운 경우에는 종량제봉투에 배출
            </span>
            하시면 됩니다.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>3. 스티로품</p>
          <div className={classes.detail_item_content}>
            라면 국물이 밴 컵라면 용기는 남아있는 음식물 찌꺼기를 물에 한번 행군
            후 버리고, 농·수·축산물의 포장에 사용된 스티로폼은 내용물을 완전히
            비우고{" "}
            <span className={classes.highlight}>
              테이프나 운송장, 상표 등을 완전히 제거
            </span>{" "}
            한 뒤 버려야 합니다.
            <br />
            <span className={classes.highlight}>
              이물질이 많이 묻었다면 스티로폼을 쪼개 종량제봉투
            </span>
            에 담아 버려주세요.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>4. 유리병류</p>
          <div className={classes.detail_item_content}>
            탄산음료병이나 맥주병, 소주병은 담배꽁초와 같은 이물질을 넣지 말고
            버려주세요.
            <br />
            <span className={classes.highlight}>
              거울, 깨진 유리, 도자기류,유리 식기류는 유리병류가 아니기 때문에
              종량제봉투나 전용 마대
            </span>{" "}
            에 버려주세요.
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>5. 금속 캔 및 고철류</p>
          <div className={classes.detail_item_content}>
            금속 캔은 알루미늄과 철 모두 분리수거함에 배출해 주세요.
            <br /> 캔류는 플라스틱 뚜껑 등 다른 재질 부분을 제거하고, 내용물은
            깨끗이 비운 후 찌그러뜨려 버리고,{" "}
            <span className={classes.highlight}>
              부탄가스 등은 구멍을 뚫어
            </span>{" "}
            내용물을 비워주세요.
            <br />
            고철류는 이물질이 섞이지 않도록{" "}
            <span className={classes.highlight}>
              봉투에 넣거나 끈으로 묶어서 배출
            </span>
            해 주세요. <br />
            <span style={{ color: "red" }}>
              ※ 고무, 플라스틱이 부착되어 있거나 폐유통, 페인트통 등 유해 물질이
              묻어있는 통은 재활용이 되지 않습니다.
            </span>
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>6. 종이류</p>
          <div className={classes.detail_item_content}>
            <span className={classes.highlight}>신문</span> : 물기에 젖지 않도록
            하고, 반듯하게 펴서 차곡차곡 쌓은 후 흩날리지 않도록 끈 등으로
            묶어서 배출해 주세요.
            <br />
            <span className={classes.highlight}>책자 / 노트</span> : 스프링 등
            종이류와 다른 재질은 제거한 후 배출해 주세요.
            <br />
            <span className={classes.highlight}>상자류</span> : 테이프 등
            종이류와 다른 재질은 제거한 후 배출해 주세요.
            <br />
            <span style={{ color: "red" }}>
              ※ 아래의 경우 종이류가 아닌 쓰레기 종량제 봉투로 배출해 주세요
            </span>
            <br /> &nbsp; - 다른 재질과 혼합 구성된 종이 : 감열지(영수증),
            금박지, 은박지, 다른 재질이 혼합된 벽지
            <br /> &nbsp;&nbsp;&nbsp; (천연재료 벽지, PVC 코팅 벽지 등)
            <br /> &nbsp; - 종이가 아닌 소재 : 부직포, 플라스틱 합성지
          </div>
          <hr />
        </div>
        <div className={classes.detail_item}>
          <p className={classes.detail_item_title}>7. 종이팩 / 종이컵</p>
          <div className={classes.detail_item_content}>
            <span className={classes.highlight}>종이팩</span>
            <br /> &nbsp; - 내용물을 비우고 물로 헹구는 등 이물질을 제거하고
            말린 후 배출해 주세요.
            <br /> &nbsp; - 빨대, 비닐 등 종이팩과 다른 재질은 제거한 후 배출해
            주세요.
            <br /> &nbsp; - 일반 종이류와 혼합되지 않게 종이팩 전용수거함에
            배출해 주세요.
            <br /> &nbsp; - 종이팩 전용수거함이 없는 경우에는 종이류와 구분할 수
            있도록 가급적 끈 등으로 묶어 종이류 수거함으로 배출해 주세요.
            <br />
            <span className={classes.highlight}>종이컵</span>
            <br /> &nbsp; - 내용물을 비우고 물로 헹구는 등 이물질을 제거하여
            배출해 주세요.
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidePage;
