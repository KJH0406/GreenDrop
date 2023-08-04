import classes from "./BalanceGameCategoryList.module.css";
import BalanceGameCategory from "./BalanceGameCategory";
import { useState } from "react";
function BalanceGameCategoryList(props) {
  console.log(props.categories);
  return (
    <div className={classes.recommend}>
      {props.categories.map((category, idx) => {
        return (
          <BalanceGameCategory
            key={idx}
            category={category.item}
            selectedCategory={props.selectedCategory}
            isCategorySelected={props.isCategorySelected[idx]}
            // 해당 카테고리의 상태를 변경하도록 setIsCategorySelected 함수를 호출합니다.
            setIsCategorySelected={() => {
              // 배열을 복사하여 해당 카테고리의 상태만 변경합니다.
              const updatedIsCategorySelected = [...props.isCategorySelected];
              updatedIsCategorySelected[idx] = !updatedIsCategorySelected[idx];
              props.setIsCategorySelected(updatedIsCategorySelected);
            }}
          />
        );
      })}
    </div>
  );
}

export default BalanceGameCategoryList;
