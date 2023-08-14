import axios from "axios";
import classes from "./BalanceGameWriteForm.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import backImg from "../assets/back.png";
import deviceImg from "../assets/device (1).png";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import { getCategoryList } from "../store";

function BalanceGameWriteFormPage() {
  const api = "https://i9b103.p.ssafy.io/api";

  //입력값 저장
  const [question, setQuestion] = useState("");
  const [leftAnswer, setLeftAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [nickname, setNickname] = useState(null);
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  //전체 카테고리 불러오기
  const categories = useSelector((state) => {
    return state.categories;
  });

  useEffect(() => {
    axios.get(`${api}/category/list`).then((response) => {
      const fetchedCategories = [...response.data];
      dispatch(getCategoryList(fetchedCategories));
      setCategory(fetchedCategories[0].item);
    });
  }, [dispatch]);

  //작성자 확인 모달
  const [showCheckModal, setShowCheckModal] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState("");

  //글 등록
  const navigate = useNavigate();
  const [isRegistDisable, setIsRegistDisable] = useState(false);

  const handleCardRegistration = () => {
    const cardData = {
      question: question,
      leftAnswer: leftAnswer,
      rightAnswer: rightAnswer,
      nickname: nickname || null,
      password: password,
      category: category,
    };

    if (leftAnswer.length === 0 || rightAnswer.length === 0) {
      setShowCheckModal({
        title: "글 등록 실패",
        category: "board",
        type: "confirm",
        action: "등록하기",
      });
      setConfirm(true);
      setConfirmModalData({
        confirmTitle: "밸런스 게임을 작성해 주세요!",
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
        confirmTitle: "비밀번호를 작성해 주세요!",
        confirmCategory: "board",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else {
      axios
        .post(`${api}/board/regist`, JSON.stringify(cardData), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
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
          overlay="full"
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
          밸런스 게임 등록
        </h2>

        <div style={{ width: "20px" }}></div>
      </div>

      <div className={classes.outer_box}>
        <div className={classes.top}>
          <div className={`${classes.top_item} `}>
            <input
              style={{
                border: "1px solid lightgrey",
                padding: "3%",
                marginBottom: "3%",
              }}
              className={`${classes.input_tag} ${classes.subject}`}
              type="text"
              maxlength="20"
              placeholder="상황 설명 (필수) (최대 20자)"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.middle}>
          <div className={`${classes.middle_item} ${classes.middle_item_left}`}>
            <textarea
              className={classes.text_input}
              maxlength="40"
              placeholder="선택지1(필수)&#13;&#10;(최대40자)"
              onChange={(e) => {
                setLeftAnswer(e.target.value);
              }}
            ></textarea>
          </div>
          <div
            className={`${classes.middle_item} ${classes.middle_item_right}`}
          >
            <textarea
              className={classes.text_input}
              maxlength="40"
              placeholder="선택지2(필수)&#13;&#10;(최대40자)"
              onChange={(e) => {
                setRightAnswer(e.target.value);
              }}
            ></textarea>
            <div className={classes.cover_bar}></div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
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
      <div className={classes.info_input_area}>
        <div className={classes.info_input}>
          <input
            className={classes.input_tag}
            type="text"
            maxlength="10"
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
            maxlength="10"
            inputMode="numeric"
            placeholder="*비밀번호를 입력하세요 (최대 10자)"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="button"
          className={classes.regist_btn}
          value="등록하기"
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
