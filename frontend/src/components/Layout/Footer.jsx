import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer_container}>
      <div className={classes.footer_title}>
        <h3>Contact</h3>
      </div>
      <div className={classes.footer_subtitle}>
        <div className={classes.footer_content}>
          <p>(팀) GreenDrop</p>
          <p>공통_PJT_3팀: 최경인, 김장호, 이승현, 조영헌, 이대건, 천원준</p>
          <p>E-mail: a27313797@gmail.com / Phone: 010-7139-0930</p>
          <p>Addres: 대전광역시 유성구 덕명동 124</p>
          <p>삼성화재 유성연수원 교육동 102호</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Footer;
