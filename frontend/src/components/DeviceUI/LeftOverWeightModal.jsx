import classes from "./LeftOverWeightModal.module.css";

function LeftOverWeightModal() {
  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>내용물을 비워주세요!</div>
      <div className={classes.device_modal_content}>
        음료, 얼음, 컵홀더 등을 비운 후<br /> 다시 시도해주세요!
      </div>
    </div>
  );
}

export default LeftOverWeightModal;
