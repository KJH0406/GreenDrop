import classes from "./Location.module.css";

function LocationPage() {
  return (
    <div className={classes.location}>
      <div className={classes.title}>
        <div className={classes.title_green}>우리의 수거함</div> 위치
      </div>

      <div className={classes.iot_location}>

      </div>

      <div className={classes.iot_picture}></div>

      <div className={classes.iot_location_text}>
        <div className={classes.location_text}>삼성화재 유성연수원 교육동 1층</div>
        <div className={classes.location_text}>중앙 카페(웰스토리) 쓰레기통 옆</div>
      </div>
    </div>
  );
}

export default LocationPage;
