import classes from "./ServiceChat.module.css";

function ServiceChat() {
  return (
    <div>
      <div className={classes.down}>
        <div className={classes.down_image}></div>
      </div>
      <div className={classes.service_chat_container}>
        <div className={classes.service_chat_title}>
          <div>우리 서비스는</div>
          <div>
            <span style={{ color: "green" }}>분리수거 동참 캠페인</span>
            <span>을 통해</span>
          </div>
          <div>사회의 의미 있는 변화를 만들고자 노력합니다</div>
        </div>
        <div className={classes.service_chat_box}>
          <div className={classes.service_chat_box_top}>
            <div
              className={classes.service_chat_item}
              style={{ borderBottomLeftRadius: " 0px" }}
            >
              <span style={{ fontWeight: "bold" }}>IoT 센서</span>
              <span>
                를 통해 <br />
                깨끗한 플라스틱 컵을 수거합니다
              </span>
            </div>
          </div>
          <div className={classes.service_chat_box_middle}>
            <div
              className={classes.service_chat_item}
              style={{ borderBottomRightRadius: " 0px" }}
            >
              <span style={{ fontWeight: "bold" }}>환경 보호</span>
              <span>
                에 관한 <br />
                다양한 스토리를 제공합니다
              </span>
            </div>
          </div>
          <div className={classes.service_chat_box_bottom}>
            <div
              className={classes.service_chat_item}
              style={{ borderBottomLeftRadius: " 0px" }}
            >
              <span style={{ fontWeight: "bold" }}>분리배출 가이드</span>
              <span>
                를 제공하여 <br />
                올바른 분리수거 배출을 돕습니다
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceChat;
