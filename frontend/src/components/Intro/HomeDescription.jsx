import classes from "./HomeDescription.module.css";

function HomeDescription() {
  return (
    <div className={classes.home_discription_container}>
      <div className={classes.home_discription_title}>
        <p>
          <span style={{ color: "green" }}>녹색 지구</span>를 위한
        </p>
        <p>우리의</p>
        <p>작은 실천들</p>
      </div>
      <div className={classes.home_discription_img}></div>
    </div>
  );
}

export default HomeDescription;
