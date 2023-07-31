import classes from "./BalanceGameList.module.css"
import BalanceGameCard from "./BalanceGameCard"
import { useSelector } from "react-redux"

function BalanceGameList() {
  const cardList = useSelector((state) => {
    return state.balanceGameList
  })

  return (
    <div className={classes.board_list}>
      {cardList.map((card, index) => {
        return <BalanceGameCard key={index} card={card} />
      })}
      {cardList.map((card, index) => {
        return <BalanceGameCard key={index} card={card} />
      })}
      {cardList.map((card, index) => {
        return <BalanceGameCard key={index} card={card} />
      })}
      {cardList.map((card, index) => {
        return <BalanceGameCard key={index} card={card} />
      })}
      {cardList.map((card, index) => {
        return <BalanceGameCard key={index} card={card} />
      })}
      {cardList.map((card, index) => {
        return <BalanceGameCard key={index} card={card} />
      })}
    </div>
  )
}

export default BalanceGameList
