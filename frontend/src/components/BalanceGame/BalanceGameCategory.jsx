import classes from "./BalanceGameCategory.module.css";

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
        selectedCategory(category, isCategorySelected);
      }}
    >
      {category}
    </div>
  );
}
export default BalanceGameCategory;
