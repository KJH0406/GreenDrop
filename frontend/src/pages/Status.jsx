import classes from "./Status.module.css";
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function StatusPage() {
  let date = new Date();

  const [weeklyOptions] = useState({
    series: [{
      name: '일주일',
      data: [
        {
          x: '07/21',
          y: 292,
        },
        {
          x: '07/22',
          y: 777,
        },
        {
          x: '07/23',
          y: 456,
        },
        {
          x: '07/24',
          y: 486,
        },
        {
          x: '07/25',
          y: 666,
        },
        {
          x: '07/26',
          y: 175,
        },
        {
          x: '07/27',
          y: 102,
        },
      ],
    },
    ],
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: true,
    },
    chart: {
      toolbar: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: '수거된 플라스틱 개수'
      }
    }
  });

  const [dailyOptions] = useState({
    series: [{
      name: '오늘',
      data: [ 29, 15, 12, 77, 29, 33, 0, 0, 0, 0, 0 ]
    }],
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
    xaxis: {
      categories: ['9시', '10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시'],
    },
    yaxis: {
      title: {
        text: '수거된 플라스틱 개수'
      },
    }
  });

  return (
    <div className={classes.chart_page}>
      <div className={classes.title}>
        <div className={classes.green}>오늘</div> 수거량
      </div>
      (측정시간 기준 : { date.getHours() }시 {date.getMinutes()}분)
      <div className={classes.chart}>
        <ReactApexChart className={classes.bars} options={dailyOptions} series={dailyOptions.series} type="line" width="100%" height="100%" />
      </div>
      <div className={classes.title}>
        <div className={classes.green}>일주일</div> 수거량
      </div>
      <div className={classes.chart}>
        <ReactApexChart className={classes.bars} options={weeklyOptions} series={weeklyOptions.series} type="bar" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default StatusPage;
