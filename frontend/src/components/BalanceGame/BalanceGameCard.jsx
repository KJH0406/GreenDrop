import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import commentImg from "../../assets/commentpng.png"
import emptyHeartImg from "../../assets/empty_heartpng.png"
import fullHeartImg from "../../assets/full_heartpng.png"
import menuImg from "../../assets/list_menu.png"
import { toggleIsOpenComment } from "../../store"
import classes from "./BalanceGameCard.module.css"
import BalanceGameCardSidebarList from "./BalanceGameCardSidebarList"
function BalanceGameCard({ card }) {
  let [commentCnt] = useState(0)
  let [isLiked, setIsLiked] = useState(false)
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState)
  }
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment
  })
  const dispatch = useDispatch()
  return (
    <div className={classes.outer_box}>
      <div className={classes.top}>
        <div className={`${classes.top_item_left} ${classes.title}`}>
          {card.nickname}
        </div>
        <div
          onClick={() => {
            toggleSidebar()
            // console.log(isSidebarOpen)
          }}
        >
          <input
            type="image"
            src={menuImg}
            alt="menu"
            className={`${classes.top_item_right} ${classes.image}`}
          />
        </div>

        <div className={classes.card_sidebar}>
          {isSidebarOpen ? <BalanceGameCardSidebarList /> : <></>}
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
          <div
            className={classes.bottom_like}
            onClick={() => {
              setIsLiked(!isLiked)
            }}
          >
            {isLiked ? (
              <input
                type="image"
                src={fullHeartImg}
                className={classes.bottom_like_img}
                alt=""
              />
            ) : (
              <input
                type="image"
                src={emptyHeartImg}
                className={classes.bottom_like_img}
                alt=""
              />
            )}
          </div>
          <span className={classes.bottom_like}>{card.likeCount}</span>
          <div
            className={classes.bottom_like}
            onClick={() => {
              console.log("comment")
              dispatch(toggleIsOpenComment(isOpenComment.isOpenComment))
            }}
          >
            <input
              type="image"
              src={commentImg}
              className={classes.bottom_comment_img}
              alt=""
            />
          </div>
          {/* 댓글 수 출력 어떻게 할 지 고민 */}
          <span className={classes.bottom_comment}>{commentCnt}</span>
        </div>
        <div className={classes.bottom_right}>{card.item}</div>
      </div>
    </div>
  )
}
export default BalanceGameCard
