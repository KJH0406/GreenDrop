import axios from "axios";
import classes from "./BalanceGameModifyForm.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backImg from "../assets/back.png";
import deviceImg from "../assets/device (1).png";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import { getCategoryList } from "../store";

function BalanceGameModifyFormPage() {
  const api = "https://i9b103.p.ssafy.io/api";

  const location = useLocation();
  const boardSeq = location.state.boardSeq || "Default Value";

  // 카테고리 리스트 불러오기
  const dispatch = useDispatch();
  const categories = useSelector((state) => {
    return state.categories;
  });

  useEffect(() => {
    axios.get(`${api}/category/list`).then((response) => {
      const fetchedCategories = [...response.data];
      dispatch(getCategoryList(fetchedCategories));
    });
  }, [dispatch]);

  //작성자 확인 모달
  const [showCheckModal, setShowCheckModal] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState("");

  //수정 할 글 불러오기
  const [question, setQuestion] = useState("");
  const [leftAnswer, setLeftAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get(`${api}/board/detail/${boardSeq}`)
      .then((response) => {
        setQuestion(response.data.question);
        setLeftAnswer(response.data.leftAnswer);
        setRightAnswer(response.data.rightAnswer);
        setCategory(response.data.item);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [boardSeq]);

  //업데이트 한 카드
  const [newCard, setNewCard] = useState("");

  useEffect(() => {
    const updatedCard = {
      question: question,
      leftAnswer: leftAnswer,
      rightAnswer: rightAnswer,
      category: category,
    };

    setNewCard(updatedCard);
  }, [question, leftAnswer, rightAnswer, category]);

  //글 수정
  const navigate = useNavigate();

  const handleModifyCard = () => {
    if (leftAnswer.length === 0 || rightAnswer.length === 0) {
      setShowCheckModal({
        title: "글 수정 실패",
        category: "board",
        type: "confirm",
        action: "수정하기",
      });
      setConfirm(true);
      setConfirmModalData({
        confirmTitle: "밸런스 게임을 작성해 주세요",
        confirmCategory: "board",
        confirmType: "modify",
        confirmAction: "실패",
      });
    } else {
      console.log("수정할 카드", newCard);
      axios
        .patch(`${api}/board/modify/${boardSeq}`, JSON.stringify(newCard), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          navigate("/board");
        })
        .catch((error) => {
          console.log(error);
          setShowCheckModal({
            title: "글 수정 실패",
            category: "board",
            type: "confirm",
            action: "수정하기",
          });
          setConfirm(true);
          setConfirmModalData({
            confirmTitle: "글 수정에 실패했습니다.",
            confirmCategory: "board",
            confirmType: "modify",
            confirmAction: "실패",
          });
        });
    }
  };

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

      <div className={classes.top_title_box}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={"/board"}>
            <img className={classes.back_img} src={backImg} alt="" />
          </Link>
        </div>
        <h2 className={classes.second_word}>
          <img className={classes.second_word_img} src={deviceImg} alt=""></img>
          밸런스 게임 수정
        </h2>

        <div style={{ width: "20px" }}></div>
      </div>
      <div className={classes.outer_box}>
        <div className={classes.top}>
          <div className={`${classes.top_item} `}>
            <input
              className={`${classes.input_tag} ${classes.subject}`}
              type="text"
              maxLength="20"
              placeholder="상황 설명 (필수) (최대 20자)"
              value={question || ""}
              onChange={(e) => {
                setQuestion(e.target.value);
                // console.log(question);
              }}
            />
          </div>
        </div>
        <div className={classes.middle}>
          <div className={`${classes.middle_item} ${classes.middle_item_left}`}>
            <textarea
              className={classes.text_input}
              maxLength="40"
              placeholder="선택지1 (필수) (최대40자)"
              value={leftAnswer || ""}
              onChange={(e) => {
                setLeftAnswer(e.target.value);
                // console.log(leftAnswer);
              }}
            ></textarea>
            <div className={classes.cover_bar}></div>
          </div>
          <div
            className={`${classes.middle_item} ${classes.middle_item_right}`}
          >
            <textarea
              className={classes.text_input}
              maxLength="40"
              placeholder="선택지2 (필수) (최대40자)"
              value={rightAnswer || ""}
              onChange={(e) => {
                setRightAnswer(e.target.value);
                // console.log(rightAnswer);
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
              value={category}
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
        <input
          type="button"
          className={classes.regist_btn}
          value="수정하기"
          onClick={() => {
            handleModifyCard();
          }}
        ></input>
      </div>
    </div>
  );
}

export default BalanceGameModifyFormPage;
