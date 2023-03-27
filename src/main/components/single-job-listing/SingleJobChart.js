import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SingleJobChart = ({ data }) => {
	const { labels, series } = data;

	const pieSeries = series;
	const options = {
		chart: {
			type: 'donut',
		},
		stroke: {
			width: 0,
		},
		plotOptions: {
			pie: {
				startAngle: 0,
				endAngle: 360,
			},
		},
		labels: labels,
		dataLabels: {
			enabled: true,
			textAnchor: 'middle',
		},
		fill: {
			type: 'solid',
		},
		colors: [' #7BB3FA ', '#FAE9DF', '#CBE1FD'],
		legend: {
			formatter: function (val, opts) {
				return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
			},
			position: 'bottom',
		},
		title: {
			text: `Total Students Chart`,
			align: 'center',
			style: {
				fontSize: '10px',
			},
		},
	};

	return (
		<div
			id="chart"
			className="grid place-items-center text-white text-xs ext-center"
		>
			<ReactApexChart
				options={options}
				series={pieSeries}
				type="pie"
				height={400}
				className="w-full h-full grid place-items-center"
			/>
		</div>
	);
};

export default SingleJobChart;
