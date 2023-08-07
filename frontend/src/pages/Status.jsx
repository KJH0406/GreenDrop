import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./Status.module.css";

function StatusPage() {
  let date = new Date();

  const [weeklyOptions, setWeeklyOptions] = useState({
    series: [
      {
        name: "일주일",
        data: [],
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: ["#00E396"],
    dataLabels: {
      enabled: true,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "수거된 플라스틱 개수",
      },
    },
  });

  const [dailyOptions, setDailyOptions] = useState({
    series: [
      {
        name: "오늘",
        data: [],
      },
    ],
    chart: {
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#00E396"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "9시",
        "10시",
        "11시",
        "12시",
        "13시",
        "14시",
        "15시",
        "16시",
        "17시",
        "18시",
        "19시",
      ],
    },
    yaxis: {
      title: {
        text: "수거된 플라스틱 개수",
      },
    },
  });

  useEffect(() => {
    let date = new Date();
    let now = date.toISOString().slice(0, 10);

    axios
      .get(`https://i9b103.p.ssafy.io/api/plastic/list/data/${now}`)
      .then((result) => {
        setDailyOptions((dailySeries) => {
          return {
            ...dailySeries,
            series: [
              {
                ...dailySeries.series[0],
                data: result.data,
              },
            ],
          };
        });
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });

    axios
      .get("https://i9b103.p.ssafy.io/api/plastic/list/week")
      .then((result) => {
        setWeeklyOptions((weeklySeries) => {
          return {
            ...weeklySeries,
            series: [
              {
                ...weeklySeries.series[0],
                data: result.data,
              },
            ],
          };
        });
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });
  }, []);

  return (
    <div className={classes.chart_page}>
      <div className={classes.title}>
        <div className={classes.green}>오늘</div> 수거량
      </div>
      (측정시간 기준 : {date.getHours()}시 {date.getMinutes()}분)
      <div className={classes.chart}>
        <ReactApexChart
          className={classes.bars}
          options={dailyOptions}
          series={dailyOptions.series}
          type="line"
          width="100%"
          height="100%"
        />
      </div>
      <div className={classes.title}>
        <div className={classes.green}>일주일</div> 수거량
      </div>
      <div className={classes.chart}>
        <ReactApexChart
          className={classes.bars}
          options={weeklyOptions}
          series={weeklyOptions.series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default StatusPage;
