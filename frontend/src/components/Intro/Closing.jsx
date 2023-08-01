import classes from "./Closing.module.css";

function Closing() {
  return (
    <div className={classes.closing_container}>
      <div className={classes.closing_img}>
        <div className={classes.closing_comment}>
          <p>Green Drop은</p>
          <p>지구환경을 보호하는</p>
          <p>일상 속 작은 실천에</p>
          <p>함께 하겠습니다</p>
        </div>
        <div className={classes.overlay}></div>
      </div>
    </div>
  );
}

export default Closing;
