import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentImg from "../../assets/commentpng.png";
import emptyHeartImg from "../../assets/empty_heartpng.png";
import fullHeartImg from "../../assets/full_heartpng.png";
import menuImg from "../../assets/list_menu.png";
import { toggleIsOpenComment, changeBoardSeq } from "../../store";
import classes from "./BalanceGameCard.module.css";
import BalanceGameCardSidebarList from "./BalanceGameCardSidebarList";

function BalanceGameCard({
  card,
  isSidebarOpen,
  setSidebarOpen,
  isModify,
  setIsModify,
}) {
  // 카드별로 독립적인 isSidebarOpen 상태를 관리합니다.
  // const [SidebarOpen, setSidebarOpen] = useState(false)
  const [commentCnt] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });
  const dispatch = useDispatch();

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
              setIsModify={setIsModify}
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
        <div className={classes.top_item_right}>{card.lastModifiedDate}</div>
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
          {isLiked ? (
            <img
              src={fullHeartImg}
              className={classes.bottom_like_img}
              alt=""
              onClick={() => {
                setIsLiked(!isLiked);
              }}
            />
          ) : (
            <img
              src={emptyHeartImg}
              className={classes.bottom_like_img}
              alt=""
              onClick={() => {
                setIsLiked(!isLiked);
              }}
            />
          )}

          <span className={classes.bottom_like}>{card.likeCount}</span>

          <img
            src={commentImg}
            className={classes.bottom_comment_img}
            alt=""
            onClick={() => {
              console.log("comment");
              //axios로 해당 boardSeq의 댓글 데이터만 store에 저장
              //기존에 조회한 댓글 데이터는 날림 -> 인스타그램도 이렇게 하는듯
              dispatch(changeBoardSeq(card.boardSeq));
              dispatch(toggleIsOpenComment(isOpenComment.isOpenComment));
            }}
          />
          {/* 댓글 수 출력 어떻게 할 지 고민 */}
          <span className={classes.bottom_comment}>{commentCnt}</span>
        </div>
        <div className={classes.bottom_right}>{card.item}</div>
      </div>
    </div>
  );
}

export default BalanceGameCard;
