// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import Card, {
	CardBody,
	CardHeader,
	CardTitle,
	CardLabel,
} from '../../../components/bootstrap/Card';
import classNames from 'classnames';

const MigrationRessourceUsage = (props) => {
	const chartRef = useRef(null);
	const [ressourceData, setressourceData] = useState([]);

	useEffect(() => {
		const socket = new WebSocket(
			`${process.env.REACT_APP_REAL_TIME_URL}${props.componentPath}`,
		);
		socket.onmessage = (event) => {
			const newData = event.data;
			const values = newData.split(',');
			setressourceData((prevData) => [...prevData, values[0]]);
		};

		return () => {
			socket.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (chartRef.current && ressourceData.length > 0) {
			const chartOptions = {
				chart: {
					id: 'realtime-chart',
					height: 138,
					type: 'area',
					sparkline: {
						enabled: true,
					},
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
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						opacityFrom: 0.7,
						opacityTo: 0,
						stops: [0, 100],
					},
				},
				colors: [props.componentColor],
				dataLabels: {
					enabled: false,
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
						name: 'Memory Usage',
						data: ressourceData.map((_, index) => [index, 0]),
					},
				],
			};

			const chart = new ApexCharts(chartRef.current, chartOptions);
			chart.render();

			const updateData = () => {
				chart.updateSeries([
					{
						data: ressourceData.map((value, index) => [index, value]),
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
	}, [ressourceData]);

	return (
		<Card>
			<CardHeader>
				<CardLabel icon={props.componentIcon}>
					<CardTitle>
						{props.componentTitle} <small> - {props.componentCategory}</small>
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='h-100'>
				<div className='h-100'>
					<div className='position-relative'>
						<div className={classNames('apex-chart')}>
							<div ref={chartRef} />
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default MigrationRessourceUsage;
