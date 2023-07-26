import classes from "./BalanceGameCard.module.css"
import menuImg from "../../assets/list_menu.png"
// import fullHeartImg from "../../assets/full_heartpng.png"
import emptyHeartImg from "../../assets/empty_heartpng.png"
import commentImg from "../../assets/commentpng.png"
import { useState } from "react"
function BalanceGameCard() {
  // let [likeCnt, setLikeCnt] = useState(0)
  // let [commentCnt, setCommentCnt] = useState(0)
  let [likeCnt] = useState(0)
  let [commentCnt] = useState(0)
  let [category] = useState("#스포츠")

  return (
    <div className={classes.outer_box}>
      <div className={classes.top}>
        <div className={`${classes.top_item_left} ${classes.title}`}>user1</div>
        {/* <div className={classes.top_item_right}></div> */}
        <input
          type="image"
          src={menuImg}
          alt="menu"
          className={`${classes.top_item_right} ${classes.image}`}
          onClick={() => {}}
        />
      </div>
      <div className={classes.top}>
        <div className={`${classes.top_item_left} ${classes.subject}`}>
          메시 vs 호날두aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
        <div className={classes.top_item_right}>2023.07.24</div>
      </div>
      <div className={classes.middle}>
        <div className={`${classes.middle_item} ${classes.middle_item_left}`}>
          <div className={classes.answer}>
            왼쪽 지문 왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽
            지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽
            지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽
            지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽
            지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽 지문왼쪽
            지문왼쪽 지문왼쪽 지문왼쪽 지문
          </div>
          <div className={classes.cover_bar}></div>
        </div>
        <div className={`${classes.middle_item} ${classes.middle_item_right}`}>
          <div className={classes.answer}>
            오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽
            지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽
            지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽
            지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽
            지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽
            지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽 지문오른쪽
            지문오른쪽 지문
          </div>
          <div className={classes.cover_bar}></div>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottom_left}>
          <input
            type="image"
            src={emptyHeartImg}
            className={classes.bottom_like}
            alt=""
          />
          <span className={classes.bottom_like_count}>{likeCnt}</span>

          <input
            type="image"
            src={commentImg}
            className={classes.bottom_comment}
            alt=""
          />
          <span className={classes.bottom_comment_count}>{commentCnt}</span>
        </div>
        <div className={classes.bottom_right}>{category}</div>
      </div>
    </div>
  )
}
export default BalanceGameCard
