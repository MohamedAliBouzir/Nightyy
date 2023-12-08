import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { dashboardPagesMenu } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Checks from '../../../components/bootstrap/forms/Checks';
import ExtractCard from '../../_common/MigrationLauncher/ExtractCard';
import TransformCard from '../../_common/MigrationLauncher/TransformCard';
import LoadCard from '../../_common/MigrationLauncher/LoadCard';

const MigrationStarterPage = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [processModelConfig, setProcessModelConfig] = useState<boolean>(false);
	const [extractProcessState, setExtractProcessState] = useState<boolean>(false);
	const [transformProcessState, setTransformProcessState] = useState<boolean>(false);
	const [loadProcessState, setLoadProcessState] = useState<boolean>(false);
	const [extractWizardAccess, setExtractWizardAccess] = useState<boolean>(false);
	const [transformWizardAccess, setTransformWizardAccess] = useState<boolean>(false);
	const [loadWizardAccess, setLoadWizardAccess] = useState<boolean>(false);
	const [allExtractValuesFilled, setAllExtractValuesFilled] = useState<boolean>(false);
	const [allTransfomValuesFilled, setAllTransfomValuesFilled] = useState<boolean>(false);
	const [allLoadValuesFilled, setAllLoadValuesFilled] = useState<boolean>(false);
	const [extractData, setExtractData] = useState<any>();
	const [transfomData, setTransfomData] = useState<any>();
	const [loadData, setLoadData]= useState<any>();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		setCurrentTime(new Date());
	});
	const navigate = useNavigate();
	return (
		<PageWrapper title={dashboardPagesMenu.migrationLauncher.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='info'
						isLink
						icon='ArrowBack'
						onClick={() => {
							if (localStorage.getItem('transformInfos') !== null) {
								localStorage.removeItem('transformInfos');
							}
							if (localStorage.getItem('extractInfos') !== null) {
								localStorage.removeItem('extractInfos');
							}
							if (localStorage.getItem('extractInfos') !== null) {
								localStorage.removeItem('extractInfos');
							}
							navigate(-1);
						}}>
						Back
					</Button>
					<SubheaderSeparator />
					<Button isDisable isLink color='success' icon='NotStarted'>
						Migration Launcher
					</Button>
					<span className='text-muted'>Details</span>
					<SubheaderSeparator />
					<span className='text-muted fw-bold'>Today's Date</span>
					<Button isDisable isLink color='danger'>
						{currentTime.toLocaleDateString()}
					</Button>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span>
						<span className='text-muted fst-italic me-2 fw-bold'>
							{currentTime.toLocaleTimeString()}
						</span>
						<span>
							<Icon icon='AccessTime' />
						</span>
					</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-4 col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Architecture'>
									<CardTitle>Set Migration process</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<Button
											icon='Stream'
											isLight
											color='success'
											className='w-100 p-3'
											isDisable={!extractProcessState}
											onClick={() => {
												setExtractWizardAccess(true);
												setTransformWizardAccess(false);
												setLoadWizardAccess(false);
											}}>
											Extract
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Cable'
											color='danger'
											isLight
											className='w-100 p-3'
											isDisable={!transformProcessState}
											onClick={() => {
												setExtractWizardAccess(false);
												setTransformWizardAccess(true);
												setLoadWizardAccess(false);
											}}>
											Transform
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Storage'
											color='info'
											isLight
											className='w-100 p-3'
											isDisable={!loadProcessState}
											onClick={() => {
												setExtractWizardAccess(false);
												setTransformWizardAccess(false);
												setLoadWizardAccess(true);
											}}>
											Load
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter className='w-100'>
								<Button
									icon='Build'
									color='warning'
									className='w-80 p-3'
									onClick={() => setProcessModelConfig(true)}>
									Configure Process
								</Button>
								<Button
									icon='NotStarted'
									isDisable={true}
									color='success'
									className='w-80 p-3'
									onClick={() => setProcessModelConfig(true)}>
									Launch Migration
								</Button>
							</CardFooter>
						</Card>
						<>
							<Modal
								setIsOpen={setProcessModelConfig}
								isOpen={processModelConfig}
								size='sm'
								titleId='add-process'
								isCentered>
								<ModalHeader>
									<ModalTitle id='add-process'>
										Pick Process to be executed
									</ModalTitle>
								</ModalHeader>
								<ModalBody>
									<div className='row'>
										<div className='col-md-12 text-center'>
											{(extractProcessState &&
												transformProcessState &&
												loadProcessState && (
													<p className='h1'>Full ETL</p>
												)) ||
												(extractProcessState && transformProcessState && (
													<p className='h2'>Extract, Transform</p>
												)) ||
												(extractProcessState && loadProcessState && (
													<p className='h1'>Extract, Load</p>
												)) ||
												(transformProcessState && loadProcessState && (
													<p className='h1'>Transform, Load</p>
												)) ||
												(extractProcessState && (
													<p className='h1'>Extract Only</p>
												)) ||
												(transformProcessState && (
													<p className='h1'>Transform Only</p>
												)) ||
												(loadProcessState && (
													<p className='h1'>Load Only</p>
												)) || <p className='h4'>None process is chosen</p>}
										</div>
									</div>
									<div className='row'>
										<div className='col-md-8'>
											<Checks
												id='extract-check'
												type='checkbox'
												label='Extract process'
												checked={extractProcessState}
												onChange={() => {
													setExtractProcessState(!extractProcessState);
												}}
											/>
											<Checks
												id='extract-check'
												type='checkbox'
												label='Transform process'
												checked={transformProcessState}
												onChange={() => {
													setTransformProcessState(
														!transformProcessState,
													);
												}}
											/>
											<Checks
												id='extract-check'
												type='checkbox'
												label='Load process'
												checked={loadProcessState}
												onChange={() => {
													setLoadProcessState(!loadProcessState);
												}}
											/>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<div className='row'>
										<Button
											color='danger'
											icon='Cancel'
											isLight
											className='w-100 p-2'
											onClick={() => {
												setExtractProcessState(false);
												setTransformProcessState(false);
												setLoadProcessState(false);
												setProcessModelConfig(false);
												if (localStorage.getItem('transformInfos') !== null) {
													localStorage.removeItem('transformInfos');
												}
												if (localStorage.getItem('extractInfos') !== null) {
													localStorage.removeItem('extractInfos');
												}
												if (localStorage.getItem('extractInfos') !== null) {
													localStorage.removeItem('extractInfos');
												}
											}}>
											Cancel
										</Button>
									</div>
									<div className='row'>
										<Button
											color='success'
											icon='CheckCircle'
											className='w-100 p-2'
											onClick={() => {
												setProcessModelConfig(false);
												if (localStorage.getItem('transformInfos') !== null) {
													localStorage.removeItem('transformInfos');
												}
												if (localStorage.getItem('extractInfos') !== null) {
													localStorage.removeItem('extractInfos');
												}
												if (localStorage.getItem('extractInfos') !== null) {
													localStorage.removeItem('extractInfos');
												}
											}}>
											Submit
										</Button>
									</div>
								</ModalFooter>
							</Modal>
						</>
					</div>
					{extractProcessState || transformProcessState || loadProcessState ? (
						<>
							{extractWizardAccess ? (
								<div className='col-lg-8 col-md-6'>
									<ExtractCard />
								</div>
							) : (
								<>
									{transformWizardAccess ? (
										<div className='col-lg-8 col-md-6'>
											<TransformCard />
										</div>
									) : (
										<>
											{loadWizardAccess ? (
												<div className='col-lg-8 col-md-6'>
													<LoadCard />
												</div>
											) : (
												<></>
											)}
										</>
									)}
								</>
							)}
						</>
					) : (
						<></>
					)}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default MigrationStarterPage;
