import classes from "./Thumbnail.module.css";

function Thumbnail() {
  return (
    <div className={classes.thumbnail_box}>
      <div className={classes.thumbnail_title}>
        <div className={classes.thumbnail_title_first}>
          <span style={{ color: "green" }}>Green </span>
          Drop
        </div>
        <div className={classes.thumbnail_title_second}>
          함께하는 분리수거 <br />
          Green Drop 이 함께합니다
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;
