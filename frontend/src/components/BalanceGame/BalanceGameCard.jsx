import classes from "./BalanceGameCard.module.css"
function BalanceGameCard() {
  return (
    <div className={classes.outer_box}>
      <div className={classes.top}>
        <div className={classes.top_item_left}>user1</div>
        <div className={classes.top_item_right}>메뉴</div>
      </div>
      <div className={classes.top}>
        <div className={classes.top_item_left}>메시 vs 호날두</div>
        <div className={classes.top_item_right}>2023.07.24</div>
      </div>
      <div className={classes.middle}>
        <div className={classes.middle_item}>지문1</div>
        <div className={classes.middle_item}>지문2</div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottom_left}>
          좋아요, 좋아요 수, 댓글, 댓글 수
        </div>
        <div className={classes.bottom_right}>카테고리</div>
      </div>
    </div>
  )
}
export default BalanceGameCard
