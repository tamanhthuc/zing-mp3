import  IsongProps  from '../../types/Song.type'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from '@mui/system';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { setRunning } from '../../redux/actions/music';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IMusciProps {
  songNew: IsongProps | undefined;
}

export default function   Chart({ songNew }: IMusciProps) {
  const dispatch = useDispatch();

  const getOrCreateTooltip = (chart: any) => {
    let tooltipEL = chart.canvas.parentNode.querySelector('#chartjs-tooltip');
    
    chart.canvas.parentNode.appendChild(tooltipEL);
   
    return tooltipEL;
  };
  const externalTooltipHandler = (context: any) => {
    const { chart, tooltip } = context;
    
    const tooltipEl = getOrCreateTooltip(chart);
   
    // console.log(tooltipEl)
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }
    const position = context.chart.canvas.getBoundingClientRect();
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = 'absolute';

  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },

      tooltip: {
        enabled: false,
        backgroundColor: 'red',
        external: externalTooltipHandler,
        
      },
    },
    
    scales: {
      y: {
        display: false,
      },
      y1: {
        display: false,
      },
      y2: {
        display: false,
      },
    },
  };

  const labels = [
    '17:00',
    '19:00',
    '21:00',
    '23:00',
    '01:00',
    '03:00',
    '05:00',
    '07:00',
    '09:00',
    '11:00',
    '13:00',
    '15:00',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [55, 55, 60, 65, 40, 40, 45, 67, 76, 78, 89, 90],
        borderColor: 'rgb(74, 144, 226)',
        backgroundColor: 'rgba(74, 144, 226,0.5)',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 6,
        pointHitRadius: 20,
        yAxisID: 'y',
        tension: 0.5,
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverRadius: 8,
      },
      {
        label: 'Dataset 2',
        data: [45, 60, 60, 65, 50, 42, 65, 67, 56, 78, 69, 70],
        borderColor: 'rgb(227, 80, 80)',
        backgroundColor: 'rgba(227, 80, 80, 0.5)',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 6,
        pointHitRadius: 20,
        yAxisID: 'y1',
        tension: 0.5,
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverRadius: 8,
      },
      {
        label: 'Dataset 3',
        data: [30, 40, 60, 65, 75, 40, 45, 67, 69, 68, 86, 65],
        borderColor: 'rgba(39, 189, 156, 1)',
        backgroundColor: 'rgba(39, 189, 156, 0.5)',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 6,
        pointHitRadius: 20,
        yAxisID: 'y3',
        tension: 0.5,
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverRadius: 8,
      },
    ],
  };
  const handleRandom = () => {
    dispatch(setRunning(songNew));
  };
  return (
    <div className="chart">
      <div className="chart__title">
        #zingchart
        <div className="chart__title__icon">
          <PlayArrowIcon className="chart__title__icon__item" onClick={handleRandom} />
        </div>
      </div>
      <Line options={options} data={data} height="100%" className="chart__line" />;
      <div id="chartjs-tooltip">
        <div className="song__data ">
          <div className="song__data__left">
            <Box
              component="img"
              className="song__data__left__thumb"
              src="https://avatar-ex-swe.nixcdn.com/song/share/2019/08/28/d/6/4/0/1566988500226.jpg"
              alt=""
            />
          </div>
          <div className="song__data__info ">
            <span className="song__data__info__title">...</span>
            <span className="song__data__info__artists">Hương ly</span>
          </div>
          <div className="song__data__right">
            <span>46</span>
          </div>
        </div>
      </div>
    </div>
  );
}