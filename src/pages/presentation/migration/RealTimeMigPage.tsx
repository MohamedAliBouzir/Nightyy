import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import MigrationProcessDetails from '../../_common/MigrationDashboard/MigrationProcessDetails';
import useDarkMode from '../../../hooks/useDarkMode';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import MigrationDetails from '../../_common/MigrationDashboard/MigrationDetails';
import MigrationRessourceUsage from '../../_common/MigrationDashboard/MigrationRessourceUsage';
import MigDBResponseRealTime from '../../_common/MigrationDashboard/MigDBResponseRealTime';

const MigrationViewPage = () => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const [current, setCurrent] = useState<Date>(new Date())
	useEffect(() => {
		setCurrent(new Date())
	},[])
	const formattedTime = current.toLocaleTimeString();
	const formattedDate = current.toLocaleDateString();
	return (
		<PageWrapper title='Real Time Migration'>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='info'
						isLink
						icon='ArrowBack'
						onClick={() => {
							navigate(-1);
						}}>
						Back
					</Button>
					<SubheaderSeparator />
					<span>
						<span className='text-muted fst-italic me-2'>Start Time:</span>
						<span className='fw-bold'>
							{formattedTime}
						</span>
					</span>
					<SubheaderSeparator />
					<span>
						<span className='text-muted fst-italic me-2'>Migration status:</span>
						<Button isDisable isLink color={'info'} icon={'Pending'}>
							Actif
						</Button>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted fst-italic me-2'>Migration Date:</span>
					<span className='fw-bold'>
						{formattedDate}
					</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-lg-4'>
						<MigrationDetails
							chunk={{ value: 'Chunk size', data: 'Calculating' }}
							end_time={{value: 'End time', data:'Calculating'}}
							failed={{ value: 'Failed rows', data: 'Calculating' }}
						/>
					</div>
					<div className='col-lg-8'>
						<MigDBResponseRealTime />
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-6'>
						<MigrationRessourceUsage
							componentTitle='Memory Usage'
							componentCategory='performance'
							componentIcon='Memory'
							componentPath={process.env.REACT_APP_RAM_PATH}
							componentColor={process.env.REACT_APP_DANGER_COLOR}
						/>
					</div>
					<div className='col-lg-6'>
						<MigrationRessourceUsage
							componentTitle='CPU Usage'
							componentCategory='performance'
							componentIcon='Hardware'
							componentPath={process.env.REACT_APP_CPU_PATH}
							componentColor={process.env.REACT_APP_INFO_COLOR}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<MigrationProcessDetails />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default MigrationViewPage;
