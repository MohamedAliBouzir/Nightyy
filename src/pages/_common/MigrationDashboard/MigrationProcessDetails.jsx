import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import classNames from 'classnames';

const MigrationProcessDetails = () => {
	const chartRef = useRef(null);
	const [extracted, setExtracted] = useState([]);
	const [transformed, setTransformed] = useState([]);
	const [loading, setLoading] = useState([]);

	useEffect(() => {
		const socket = new WebSocket(
			`${process.env.REACT_APP_REAL_TIME_URL}${process.env.REACT_APP_PROCESS_PATH}`,
		);
		socket.onmessage = (event) => {
			const newData = event.data;
			const values = newData.split(',');
			setExtracted((prevData) => [...prevData, values[0]]);
			setTransformed((prevData) => [...prevData, values[1]]);
			setLoading((prevData) => [...prevData, values[2]]);
		};

		return () => {
			socket.close();
		};
	}, []);

	useEffect(() => {
		if (chartRef.current && extracted.length > 0) {
			const chartOptions = {
				chart: {
					id: 'realtime-chart',
					height: 350,
					type: 'area',
					toolbar: {
						show: false,
					},
					animations: {
						enabled: false,
						easing: 'linear',
						dynamicAnimation: {
							speed: 1000,
						},
					},
				},
				colors: [
					process.env.REACT_APP_SUCCESS_COLOR,
					process.env.REACT_APP_INFO_COLOR,
					process.env.REACT_APP_DANGER_COLOR,
				],
				plotOptions: {
					candlestick: {
						colors: {
							upward: process.env.REACT_APP_SUCCESS_COLOR,
							downward: process.env.REACT_APP_DANGER_COLOR,
						},
					},
					boxPlot: {
						colors: {
							upper: process.env.REACT_APP_SUCCESS_COLOR,
							lower: process.env.REACT_APP_DANGER_COLOR,
						},
					},
				},
				dataLabels: {
					enabled: false,
				},
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						opacityFrom: 0.7,
						opacityTo: 0,
						stops: [0, 100],
					},
				},
				storke: {
					curve: 'smooth',
				},
				tooltip: {
					theme: 'dark',
				},
				xaxis: {
					type: 'numeric',
					labels: {
						formatter: (value) => `${value.toFixed(0)} s`,
					},
				},
				series: [
					{
						name: 'Extracted chunks',
						data: extracted.map((_, index) => [index, 0]),
					},
					{
						name: 'Transformed chunks',
						data: transformed.map((_, index) => [index, 0]),
					},
					{
						name: 'Loading chunks',
						data: loading.map((_, index) => [index, 0]),
					},
				],
			};

			const chart = new ApexCharts(chartRef.current, chartOptions);
			chart.render();

			const updateData = () => {
				chart.updateSeries([
					{
						data: extracted.map((value, index) => [index, value]),
					},
					{
						data: transformed.map((value, index) => [index, value]),
					},
					{
						data: loading.map((value, index) => [index, value]),
					},
				]);
			};

			updateData();

			const interval = setInterval(() => {
				updateData();
			}, 1000);

			return () => {
				clearInterval(interval);
				chart.destroy();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [extracted]);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='DataExploration'>
					<CardTitle>
						Process tracking <small> - performance</small>
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='position-relative'>
					<div className={classNames('apex-chart')}>
						<div ref={chartRef} />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MigrationProcessDetails;
