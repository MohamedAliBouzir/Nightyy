import React, { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Chart, { IChartOptions } from '../../../components/extras/Chart';

const CommonSalePerformance = (props: any) => {
	const [chartOptions] = useState<IChartOptions>({
		options: {
			chart: {
				height: 400,
				type: 'area',
				toolbar: {
					show: false,
				},
			},
			colors: [
				process.env.REACT_APP_SUCCESS_COLOR,
				process.env.REACT_APP_INFO_COLOR,
				process.env.REACT_APP_DANGER_COLOR,
			],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
			},
			yaxis: {
				min: 0,
				labels: {
					formatter: (val) => val.toFixed(0)
				}
			},
			tooltip: {
				theme: 'dark',
			},
			xaxis: {
				type: 'numeric',
				labels: {
					formatter: (value) => `${parseInt(value).toFixed(0)} s`,
				},
			},
			fill: {
				type: 'gradient',
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.5,
					opacityTo: 0,
					stops: [0, 100],
				},
			},
		},
		series: props.seriesData,
	});

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='DataExploration'>
					<CardTitle>
						{props.component_title} <small> - {props.component_category} </small>
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<Chart
					series={chartOptions.series}
					options={chartOptions.options}
					type={chartOptions.options.chart?.type}
					height={chartOptions.options.chart?.height}
				/>
			</CardBody>
		</Card>
	);
};

export default CommonSalePerformance;
