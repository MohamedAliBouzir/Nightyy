import React, { useState } from 'react'
import Card, { CardHeader, CardLabel, CardTitle, CardSubTitle, CardActions, CardBody } from '../../../components/bootstrap/Card'
import Chart, { IChartOptions } from '../../../components/extras/Chart'

const MigrationDBResponse = (props:any) => {
    const [state] = useState<IChartOptions>({
		series: [
			{
				name: 'Response',
				data: props.series_data,
			},
		],
		options: {
			chart: {
				height: 350,
				type: 'line',
				zoom: {
					enabled: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			tooltip:{
				theme: 'dark',
			},
			stroke: {
				curve: 'straight',
			},
			title: {
				text: 'DataBase Response progress / second',
				align: 'left',
			},
			xaxis: {
				type: 'numeric',
				labels: {
					formatter: (value) => `${parseInt(value).toFixed(0)} s`,
				},
			},
			yaxis: {
				min: 0,
				labels: {
					formatter: (val) => val.toFixed(0),
				},
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5,
				},
			},
		},
	});
  return (
			<Card stretch>
				<CardHeader>
					<CardLabel icon='ShowChart'>
						<CardTitle>
							DataBase <small> - performance</small>
						</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<Chart
						series={state.series}
						options={state.options}
						type={state.options.chart?.type}
						height={state.options.chart?.height}
					/>
				</CardBody>
			</Card>
  )
}

export default MigrationDBResponse
