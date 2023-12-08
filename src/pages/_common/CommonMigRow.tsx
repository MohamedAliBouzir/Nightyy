import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Chart from '../../components/extras/Chart';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import { MigrationPageMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';

interface ICommonMigrationTableProps {
	id: string | number;
	table_name: string;
	date: string;
	process: string;
	execution_time: number;
	cpu_perc: number;
	ram_perc: number;
	status: string;
	start_time: string;
	end_time: string;
	watch_cpu: any;
	watch_process: any;
	watch_ram: any;
	failed_rows: any;
	DB_responce: any;
	chunk_size: any;
	extract_process_num:any;
	transform_process_num:any;
	load_process_num:any;
}
const CommonMigrationTable: FC<ICommonMigrationTableProps> = ({
	id,
	table_name,
	date,
	process,
	execution_time,
	cpu_perc,
	ram_perc,
	status,
	start_time,
	end_time,
	watch_cpu,
	watch_ram,
	watch_process,
	failed_rows,
	DB_responce,
	chunk_size,
	extract_process_num,
	transform_process_num,
	load_process_num,
}) => {
	const { darkModeStatus } = useDarkMode();
	return (
		<tr>
			<th scope='row'>{id}</th>
			<th scope='row'>{table_name}</th>
			<td>{date}</td>
			<td>{process}</td>
			<td>
				<span>{execution_time}</span>
			</td>
			<th scope='row'>
				<span>{cpu_perc}</span>
			</th>
			<th scope='row'>
				<span>{ram_perc}</span>
			</th>
			<td className='h5'>
				<Badge
					color={
						(status == 'Success' && 'success') ||
						(status == 'Actif' && 'info') ||
						(status == 'Failed' && 'danger') ||
						'warning'
					}>
					{status}
				</Badge>
			</td>
			<td className='text-end'>
				<Button
					color='dark'
					isLight
					icon='Visibility'
					tag='a'
					onClick={() => {
						let data = {
							id: id,
							table_name: table_name,
							date: date,
							process: process,
							execution_time: execution_time,
							cpu_perc: cpu_perc,
							ram_perc: ram_perc,
							status: status,
							start_time: start_time,
							end_time: end_time,
							watch_cpu: watch_cpu,
							watch_ram: watch_ram,
							watch_process: watch_process,
							failed_rows: failed_rows,
							DB_responce: DB_responce,
							chunk_size: chunk_size,
							extract_process_num: extract_process_num,
							transform_process_num: transform_process_num,
							load_process_num: load_process_num,
						};
						let jsonData = JSON.stringify(data)
						localStorage.setItem('passedData', jsonData)
					}}
					to={`../${MigrationPageMenu.migrationID.path}/${id}`}
				/>
			</td>
		</tr>
	);
};

export default CommonMigrationTable;
