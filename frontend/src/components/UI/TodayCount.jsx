import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./TodayCount.module.css";

function TotalCount() {
  let [todayCount, setTodayCount] = useState("");

  let [totalCount, setTotalCount] = useState("");

  useEffect(() => {
    let date = new Date();
    let now = date.toISOString().slice(0, 10);

    axios
      .get(`http://i9b103.p.ssafy.io:8000/plastic/list/${now}`)
      .then((result) => {
        setTodayCount(parseInt(result.data.todayCount).toLocaleString("ko-KR"));
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });

    axios
      .get("http://i9b103.p.ssafy.io:8000/plastic/list")
      .then((result) => {
        setTotalCount(parseInt(result.data.totalCount).toLocaleString("ko-KR"));
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });
  }, []);

  return (
    <div>
      <div className={classes.todaySection}>
        <div className={classes.todayCount}>{todayCount}</div>
        <div className={classes.todayCountText}>개</div>
      </div>
      <div className={classes.totalSection}>
        <div>지구를 생각하는 마음으로</div>
        <div>
          지금까지 총&nbsp;
          <strong style={{ color: "green" }}>{totalCount}</strong>개의 컵이
          수거되었어요!
        </div>
      </div>
    </div>
  );
}

export default TotalCount;
