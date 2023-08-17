import classes from "./BalanceGameCategory.module.css";

function BalanceGameCategory({
  category,
  selectedCategory,
  isCategorySelected,
  setIsCategorySelected,
}) {
  return (
    <div
      className={isCategorySelected ? classes.box_selected : classes.box}
      onClick={() => {
        setIsCategorySelected();
        selectedCategory(category, isCategorySelected);
      }}
    >
      {category}
    </div>
  );
}
export default BalanceGameCategory;
