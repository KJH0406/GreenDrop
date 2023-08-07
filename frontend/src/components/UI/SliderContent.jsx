import classes from "./SliderContent.module.css"
import Slider from "react-slick";
import classNames from "classnames/bind";

const cn = classNames.bind(classes);

function SliderContent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold : 1000,
  };

  return (
    <div>  
      <Slider {...settings} className={classes.slider}>
        <div className={classes.slider_item} onClick={() => {window.location.href="https://www.hdec.kr/kr/newsroom/news_view.aspx?NewsSeq=240&NewsType=FUTURE&NewsListType=news_clist"}}>
          <div className={cn(`slider_item_img1`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            지구를 지키는 19가지 방법
          </div>
          <div className={classes.slider_item_subtitle}>
            내가 생활속에서 환경을 보호하는 방법
          </div>
        </div>
        <div className={classes.slider_item} onClick={() => {window.location.href="http://www.hkbs.co.kr/news/articleView.html?idxno=709455"}}>
          <div className={cn(`slider_item_img2`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            이것만 알아두세요! <br />분리배출 상식
          </div>
          <div className={classes.slider_item_subtitle}>
            종량제 봉투 사용부터‧‧‧<br />종이‧유리‧비닐 등 분리배출법 총정리
          </div>
        </div>
        <div className={classes.slider_item} onClick={() => {window.location.href="http://www.saegeoje.com/news/articleView.html?idxno=223332"}}>
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            잘 버리면 다시 쓴다 <br/> ‘재활용품 분리배출!’
          </div>
          <div className={classes.slider_item_subtitle}>
            매주 목요일은 투명페트병 분리배출하는 날!
          </div>
        </div>
        <div className={classes.slider_item} onClick={() => {window.location.href="https://www.hkbs.co.kr/news/articleView.html?idxno=723833"}}>
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            폐플라스틱이 옷걸이‧쇼핑백으로
          </div>
          <div className={classes.slider_item_subtitle}>
            환경공단, 버려지는 산업 폐플라스틱 재활용 추진
          </div>
        </div>
        <div className={classes.slider_item} onClick={() => {window.location.href="http://m.dongascience.com/news.php?idx=58895"}}>
          <div className={cn(`slider_item_img4`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            "전세계 바다에 떠다니는<br/> 미세플라스틱 무려 230만톤"
          </div>
          <div className={classes.slider_item_subtitle}></div>
        </div>
        <div className={classes.slider_item} onClick={() => {window.location.href="http://www.jbnews.com/news/articleView.html?idxno=1397269"}}>
          <div className={cn(`slider_item_img3`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            플라스틱 오염을 퇴치하려면
          </div>
          <div className={classes.slider_item_subtitle}></div>
        </div>
        <div className={classes.slider_item} onClick={() => {window.location.href="http://www.lifein.news/news/articleView.html?idxno=4890"}}>
          <div className={cn(`slider_item_img5`, `slider_item_img`)}></div>
          <div className={classes.slider_item_title}>
            플라스틱 문제 누가 해결하고 있을까?
          </div>
          <div className={classes.slider_item_subtitle}>
            [기획] 안전과 환경오염의 주범 '플라스틱' 해법을 찾아라! ③
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SliderContent;