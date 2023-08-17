import BalanceGameCard from "./BalanceGameCard";
import classes from "./BalanceGameList.module.css";
function BalanceGameList({
  setSelectedBoardSeq,
  cardList,
  isSidebarOpen,
  setIsSidebarOpen,
  setShowCheckModal,
  handleLikeCount,
}) {
  return (
    <div className={classes.board_list}>
      {cardList.map((card, index) => {
        return (
          <BalanceGameCard
            setSelectedBoardSeq={setSelectedBoardSeq}
            key={index}
            card={card}
            isSidebarOpen={isSidebarOpen[index]}
            setSidebarOpen={() => {
              const updatedIsSidebarOpen = [...isSidebarOpen];
              updatedIsSidebarOpen[index] = !updatedIsSidebarOpen[index];
              setIsSidebarOpen(updatedIsSidebarOpen);
            }}
            setShowCheckModal={setShowCheckModal}
            handleLikeCount={handleLikeCount}
          />
        );
      })}
    </div>
  );
}

export default BalanceGameList;
