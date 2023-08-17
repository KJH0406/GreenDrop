import axios from "axios";
import classes from "./AdminGameHistory.module.css";
import { useState, useEffect } from "react";
function AdminGameHistory() {
  const api = "https://i9b103.p.ssafy.io/api";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  //너무 길면 생략
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/game/list`)
      .then((response) => {
        setGameHistory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h2 className={classes.left_pos}>지난 밸런스 게임</h2>
      <table className={classes.admin_board_table}>
        <thead>
          <tr className={classes.admin_board_heading}>
            <th className={classes.left_pos}>게임 번호</th>
            <th className={classes.left_pos}>주제</th>
            <th className={classes.left_pos}>왼쪽 선택지</th>
            <th className={classes.left_pos}>오른쪽 선택지</th>
            <th className={classes.left_pos}>왼쪽 수거량</th>
            <th className={classes.left_pos}>오른쪽 수거량</th>
            <th className={classes.left_pos}>닉네임</th>
            <th className={classes.left_pos}>날짜</th>
            <th className={classes.left_pos}>등록 날짜</th>
          </tr>
        </thead>
        <tbody>
          {gameHistory.map((game, idx) => {
            return (
              <tr key={idx}>
                <td className={classes.right_pos}>
                  {game.gameSeq?.toLocaleString("ko-KR")}
                </td>
                <td className={classes.left_pos}>
                  {truncateText(game.question)}
                </td>
                <td className={classes.left_pos}>
                  {truncateText(game.leftAnswer)}
                </td>
                <td className={classes.left_pos}>
                  {truncateText(game.rightAnswer)}
                </td>
                <td className={classes.right_pos}>
                  {game.leftCount?.toLocaleString("ko-KR")}
                </td>
                <td className={classes.right_pos}>
                  {game.rightCount?.toLocaleString("ko-KR")}
                </td>
                <td className={classes.left_pos}>
                  {truncateText(game.nickname)}
                </td>
                <td className={classes.right_pos}>
                  {game.date ? formatDate(new Date(game.date)) : <></>}
                </td>
                <td className={classes.right_pos}>
                  {game.date ? formatDate(new Date(game.createdDate)) : <></>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminGameHistory;
