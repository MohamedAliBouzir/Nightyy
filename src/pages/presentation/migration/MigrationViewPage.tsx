import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import migData from '../../../common/data/dummyMigData';
import MigrationProcessDetails from '../../_common/MigrationDashboard/MigrationProcessDetails';
import useDarkMode from '../../../hooks/useDarkMode';
import { MigrationPageMenu } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import MigrationDetails from '../../_common/MigrationDashboard/MigrationDetails';
import MigrationDBResponse from '../../_common/MigrationDashboard/MigrationDBResponse';
import MigrationRessourceUsage from '../../_common/MigrationDashboard/MigrationRessourceUsage';
import MigrationProcessStatic from '../../_common/MigrationDashboard/MigrationProcessStatic';
import MigrationRessourceStatic from '../../_common/MigrationDashboard/MigrationRessourceStatic';

const MigrationViewPage = () => {
	const { darkModeStatus } = useDarkMode();
	const { id } = useParams();
	const navigate = useNavigate();
	const migrationData = migData.filter((mig) => mig.id.toString() === id?.toString());
	const [localData, setLocalData] = useState<any>();
	useEffect(() => {
		const fetchData = async () => {
			let passedData = localStorage.getItem('passedData');
			await setLocalData(JSON.parse(passedData!));
		}
		fetchData()
	  }, []);
	return (
		<PageWrapper title={MigrationPageMenu.migrationID.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='info'
						isLink
						icon='ArrowBack'
						onClick={() => {
							navigate(-1);
							localStorage.removeItem('passedData');
						}}>
						Back to History
					</Button>
					<SubheaderSeparator />
					<span>
						<span className='text-muted fst-italic me-2'>Table name:</span>
						<span className='fw-bold'>{localData?.table_name}</span>
					</span>
					<SubheaderSeparator />
					<span>
						<span className='text-muted fst-italic me-2'>Executed process:</span>
						<span className='fw-bold'>{localData?.process}</span>
					</span>
					<SubheaderSeparator />
					<span>
						<span className='text-muted fst-italic me-2'>Migration status:</span>
						<Button
							isDisable
							isLink
							color={
								(localData?.status === 'Success' && 'success') ||
								(localData?.status === 'Actif' && 'info') ||
								(localData?.status === 'Canceled' && 'warning') ||
								'danger'
							}
							icon={
								(localData?.status === 'Success' && 'DoneAll') ||
								(localData?.status === 'Actif' && 'Pending') ||
								(localData?.status === 'Canceled' && 'WarningAmber') ||
								'Cancel'
							}>
							{localData?.status}
						</Button>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Migration Date:</span>
					<span className='fw-bold'>{localData?.date}</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-lg-4'>
						{(localData?.process.includes('Extract, Transform') && (
							<MigrationDetails
								start_time={{ value: 'Start Time', data: localData?.start_time }}
								end_time={{ value: 'End Time', data: localData?.end_time }}
								extract_process = {{value: 'Extraction process number', data: localData?.extract_process_num}}
								transform_process = {{value: 'Transform process number', data: localData?.transform_process_num}}
								chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
								failed={{ value: 'Failed rows', data: localData?.failed_rows }}
							/>
						)) ||
							(localData?.process.includes('Transform, Load') && (
								<MigrationDetails
									start_time={{
										value: 'Start Time',
										data: localData?.start_time,
									}}
									end_time={{ value: 'End Time', data: localData?.end_time }}
									transform_process = {{value: 'Transform process number', data: localData?.transform_process_num}}
									load_process = {{value: 'Load process number', data: localData?.load_process_num}}
									chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
									failed={{ value: 'Failed rows', data: localData?.failed_rows }}
								/>
							)) ||
							(localData?.process.includes('Extract, Load') && (
								<MigrationDetails
									start_time={{
										value: 'Start Time',
										data: localData?.start_time,
									}}
									end_time={{ value: 'End Time', data: localData?.end_time }}
									extract_process = {{value: 'Extraction process number', data: localData?.extract_process_num}}
									load_process = {{value: 'Load process number', data: localData?.load_process_num}}
									chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
									failed={{ value: 'Failed rows', data: localData?.failed_rows }}
								/>
							)) ||
							(localData?.process.includes('Extract') && (
								<MigrationDetails
									start_time={{
										value: 'Start Time',
										data: localData?.start_time,
									}}
									end_time={{ value: 'End Time', data: localData?.end_time }}
									extract_process = {{value: 'Extraction process number', data: localData?.extract_process_num}}
									chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
									failed={{ value: 'Failed rows', data: localData?.failed_rows }}
								/>
							)) ||
							(localData?.process.includes('Transform') && (
								<MigrationDetails
									start_time={{
										value: 'Start Time',
										data: localData?.start_time,
									}}
									end_time={{ value: 'End Time', data: localData?.end_time }}
									transform_process = {{value: 'Transform process number', data: localData?.transform_process_num}}
									chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
									failed={{ value: 'Failed rows', data: localData?.failed_rows }}
								/>
							)) ||
							(localData?.process.includes('Load') && (
								<MigrationDetails
									start_time={{
										value: 'Start Time',
										data: localData?.start_time,
									}}
									end_time={{ value: 'End Time', data: localData?.end_time }}
									load_process = {{value: 'Load process number', data: localData?.load_process_num}}
									chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
									failed={{ value: 'Failed rows', data: localData?.failed_rows }}
								/>
							)) || (
								<MigrationDetails
									start_time={{
										value: 'Start Time',
										data: localData?.start_time,
									}}
									end_time={{ value: 'End Time', data: localData?.end_time }}
									extract_process = {{value: 'Extraction process number', data: localData?.extract_process_num}}
									transform_process = {{value: 'Transform process number', data: localData?.transform_process_num}}
									load_process = {{value: 'Load process number', data: localData?.load_process_num}}
									chunk={{ value: 'Chunk size', data: localData?.chunk_size }}
									failed={{ value: 'Failed rows', data: localData?.failed_rows }}
								/>
							)}
					</div>
					<div className='col-lg-8'>
						<MigrationDBResponse 
							series_data={JSON.parse(localStorage.getItem('passedData')!).DB_responce[0]}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-6'>
						{/* <MigrationRessourceUsage
							componentTitle='Memory Usage'
							componentCategory='performance'
							componentIcon='Memory'
							componentPath='ram-usage'
							componentColor={process.env.REACT_APP_DANGER_COLOR}
						/> */}
						<MigrationRessourceStatic
							component_title='Memory Usage'
							series_data={JSON.parse(localStorage.getItem('passedData')!).watch_ram[0]}
							component_category='Performance'
							color_info={process.env.REACT_APP_DANGER_COLOR}
						/>
					</div>
					<div className='col-lg-6'>
						{/* <MigrationRessourceUsage
							componentTitle='CPU Usage'
							componentCategory='performance'
							componentIcon='Hardware'
							componentPath='cpu-usage'
							componentColor={process.env.REACT_APP_INFO_COLOR}
						/> */}
						<MigrationRessourceStatic
							component_title='CPU Usage'
							series_data={JSON.parse(localStorage.getItem('passedData')!).watch_cpu[0]}
							component_category='Performance'
							color_info={process.env.REACT_APP_INFO_COLOR}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						{/* <MigrationProcessDetails /> */}
						<MigrationProcessStatic 
						component_title='Process tracking'
						component_category='Performance'
							seriesData={[
								{
									name: 'extracted',
									data: JSON.parse(localStorage.getItem('passedData')!)
										.watch_process[0],
								},
								{
									name: 'transformed',
									data: JSON.parse(localStorage.getItem('passedData')!)
										.watch_process[1],
								},
								{
									name: 'loading',
									data: JSON.parse(localStorage.getItem('passedData')!)
										.watch_process[2],
								},
							]}
						/>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default MigrationViewPage;
