import BalanceGameCategory from "./BalanceGameCategory";
import classes from "./BalanceGameCategoryList.module.css";

function BalanceGameCategoryList(props) {
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
          좋아요 순
        </div>
        {props.categories.map((category, idx) => {
          return (
            <BalanceGameCategory
              key={idx}
              category={category.item}
              selectedCategory={props.selectedCategory}
              isCategorySelected={props.isCategorySelected[idx]}
              setIsCategorySelected={() => {
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
