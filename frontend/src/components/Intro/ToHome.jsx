import { useNavigate } from "react-router-dom";
import classes from "./ToHome.module.css";

function ToHome() {
  const navigate = useNavigate();
  return (
    <div className={classes.tohome_container}>
      <div className={classes.tohome_title}>
        <span style={{ color: "green" }}>Green</span> Drop 서비스 이용하기
      </div>
      <div
        className={classes.click_img}
        onClick={() => {
          navigate("/home");
        }}
      ></div>
      <div className={classes.tohome_sub_title}>
        <p>자라나는 새싹을 클릭해보세요! : )</p>
      </div>
    </div>
  );
}

export default ToHome;
