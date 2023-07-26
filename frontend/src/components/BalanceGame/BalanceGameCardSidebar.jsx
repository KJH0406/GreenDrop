import classes from "./BalanceGameCardSidebar.module.css"

function BalanceGameCardSidebar({ menu }) {
  return (
    <div
      className={`${classes.sidbar_item}`}
      onClick={() => {
        //수정이면 수정 모달
        //삭제면 삭제 모달
        // menu.name=="수정"?
      }}
    >
      {menu.name}
    </div>
  )
}

export default BalanceGameCardSidebar
