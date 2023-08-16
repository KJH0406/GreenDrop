import React, { useEffect, useState } from "react";

const Test = ({}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:8888/events");

    eventSource.onopen = () => {
      // 연결 시 할 일
    };

    eventSource.onmessage = async (e) => {
      console.log(e);
      const res = e.data;

      try {
        const parsedData = res;
        // 받아오는 data로 할 일
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // JSON 파싱에 실패한 경우에 대한 처리
      }
    };

    eventSource.onerror = (e) => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();

      if (e.error) {
        // 에러 발생 시 할 일
      }

      if (e.target.readyState === EventSource.CLOSED) {
        // 종료 시 할 일
      }
    };

    return () => {
      // 컴포넌트가 언마운트될 때 EventSource를 정리
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {/* data를 사용하여 화면에 표시 */}
      <ul>{data}</ul>
    </div>
  );
};

export default Test;
