import BalanceGameCardSidebar from "./BalanceGameCardSidebar"
import classes from "./BalanceGameCardSidebar.module.css"

function BalanceGameCardSidebarList() {
  const menuList = [{ name: "수정" }, { name: "삭제" }]

  return menuList.map((menu, index) => {
    return (
      <div className={classes.card_sidebar} key={index}>
        <BalanceGameCardSidebar menu={menu} />
      </div>
    )
  })
}
export default BalanceGameCardSidebarList
