import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodayCount from "../components/UI/TodayCount";
import classes from "./Home.module.css";
import { useRef } from "react";

function HomePage() {
  const resultRef = useRef();
  let navigate = useNavigate();

  let [balanceGame, setBalanceGame] = useState([
    { question: "" },
    { leftAnswer: "" },
    { rightAnswer: "" },
    { leftCount: "" },
    { rightCount: "" },
  ]);

  useEffect(() => {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(today.getDate() - 1);

    let now = yesterday.toISOString().slice(0, 10);

    axios
      .get(`https://i9b103.p.ssafy.io/api/game/${now}`)
      .then((result) => {
        setBalanceGame((prevBalanceGame) => {
          return [
            { ...prevBalanceGame[0], question: result.data.question },
            { ...prevBalanceGame[1], leftAnswer: result.data.leftAnswer },
            { ...prevBalanceGame[2], rightAnswer: result.data.rightAnswer },
            { ...prevBalanceGame[3], leftCount: result.data.leftCount },
            { ...prevBalanceGame[4], rightCount: result.data.rightCount },
          ];
        });
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });
  }, []);

  let leftPercentage = ((parseInt(balanceGame[3].leftCount) + parseInt(balanceGame[4].rightCount)) !== 0) ?
    (parseInt(balanceGame[3].leftCount) /
      (parseInt(balanceGame[3].leftCount) +
        parseInt(balanceGame[4].rightCount))) *
    100 : 0;

  let rightPercentage = ((parseInt(balanceGame[3].leftCount) + parseInt(balanceGame[4].rightCount)) !== 0) ?
    (parseInt(balanceGame[4].rightCount) /
      (parseInt(balanceGame[3].leftCount) +
        parseInt(balanceGame[4].rightCount))) *
    100 : 0;

  return (
    <div className={classes.homepage}>
      <div className={classes.collection}>
        <div className={classes.collection_text}>오늘의 플라스틱 컵 수거량</div>
        <div className={classes.collection_image}></div>
      </div>
      <div className={classes.collection_background}></div>
      <TodayCount />
      <div className={classes.down}>
        <div
          className={classes.down_image}
          onClick={() => {
            resultRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        ></div>
      </div>

      <div className={classes.result} ref={resultRef}>
        <div className={classes.result_title}>지난 밸런스 게임 결과!</div>
        <div className={classes.result_balance_game}>
          <div className={classes.result_balance_game_title}>
            {balanceGame[0].question}
          </div>
          <div className={classes.result_answer}>
            <div className={classes.result_left}>
              {parseInt(balanceGame[3].leftCount) >
              parseInt(balanceGame[4].rightCount) ? (
                <div className={classes.result_king}></div>
              ) : (
                parseInt(balanceGame[3].leftCount) ===
              parseInt(balanceGame[4].rightCount) ?
                <div className={classes.result_tie}></div>
                : <div className={classes.result_nan}></div>
              )}
              <div className={classes.result_content}>
                <div className={classes.content}>
                  {balanceGame[1].leftAnswer}
                </div>
              </div>
              <div className={classes.result_percentage}>
                {leftPercentage.toFixed(1)}%
              </div>
              <div className={classes.result_left_count}>
                {balanceGame[3].leftCount}표
              </div>
            </div>
            <div className={classes.result_right}>
              {parseInt(balanceGame[3].leftCount) <
              parseInt(balanceGame[4].rightCount) ? (
                <div className={classes.result_king}></div>
              ) : (
                parseInt(balanceGame[3].leftCount) ===
              parseInt(balanceGame[4].rightCount) ?
                <div className={classes.result_tie}></div>
                : <div className={classes.result_nan}></div>
              )}
              <div className={classes.result_content}>
                <div className={classes.content}>
                  {balanceGame[2].rightAnswer}
                </div>
              </div>
              <div className={classes.result_percentage}>
                {rightPercentage.toFixed(1)}%
              </div>
              <div className={classes.result_right_count}>
                {balanceGame[4].rightCount}표
              </div>
            </div>
          </div>
        </div>

        <div className={classes.last_text}>
          <div>모두에게 질문하고 싶은 밸런스 게임을 적어주세요!</div>
          <div>
            인기있는 질문은 <strong>내일 수거함 키오스크에 표시</strong>됩니다🌱
          </div>
        </div>

        <div className={classes.balance_game_button}>
          <button
            onClick={() => {
              navigate("/board");
            }}
          >
            밸런스 게임 등록하러 가기!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
