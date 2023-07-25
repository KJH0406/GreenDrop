import classes from "./Tumnail.module.css";

function Tumnail() {
  return (
    <div className={classes.tumnail_box}>
      <div className={classes.tumnail_title}>
        <div className={classes.tumnail_title_first}>
          The beginning <br />
          For a better world <br />
          Recycling Together
        </div>
        <div className={classes.tumnail_title_second}>
          더 나은 세상을 위한 시작, 함께하는 분리수거 <br />
          Green Drop 이 함께합니다
        </div>
      </div>
    </div>
  );
}

export default Tumnail;
