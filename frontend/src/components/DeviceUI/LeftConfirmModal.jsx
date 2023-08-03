import classes from "./LeftConfirmModal.module.css";

function LeftConfirmModal() {
  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>
        내용물을 확인 중 입니다...
      </div>
      <div className={classes.device_modal_content}>
        컵을 움직이지 말아주세요!
      </div>
    </div>
  );
}

export default LeftConfirmModal;
