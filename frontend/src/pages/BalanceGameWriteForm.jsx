import axios from "axios";
import classes from "./BalanceGameWriteForm.module.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCategoryList } from "../store";
import backImg from "../assets/back.png";

function BalanceGameWriteFormPage() {
  const [question, setQuestion] = useState("");
  const [leftAnswer, setLeftAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [nickname, setNickname] = useState(null);
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState(null);
  // const [card, setCard] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios

      .get("https://i9b103.p.ssafy.io/api/category/list")
      .then((response) => {
        console.log("useState", ...response.data);
        const fetchedCategories = [...response.data];
        dispatch(getCategoryList(fetchedCategories));
        setCategory(fetchedCategories[0].item);
      });
  }, [dispatch]);

  const categories = useSelector((state) => {
    return state.categories;
  });
  const navigate = useNavigate();
  const [showCheckModal, setShowCheckModal] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState("");

  const handleCardRegistration = () => {
    const cardData = {
      question: question,
      leftAnswer: leftAnswer,
      rightAnswer: rightAnswer,
      nickname: nickname || null,
      password: password,
      category: category,
    };

    console.log(JSON.stringify(cardData));

    // axios 요청 보내기
    if (leftAnswer.length === 0 || rightAnswer.length === 0) {
      setShowCheckModal({
        title: "글 등록 실패",
        category: "board",
        type: "confirm",
        action: "등록하기",
      });
      setConfirm(true);
      setConfirmModalData({
        confirmTitle: "밸런스 게임을 작성해 주세요",
        confirmCategory: "board",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else if (!password) {
      setShowCheckModal({
        title: "글 등록 실패",
        category: "board",
        type: "confirm",
        action: "등록하기",
      });
      setConfirm(true);
      setConfirmModalData({
        confirmTitle: "비밀번호를 작성해 주세요",
        confirmCategory: "board",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else {
      axios
        .post(
          "https://i9b103.p.ssafy.io/api/board/regist",
          JSON.stringify(cardData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          console.log(response);
          // 요청에 대한 응답을 처리하는 코드를 추가할 수 있습니다.
          setIsRegistDisable(true);

          navigate("/board");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          // 에러 처리 코드를 추가할 수 있습니다.
          setShowCheckModal({
            title: "글 등록 실패",
            category: "board",
            type: "confirm",
            action: "등록하기",
          });
          setConfirm(true);
          setConfirmModalData({
            confirmTitle: "글 등록 실패했습니다.",
            confirmCategory: "board",
            confirmType: "regist",
            confirmAction: "실패",
          });
        });
    }
  };
  const [isRegistDisable, setIsRegistDisable] = useState(false);
  return (
    <div className={classes.regist_box}>
      {showCheckModal ? (
        <BalanceGameCheckModal
          setShowCheckModal={setShowCheckModal}
          confirm={confirm}
          setConfirm={setConfirm}
          confirmTitle={confirmModalData.confirmTitle}
          confirmCategory={confirmModalData.confirmCategory}
          confirmType={confirmModalData.confirmType}
          confirmAction={confirmModalData.confirmAction}
          setConfirmModalData={setConfirmModalData}
        />
      ) : (
        <></>
      )}

      {/* <Link className={classes.title} to={"/board"}>
        <h2 className={classes.first_word}>Green &nbsp;</h2>
        <h2 className={classes.second_word}>Balance Game</h2>
      </Link> */}
      <div style={{ display: "flex" }}>
        <Link to={"/board"}>
          <img className={classes.back_img} src={backImg} alt="" />
        </Link>
      </div>

      <div className={classes.outer_box}>
        <div className={classes.top}>
          <div className={`${classes.top_item} `}>
            <input
              className={`${classes.input_tag} ${classes.subject}`}
              type="text"
              placeholder="상황 설명*(필수)(최대 30자)"
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
              onChange={(e) => {
                setLeftAnswer(e.target.value);
                console.log(leftAnswer);
              }}
            ></textarea>
          </div>
          <div
            className={`${classes.middle_item} ${classes.middle_item_right}`}
          >
            <textarea
              className={classes.text_input}
              placeholder="선택지2(필수)(최대50자)"
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
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories.map((item, idx) => {
                return (
                  <option value={item.item} key={idx}>
                    {item.item}
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
            placeholder="닉네임을 입력하세요 (최대 10자)"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>
        <div className={classes.info_input}>
          <input
            className={classes.input_tag}
            type="password"
            placeholder="비밀번호를 입력하세요 (최대 10자)"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="button"
          className={classes.regist_btn}
          value="밸런스 게임 등록하기"
          onClick={() => {
            handleCardRegistration();
          }}
          disabled={isRegistDisable ? true : false}
        ></input>
      </div>
    </div>
  );
}

export default BalanceGameWriteFormPage;
