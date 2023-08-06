import BalanceGameCategory from "./BalanceGameCategory";
import classes from "./BalanceGameCategoryList.module.css";

function BalanceGameCategoryList(props) {
  console.log(props.categories);

  return (
    <>
      <div className={classes.recommend}>
        <div
          className={props.isLikeSelected ? classes.box_selected : classes.box}
          onClick={() => {
            const updatedIsCategorySelected = [...props.isCategorySelected];
            updatedIsCategorySelected.fill(false);
            props.setIsCategorySelected(updatedIsCategorySelected);
            props.setSelectedCategoryItem(null);
            props.setIsLikeSelected(!props.isLikeSelected);
            props.likeList(!props.isLikeSelected);
          }}
        >
          좋아요
        </div>
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
                const temp = updatedIsCategorySelected[idx];
                updatedIsCategorySelected.fill(false);
                updatedIsCategorySelected[idx] = !temp;
                props.setIsLikeSelected(false);

                props.setIsCategorySelected(updatedIsCategorySelected);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default BalanceGameCategoryList;
