import React, { useState, useEffect } from "react";
import classes from "./RightCompleteModal.module.css";

function RightCompleteModal() {
  // 랜덤으로 표시될 문장들의 배열
  const modalContentList = [
    "오늘도 환경보호에 앞장서는 당신은 우리의 환경히어로 🌱",
    "우리가 살고 있는 지구, 우리가 함께 지켜요 🌿",
    "작은 일상의 환경 실천이 큰 변화를 만듭니다🌍",
    "환경을 사랑하는 마음, 소중히 간직해주세요⭐",
    "지구를 지키는 일은 우리 모두의 책임입니다👍",
    "하나뿐인 지구, 사랑하고 지켜주세요💚",
  ];

  // 랜덤으로 선택된 문장을 보관할 상태 변수
  const [randomModalContent, setRandomModalContent] = useState("");

  // 페이지 로드 시 랜덤 문장 선택
  useEffect(() => {
    getRandomModalContent();
  }, []);

  // 랜덤 문장 선택 함수
  const getRandomModalContent = () => {
    const randomIndex = Math.floor(Math.random() * modalContentList.length);
    setRandomModalContent(modalContentList[randomIndex]);
  };

  return (
    <div className={classes.device_modal_container}>
      <div className={`${classes.device_modal_img} `}></div>
      <div className={classes.device_modal_title}>수거가 완료되었습니다!</div>
      <div className={classes.device_modal_content}>{randomModalContent}</div>
    </div>
  );
}

export default RightCompleteModal;
