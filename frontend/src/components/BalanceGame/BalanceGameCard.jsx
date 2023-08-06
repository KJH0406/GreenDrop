import { useDispatch, useSelector } from "react-redux";
import commentImg from "../../assets/commentpng.png";
import emptyHeartImg from "../../assets/empty_heartpng.png";
import menuImg from "../../assets/list_menu.png";
import { toggleIsOpenComment } from "../../store";
import classes from "./BalanceGameCard.module.css";
import BalanceGameCardSidebarList from "./BalanceGameCardSidebarList";

function BalanceGameCard({
  setSelectedBoardSeq,
  card,
  isSidebarOpen,
  setSidebarOpen,
  setShowCheckModal,
  handleLikeCount,
}) {
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });
  const dispatch = useDispatch();
  function timePassed(date) {
    let timeValue = new Date(date);
    let today = new Date();
    // console.log("오늘:", today);
    // console.log("작성시", timeValue);
    // 분을 나타냄
    let time = (today - timeValue) / 1000 / 60;

    if (time < 1) {
      return "방금 전";
    }
    if (time < 60) {
      return parseInt(time) + "분 전";
    }
    time = time / 60; // 시간
    if (time < 24) {
      return parseInt(time) + "시간 전";
    }
    time = time / 24;
    if (time < 7) {
      return parseInt(time) + "일 전";
    }
    return `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일`;
  }
  return (
    <div className={classes.outer_box}>
      <div className={classes.top}>
        <div className={`${classes.top_item_left} ${classes.title}`}>
          {card.nickname}
        </div>

        <img
          alt=""
          src={menuImg}
          className={`${classes.top_item_right} ${classes.bar_image}`}
          onClick={(e) => {
            e.stopPropagation();
            // console.log(isSidebarOpen)
            setSidebarOpen();
          }}
        />

        <div className={classes.card_sidebar}>
          {isSidebarOpen ? (
            <BalanceGameCardSidebarList
              boardSeq={card.boardSeq}
              setShowCheckModal={setShowCheckModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={classes.top}>
        <div className={`${classes.top_item_left} ${classes.subject}`}>
          {card.question}
        </div>
        <div className={classes.top_item_right}>
          {timePassed(card.lastModifiedDate)}
        </div>
      </div>
      <div className={classes.middle}>
        <div className={`${classes.middle_item} ${classes.middle_item_left}`}>
          <div className={classes.answer}>{card.leftAnswer}</div>
          <div className={classes.cover_bar}></div>
        </div>
        <div className={`${classes.middle_item} ${classes.middle_item_right}`}>
          <div className={classes.answer}>{card.rightAnswer}</div>
          <div className={classes.cover_bar}></div>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottom_left}>
          <img
            src={emptyHeartImg}
            className={classes.bottom_like_img}
            alt=""
            onClick={() => {
              setSelectedBoardSeq(card.boardSeq);
              handleLikeCount(card.boardSeq);
              console.log(card);
            }}
          />

          <span className={classes.bottom_like}>{card.likeCount}</span>

          <img
            src={commentImg}
            className={classes.bottom_comment_img}
            alt=""
            onClick={() => {
              console.log("comment");
              //axios로 해당 boardSeq의 댓글 데이터만 store에 저장
              //기존에 조회한 댓글 데이터는 날림 -> 인스타그램도 이렇게 하는듯
              dispatch(toggleIsOpenComment(isOpenComment.isOpenComment));
              setSelectedBoardSeq(card.boardSeq);
            }}
          />
          {/* 댓글 수 출력 어떻게 할 지 고민 */}
          <span className={classes.bottom_comment}>{card.commentCount}</span>
        </div>
        <div className={classes.bottom_right}>{card.item}</div>
      </div>
    </div>
  );
}

export default BalanceGameCard;
