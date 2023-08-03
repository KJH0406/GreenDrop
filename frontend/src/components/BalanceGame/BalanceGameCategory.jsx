import classes from "./BalanceGameCategory.module.css";
import { useState } from "react";

function BalanceGameCategory({
  category,
  selectedCategory,
  isCategorySelected,
  setIsCategorySelected,
}) {
  // let [isSelected, setIsSelected] = useState(false);
  return (
    <div
      className={isCategorySelected ? classes.box_selected : classes.box}
      onClick={() => {
        // setIsSelected(!isSelected);
        setIsCategorySelected();
        selectedCategory(category);
      }}
    >
      {category}
    </div>
  );
}
export default BalanceGameCategory;
