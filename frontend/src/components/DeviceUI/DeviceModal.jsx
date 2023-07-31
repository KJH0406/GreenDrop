import classes from "./DeviceModal.module.css";

function DeviceModal(props) {
  const title = props.device.title;
  // 없으면 빈값
  const content = props.device.content || "";
  const color = props.device.color || "";
  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>{title}</div>
      <div
        style={{ color: `${color}` }}
        className={classes.device_modal_content}
      >
        {content}
      </div>
    </div>
  );
}

export default DeviceModal;
