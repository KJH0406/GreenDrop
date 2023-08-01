import classes from "./BalanceGameCategory.module.css"
import { useState } from "react"

function BalanceGameCategory({ category }) {
  let [isSelected, setIsSelected] = useState(false)
  return (
    <div
      className={isSelected ? classes.box_selected : classes.box}
      onClick={() => {
        setIsSelected(!isSelected)
      }}
    >
      {category}
    </div>
  )
}
export default BalanceGameCategory
