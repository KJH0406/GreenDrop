import React from "react";
import { useQuery } from "react-query";
import classes from "./Device.module.css";
import verseImg from "../assets/vs.png";
import decorateImg_1 from "../assets/deviceUI_1.png";
import decorateImg_2 from "../assets/deviceUI_2.png";
import DeviceModal from "../components/DeviceUI/DeviceModal";

// 밸런스 게임 데이터 불러오기
const fetchGameData = async () => {
  const response = await fetch(
    "https://react-app-a1e5d-default-rtdb.firebaseio.com/data.json"
  );
  return response.json();
};

// 디바이스 페이지 정보
function DevicePage() {
  const { data, status } = useQuery("gameData", fetchGameData, {
    refetchInterval: 2000, // 2초마다 데이터 리프레시
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  // 위에서 호출한 data를 통해 데이터 명칭 별 정의하기
  const { question, leftAnswer, rightAnswer, leftCount, rightCount } = data;

  // 전체 카운트 및 왼쪽,오른쪽 비율
  const totalCount = leftCount + rightCount;
  let leftBarPercent =
    leftCount !== 0 ? Math.round((leftCount / totalCount) * 100) : 5;
  let rightBarPercent =
    rightCount !== 0 ? Math.round((rightCount / totalCount) * 100) : 5;
  if (totalCount === 0) {
    leftBarPercent = 50;
    rightBarPercent = 50;
  }

  // 나중에 SSE로 연결해야함
  // 모달 오픈 여부
  const isOpen = true;

  // device에 띄울 내용 및 색상
  const device = {
    title: "내용물을 확인 중입니다...",
    title2: "수거가 완료되었습니다!",
    content: "확인 중에 플라스틱 컵을 움직이지 말아주세요!",
    content2: "오늘도 환경보호에 앞장서는 당신은 우리의 환경히어로 🌱",
    color: "green",
  };

  return (
    <div className={classes.device_container}>
      {isOpen ? <DeviceModal device={device} /> : ""}
      <img className={classes.decorate_left_img} src={decorateImg_1} alt="" />
      <img className={classes.decorate_right_img} src={decorateImg_2} alt="" />
      <img className={classes.verse_img} src={verseImg} alt="" />
      <div className={classes.title_box}>{question}</div>
      <div className={classes.content_box}>
        <div className={classes.box}>
          <div
            style={{ backgroundColor: "#02B2A7" }}
            className={classes.box_title}
          >
            A
          </div>
          <div className={classes.box_content}>
            <div>{leftAnswer}</div>
          </div>
        </div>
        <div className={classes.box}>
          <div
            style={{ backgroundColor: "#FE2F73" }}
            className={classes.box_title}
          >
            B
          </div>
          <div className={classes.box_content}>
            <div>{rightAnswer}</div>
          </div>
        </div>
      </div>
      <div className={classes.result_box}>
        <div
          style={{ width: `${leftBarPercent}%` }}
          className={`${classes.result_box_bar} ${classes.result_box_leftbar}`}
        >
          <span className={classes.result_num}>{leftCount}</span>
        </div>
        <div
          style={{ width: `${rightBarPercent}%` }}
          className={`${classes.result_box_bar} ${classes.result_box_rightbar}`}
        >
          <span className={classes.result_num}>{rightCount}</span>
        </div>
      </div>
    </div>
  );
}

export default DevicePage;
