import classes from "./BalanceGameList.module.css"
import BalanceGameCard from "./BalanceGameCard"
function BalanceGameList() {
  return (
    <div className={classes.board_list}>
      <BalanceGameCard />
      <BalanceGameCard />
      <BalanceGameCard />
      <BalanceGameCard />
    </div>
  )
}

export default BalanceGameList
