import BalanceGameCard from "./BalanceGameCard";
import classes from "./BalanceGameList.module.css";
function BalanceGameList({
  cardList,
  isSidebarOpen,
  setIsSidebarOpen,
  isModify,
  setIsModify,
}) {
  // 카드별로 독립적인 isSidebarOpen 상태를 관리하기 위한 배열을 만듭니다.
  return (
    <div className={classes.board_list}>
      {cardList.map((card, index) => {
        return (
          <BalanceGameCard
            key={index}
            card={card}
            // 현재 카드의 isSidebarOpen 상태를 전달합니다.
            isSidebarOpen={isSidebarOpen[index]}
            // 해당 카드의 상태를 변경하도록 setSidebarOpen 함수를 호출합니다.
            setSidebarOpen={() => {
              // 배열을 복사하여 해당 카드의 상태만 변경합니다.
              const updatedIsSidebarOpen = [...isSidebarOpen];
              updatedIsSidebarOpen[index] = !updatedIsSidebarOpen[index];
              setIsSidebarOpen(updatedIsSidebarOpen);
            }}
            isModify={isModify}
            setIsModify={setIsModify}
          />
        );
      })}
    </div>
  );
}

export default BalanceGameList;
