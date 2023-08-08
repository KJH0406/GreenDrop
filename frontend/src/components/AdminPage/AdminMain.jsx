import classes from "./AdminMain.module.css";
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function AdminMain() {
  let [dailyOptions, setDailyOptions] = useState({
    series: [{
      name: '',
      data: [{}],
    },
    ],
    chart: {
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
        curve: 'smooth'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
  });

  let [todayStatus, setTodayStatus] = useState([{ question: "" }, { leftAnswer: "" }, { rightAnswer: "" }, { leftCount: "" }, { rightCount: "" }]);
  let labels = useState(['왼쪽', '오른쪽']);

  let [todayOptions, setTodayOptions] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      labels: labels,
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    },
  })

  useEffect(() => {
    let date = new Date();
    let now = date.toISOString().slice(0, 10);

    axios
      .get(`https://i9b103.p.ssafy.io/api/plastic/list/week`)
      .then((result) => {
        setDailyOptions((dailySeries) => {
          return {
            ...dailySeries, series: [{
              ...dailySeries.series[0],
              data: result.data
            }],
          };
        });
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });
    
    axios
      .get(`https://i9b103.p.ssafy.io/api/game/${now}`) 
      .then(result => {
        setTodayStatus((balanceGame) => {
          return [
          { ...balanceGame[0], question: result.data.question },
          { ...balanceGame[1], leftAnswer: result.data.leftAnswer },
          { ...balanceGame[2], rightAnswer: result.data.rightAnswer },
          { ...balanceGame[3], leftCount: result.data.leftCount },
          { ...balanceGame[4], rightCount: result.data.rightCount },
          ];
        });
        setTodayOptions((todaySeries) => {
          return {
            ...todaySeries,
            series: [result.data.leftCount, result.data.rightCount],
            options: {
              ...todaySeries.options,
              labels: [`1번 선택지 : ${result.data.leftCount}개`, `2번 선택지 : ${result.data.rightCount}개`],
            },
          };
        });
      })
      .catch(() => {
        alert("집계에 오류가 있습니다.");
      });
  }, []);

  return (
    <div className={classes.admin_main_container}>
      <div className={classes.today_section}>
        <div className={classes.today_chart}>
          { todayStatus[4].rightCount + todayStatus[3].leftCount !== 0 ?
            <ReactApexChart options={todayOptions.options} series={todayOptions.series} type="donut" width="100%" height="100%"></ReactApexChart>
            : "아직 집계된 정보가 없습니다." }
        </div>
        <hr />
        <div className={classes.balance_game}>
          <div className={classes.text_section}>
            <div className={classes.balance_game_text}>밸런스 게임 질문</div>
            <div className={classes.question}>
              {todayStatus[0].question}
            </div>
          </div>
          <div className={classes.text_section}>
            <div className={classes.balance_game_text}>1번 선택지</div>
            <div className={classes.leftAnswer}>
              {todayStatus[1].leftAnswer}
            </div>
          </div>
          <div className={classes.text_section}>
            <div className={classes.balance_game_text}>2번 선택지</div>
            <div className={classes.rightAnswer}>
              {todayStatus[2].rightAnswer}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.chart_section}>
        <div className={classes.chart}>
          <div className={classes.chart_title}>
            수거현황
          </div>
          <hr />
          <div className={classes.chart_image}>
            <ReactApexChart className={classes.bars} options={dailyOptions} series={dailyOptions.series} type="line" width="100%" height="100%" />
          </div>
        </div>
        <div className={classes.chart_detail}>
          <table className={classes.chart_table}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>수거량</th>
              </tr>
            </thead>
            <tbody>
              {dailyOptions.series[0].data.map(({ x, y }, idx) => (
                <tr key={idx}>
                  <td>{x}</td>
                  <td>{y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
