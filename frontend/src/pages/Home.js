import { useState } from "react";
import classes from "./Home.module.css";
import TodayCount from "../components/UI/TodayCount";
import { useSelector } from "react-redux";

function HomePage() {
  let state = useSelector((state) => {
    return state;
  });

  let leftPercentage =
    (parseInt(state.leftAnswer[0].leftCount) /
      (parseInt(state.leftAnswer[0].leftCount) +
        parseInt(state.rightAnswer[0].rightCount))) *
    100;

  let rightPercentage =
    (parseInt(state.rightAnswer[0].rightCount) /
      (parseInt(state.leftAnswer[0].leftCount) +
        parseInt(state.rightAnswer[0].rightCount))) *
    100;

  return (
    <div className={classes.homepage}>
      <div className={classes.collection}>
        <div className={classes.collection_text}>오늘의 플라스틱 컵 수거량</div>
        <div className={classes.collection_image}></div>
      </div>
      <div className={classes.collection_background}></div>
      <TodayCount />
      <div className={classes.down}>
        <div className={classes.down_image}></div>
      </div>

      <div className={classes.result}>
        <div className={classes.result_title}>지난 밸런스 게임 결과!</div>
        <div className={classes.result_balance_game}>
          <div className={classes.result_balance_game_title}>
            다시 태어난다면?
          </div>
          <div className={classes.result_answer}>
            <div className={classes.result_left}>
              {parseInt(state.leftAnswer[0].leftCount) >
              parseInt(state.rightAnswer[0].rightCount) ? (
                <div className={classes.result_king}></div>
              ) : (
                <div className={classes.result_nan}></div>
              )}
              <div className={classes.result_content}>
                {state.leftAnswer[1].left}
              </div>
              <div className={classes.result_percentage}>
                {leftPercentage.toFixed(1)}
              </div>
              <div className={classes.result_left_count}>
                {state.leftAnswer[0].leftCount}%
              </div>
            </div>
            <div className={classes.result_right}>
              {parseInt(state.leftAnswer[0].leftCount) <
              parseInt(state.rightAnswer[0].rightCount) ? (
                <div className={classes.result_king}></div>
              ) : (
                <div className={classes.result_nan}></div>
              )}
              <div className={classes.result_content}>
                {state.rightAnswer[1].right}
              </div>
              <div className={classes.result_percentage}>
                {rightPercentage.toFixed(1)}
              </div>
              <div className={classes.result_right_count}>
                {state.rightAnswer[0].rightCount}%
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
          <button>밸런스 게임 등록하러 가기!</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
