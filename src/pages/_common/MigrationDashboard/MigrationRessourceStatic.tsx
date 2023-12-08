import React, {useState} from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Chart, { IChartOptions } from '../../../components/extras/Chart';

const MigrationRessourceStatic = (props:any) => {
	const [data] = useState<IChartOptions>({
		series: [
			{
				name: props.component_title,
				data: props.series_data,
			},
		],
		options: {
			chart: {
				type: 'area',
				height: '138',
				sparkline: {
					enabled: true,
				},
			},
			stroke: {
				curve: 'smooth',
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
			// xaxis: {
			// 	crosshairs: {
			// 		width: 1,
			// 	},
			// 	categories: props.categories_data,
			// },
			yaxis: {
				min: 0,
			},
			tooltip: {
				theme: 'dark',
			},
			title: {
				offsetX: 0,
				offsetY: 15,
				style: {
					fontSize: '1.25rem',
					color: 'var(--bs-body-color)',
				},
				text: props.component_title,
			},
			subtitle: {
				offsetX: 0,
				offsetY: 35,
				style: {
					fontSize: '0.9rem',
					color: 'var(--bs-gray)',
				},
				text: props.component_category,
			},
			colors: [props.color_info],
		},
	});
	return (
			<Card>
				<CardBody className='h-100'>
					<Chart
						series={data.series}
						options={data.options}
						type={data.options.chart?.type}
						height={data.options.chart?.height}
						className='h-100'
					/>
				</CardBody>
			</Card>
	);
};

export default MigrationRessourceStatic;
