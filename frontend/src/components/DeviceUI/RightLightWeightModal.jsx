import classes from "./RightLightWeightModal.module.css";

function RightLightWeightModal() {
  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>
        플라스틱 컵만
        <br /> 올려주세요!
      </div>
    </div>
  );
}

export default RightLightWeightModal;
