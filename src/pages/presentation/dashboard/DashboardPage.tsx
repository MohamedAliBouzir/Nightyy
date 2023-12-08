import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft, SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import CommonMigRow from '../../_common/CommonMigRow';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';

const DashboardPage = () => {
	const [jsonData, setJsonData] = useState<any[]>([]);
	// useEffect(()=> {
	// 	const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}${process.env.REACT_APP_HISTORY_PATH}`)
	// 	socket.onopen = () => {
	// 		socket.send('alive')
	// 	};
	// 	socket.onmessage = (event) => {
	// 		setJsonData(JSON.parse(event.data))
	// 	};
		
	// 	return () => {
	// 		socket.close();
	// 	};
	// }, [])
	const [date, setDate] = useState<Date>(new Date());

	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			min_cpu: '',
			max_cpu: '',
			min_ram: '',
			max_ram: '',
			min_execution: '',
			max_execution: '',
			success: true,
			actif: true,
			canceled: true,
			failed: true,
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});
	const filteredData = jsonData.filter(
		(f) =>
			// CPU
			(formik.values.min_cpu === '' || Number(f.cpu_perc) > Number(formik.values.min_cpu)) &&
			(formik.values.max_cpu === '' || Number(f.cpu_perc) < Number(formik.values.max_cpu)) &&
			// RAM
			(formik.values.min_ram === '' || Number(f.ram_perc) > Number(formik.values.min_ram)) &&
			(formik.values.max_ram === '' || Number(f.ram_perc) < Number(formik.values.max_ram)) &&
			// Execution
			(formik.values.min_execution === '' || f.execution_time > Number(formik.values.min_execution)) &&
			(formik.values.max_execution === '' || f.execution_time < Number(formik.values.max_execution)) &&
			//	status
			((formik.values.success ? f.status === 'Success' : false) ||
				(formik.values.actif ? f.status === 'Actif' : false) ||
				(formik.values.canceled ? f.status === 'Canceled' : false) ||
				(formik.values.failed ? f.status === 'Failed' : false)),
	);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	const navigate = useNavigate();
	return (
		<PageWrapper title={"History"}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<Avatar srcSet={UserImageWebp} src={UserImage} size={32} />
					<span>
						<strong>Last migration by</strong> Migration User
					</span>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel icon='Archive' iconColor='danger'>
							<CardTitle>Migration History </CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th
										scope='col'
										onClick={() => requestSort('id')}
										className='cursor-pointer text-decoration-underline'>
										#{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('id')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('table_name')}
										className='cursor-pointer text-decoration-underline'>
										Table Name{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('table_name')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Date</th>
									<th scope='col'>Process</th>
									<th
										scope='col'
										onClick={() => requestSort('execution_time')}
										className='cursor-pointer text-decoration-underline'>
										Time(s){' '}
										<Icon
											size='lg'
											className={getClassNamesFor('execution_time')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('cpu_perc')}
										className='cursor-pointer text-decoration-underline'>
										CPU(%){' '}
										<Icon
											size='lg'
											className={getClassNamesFor('cpu_perc')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('ram_perc')}
										className='cursor-pointer text-decoration-underline'>
										RAM(%){' '}
										<Icon
											size='lg'
											className={getClassNamesFor('ram_perc')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Status</th>
									<th scope='col' className='text-end'>
										Review
									</th>
								</tr>
							</thead>
							<tbody>
								{onCurrentPageItems.map((i) => (
									<CommonMigRow
										key={i.id}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...i}
									/>
								))}
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
