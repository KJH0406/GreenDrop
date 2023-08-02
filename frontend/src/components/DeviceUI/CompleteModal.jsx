import classes from "./CompleteModal.module.css";

function CompleteModal() {
  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>수거가 완료되었습니다!</div>
      <div className={classes.device_modal_content}>
        오늘도 환경보호에 앞장서는 당신은 우리의 환경히어로 🌱
      </div>
    </div>
  );
}

export default CompleteModal;
