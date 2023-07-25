import { useState } from "react";
import classes from "./TodayCount.module.css";
import { useSelector } from "react-redux";

function TotalCount() {
  let state = useSelector((state) => {
    return state;
  });

  return (
    <div>
      <div className={classes.todaySection}>
        <div className={classes.todayCount}>{state.todayCount}</div>
        <div className={classes.todayCountText}>개</div>
      </div>
      <div className={classes.totalSection}>
        <div>지구를 생각하는 마음으로</div>
        <div>
          지금까지 총&nbsp;
          <strong style={{ color: "green" }}>{state.totalCount}</strong>개의
          컵이 수거되었어요!
        </div>
      </div>
    </div>
  );
}

export default TotalCount;
