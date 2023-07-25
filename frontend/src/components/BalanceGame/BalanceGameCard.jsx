import classes from "./BalanceGameCard.module.css"
import menuImg from "../../assets/list_menu.png"
import fullHeartImg from "../../assets/full_heartpng.png"
import emptyHeartImg from "../../assets/empty_heartpng.png"
import commentImg from "../../assets/commentpng.png"
import { useState } from "react"
function BalanceGameCard() {
  let [likeCnt, setLikeCnt] = useState(0)
  let [commentCnt, setCommentCnt] = useState(0)
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
          지문1
        </div>
        <div className={`${classes.middle_item} ${classes.middle_item_right}`}>
          지문2
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottom_left}>
          <input
            type="image"
            src={emptyHeartImg}
            className={classes.bottom_image}
            onClick={() => {}}
          />
          <span>{likeCnt}</span>

          <input
            type="image"
            src={commentImg}
            className={classes.bottom_image}
            onClick={() => {}}
          />
          <span>{commentCnt}</span>
        </div>
        <div className={classes.bottom_right}>{category}</div>
      </div>
    </div>
  )
}
export default BalanceGameCard
