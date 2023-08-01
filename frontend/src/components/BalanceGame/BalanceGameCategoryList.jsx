import classes from "./BalanceGameCategoryList.module.css"
import BalanceGameCategory from "./BalanceGameCategory"
import { useState } from "react"
function BalanceGameCategoryList() {
  let [categories] = useState([
    "인기순",
    "좋아요순",
    "스포츠",
    "요리",
    "인기순",
    "좋아요순",
    "스포츠",
    "요리",
    "인기순",
    "좋아요순",
    "스포츠",
    "요리",
    "인기순",
    "좋아요순",
    "스포츠",
    "요리",
  ])

  return (
    <div className={classes.recommend}>
      {categories.map((category, idx) => {
        return <BalanceGameCategory key={idx} category={category} />
      })}
    </div>
  )
}

export default BalanceGameCategoryList
