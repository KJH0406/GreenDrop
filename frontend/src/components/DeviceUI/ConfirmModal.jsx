import classes from "./ConfirmModal.module.css";

function ConfirmModal() {
  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>
        내용물을 확인 중 입니다...
      </div>
      <div className={classes.device_modal_content}>
        확인 중에 플라스틱 컵을 움직이지 말아주세요!
      </div>
    </div>
  );
}

export default ConfirmModal;
