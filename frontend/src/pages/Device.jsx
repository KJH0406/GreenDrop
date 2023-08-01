import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import classes from "./Device.module.css";
import verseImg from "../assets/vs.png";
import decorateImg_1 from "../assets/deviceUI_1.png";
import decorateImg_2 from "../assets/deviceUI_2.png";
import ConfirmModal from "../components/DeviceUI/ConfirmModal";
import CompleteModal from "../components/DeviceUI/CompleteModal";
import OverWeightModal from "../components/DeviceUI/OverWeightModal";
import success from "../assets/success.mp3";

// 밸런스 게임 데이터 불러오기
const fetchGameData = async () => {
  const response = await fetch(
    "https://react-app-a1e5d-default-rtdb.firebaseio.com/data.json"
  );
  return response.json();
};

// 디바이스 페이지 정보
function DevicePage() {
  // 오디오 재생(수정필요)
  var audio = new Audio(success);
  // 포트 관련 함수
  const [port, setPort] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showHeavyModal, setShowHeavyModal] = useState(false);

  const connectSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      setPort(port);

      const reader = port.readable.getReader();
      readData(reader);
    } catch (error) {
      console.error("Error connecting to serial port:", error);
    }
  };
  const readData = async (reader) => {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("Reader has been canceled.");
          break;
        }
        const textDecoder = new TextDecoder();
        const data = textDecoder.decode(value);
        const portValue = data.trim().replace(/\s+/g, " ");
        console.log(portValue);

        // 'm' 데이터를 처음 받았을 때 Confirm Modal 표시
        if (portValue === "m") {
          setShowThankYouModal(false);
          setShowHeavyModal(false);
          setShowConfirmModal(true);
        }

        // 'L' 데이터를 받았을 때 Thank You Modal 표시
        if (portValue.includes("L")) {
          setShowHeavyModal(false);
          setShowConfirmModal(false);
          setShowThankYouModal(true);
          setTimeout(() => {
            setShowThankYouModal(false);
          }, 2000); // Close Thank You Modal after 2 seconds
        }

        // 'o' 데이터를 받았을 때 Heavy Modal 표시
        if (portValue.includes("o")) {
          setShowConfirmModal(false);
          setShowThankYouModal(false);
          setShowHeavyModal(true);
        }

        if (portValue.includes("s")) {
          setShowConfirmModal(false);
          setShowThankYouModal(false);
          setShowHeavyModal(false);
        }
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", connectSerial);

    return () => {
      if (port && port.readable) {
        port.readable.cancel();
        port.close();
      }
      document.removeEventListener("click", connectSerial);
    };
  }, [port]);

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

  return (
    <div className={classes.device_container}>
      <input type="button" onClick={() => audio.play()} value="PLAY"></input>

      {/* Confirm Modal */}
      {showConfirmModal && <ConfirmModal />}

      {/* Thank You Modal */}
      {showThankYouModal && <CompleteModal />}

      {/* Heavy Modal */}
      {showHeavyModal && <OverWeightModal />}
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
          <span className={classes.result_num}>{leftCount}개</span>
        </div>
        <div
          style={{ width: `${rightBarPercent}%` }}
          className={`${classes.result_box_bar} ${classes.result_box_rightbar}`}
        >
          <span className={classes.result_num}>{rightCount}개</span>
        </div>
      </div>
    </div>
  );
}

export default DevicePage;
