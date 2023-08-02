import axios from "axios";
import classes from "./BalanceGameModifyForm.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function BalanceGameWriteFormPage() {
  const location = useLocation();
  // const boardSeq = StateParams.get("boardSeq") || "Default Value";
  const boardSeq = location.state.boardSeq || "Default Value";
  const categories = useSelector((state) => {
    return state.categories;
  });
  //newCard만 서버로 전송하면 됨
  const [newCard, setNewCard] = useState("");
  console.log(newCard);
  //boardSeq로 주제 상세 읽어오기(axios)
  //현재는 더미 데이터
  // const [card, setCard] = useState("");
  useEffect(() => {
    axios
      .get("http://i9b103.p.ssafy.io:8000/board/detail/" + boardSeq)
      .then((response) => {
        // console.log(response);
        // setCard(response.data);
        setQuestion(response.data.question);
        setLeftAnswer(response.data.leftAnswer);
        setRightAnswer(response.data.rightAnswer);
        setCategory(response.data.item);
        setNickname(response.data.nickname);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [boardSeq]);

  const [question, setQuestion] = useState("");
  const [leftAnswer, setLeftAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [nickname, setNickname] = useState("");
  const handleModifyCard = () => {
    setNewCard({
      question: question,
      leftAnswer: leftAnswer,
      rightAnswer: rightAnswer,
      item: category,
    });
    axios
      .patch(
        "http://i9b103.p.ssafy.io:8000/board/modify/" + boardSeq,
        JSON.stringify(newCard),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => {
        console.log("수정완료");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={classes.regist_box}>
      <Link className={classes.title} to={"/board"}>
        <h2 className={classes.first_word}>Green &nbsp;</h2>
        <h2 className={classes.second_word}>Balance Game</h2>
      </Link>
      <div className={classes.outer_box}>
        <div className={classes.top}>
          <div className={`${classes.top_item} `}>
            <input
              className={`${classes.input_tag} ${classes.subject}`}
              type="text"
              placeholer="상황 설명*(필수)(최대 30자)"
              value={question || ""}
              onChange={(e) => {
                setQuestion(e.target.value);
                console.log(question);
              }}
            />
          </div>
        </div>
        <div className={classes.middle}>
          <div className={`${classes.middle_item} ${classes.middle_item_left}`}>
            <textarea
              className={classes.text_input}
              placeholder="선택지1(필수)(최대50자)"
              value={leftAnswer || ""}
              onChange={(e) => {
                setLeftAnswer(e.target.value);
                console.log(leftAnswer);
              }}
            ></textarea>
            <div className={classes.cover_bar}></div>
          </div>
          <div
            className={`${classes.middle_item} ${classes.middle_item_right}`}
          >
            <textarea
              className={classes.text_input}
              placeholder="선택지2(필수)(최대50자)"
              value={rightAnswer || ""}
              onChange={(e) => {
                setRightAnswer(e.target.value);
                console.log(rightAnswer);
              }}
            ></textarea>
            <div className={classes.cover_bar}></div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
            {/* 카테고리 선택하는 부분 */}

            <select
              name="category"
              className={classes.category}
              defaultValue={category || ""}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {/* 닉네임, 비밀번호 입력받을 부분 */}
      <div className={classes.info_input_area}>
        <div className={classes.info_input}>
          <input
            className={classes.input_tag}
            type="text"
            value={nickname || ""}
            disabled
          />
        </div>

        <input
          type="button"
          className={classes.regist_btn}
          value="밸런스 게임 수정하기"
          onClick={() => {
            handleModifyCard();
          }}
        ></input>
        <Link className={classes.regist_btn} to={"/board"}>
          목록으로
        </Link>
      </div>
    </div>
  );
}

export default BalanceGameWriteFormPage;
