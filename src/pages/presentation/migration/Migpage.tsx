import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
	CardActions,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Wizard, { WizardItem } from '../../../components/Wizard';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import User1Webp from '../../../assets/img/wanna/wanna2.webp';
import User1Img from '../../../assets/img/wanna/wanna2.png';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Textarea from '../../../components/bootstrap/forms/Textarea';

interface IPreviewItemProps {
	title: string;
	value: any | any[];
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};

interface ISourceDetails {
	uidSrc: string;
	pwdSrc: string;
	uriSrc: string;
	prtSrc: string;
	sidSrc: string;
	tableOwnerSrc: string;
	tableNameSrc: string;
	columnsSrc: string;
	extractProcessNum: string;
	oracleHint: string;
	extractChunkSize: string;
	arraySize: string;
	prefetchRows: string;
}

const Migpage = () => {
	const navigate = useNavigate();
	const [processModelConfig, setProcessModelConfig] = useState<boolean>(false);
	const [extractProcessState, setExtractProcessState] = useState<boolean>(false);
	const [transformProcessState, setTransformProcessState] = useState<boolean>(false);
	const [loadProcessState, setLoadProcessState] = useState<boolean>(false);
	const [extractUpdated, setExtractUpdated] = useState<boolean>(false);
	const [transformUpdated, setTransformUpdated] = useState<boolean>(false);
	const [loadUpdated, setLoadUpdated] = useState<boolean>(false);
	const [startMig, setStartMig] = useState<boolean>(false);
	const [processToExecute, setProcessToExecute] = useState<string>('');
	const TABS = {
		EMPTY: 'Empty',
		EXTRACT_DETAIL: 'Extract',
		TRANSFORM_DETAIL: 'Transform',
		LOAD_DETAIL: 'Load',
	};
	const [activeTab, setActiveTab] = useState(TABS.EMPTY);
	useEffect(() =>{ 
		// Extract Only
		if (extractProcessState && !transformProcessState && !loadProcessState){
			if (extractUpdated){
				setProcessToExecute('Extract')
				setStartMig(true)
			}
		}
		// Transform Only
		else if (!extractProcessState && transformProcessState && !loadProcessState){
			if (transformUpdated){
				setProcessToExecute('Transform')
				setStartMig(true)
			}
		}
		// Load Only
		else if (!extractProcessState && !transformProcessState && loadProcessState){
			if (loadUpdated){
				setProcessToExecute('Load')
				setStartMig(true)
			}
		}
		// Extract, Transform
		else if (extractProcessState && transformProcessState && !loadProcessState){
			if (extractUpdated && transformUpdated){
				setProcessToExecute('Extract, Transform')
				setStartMig(true)
			}
		}
		// Extract, Load
		else if (extractProcessState && !transformProcessState && loadProcessState){
			if (extractUpdated && loadUpdated){
				setProcessToExecute('Extract, Load')
				setStartMig(true)
			}
		}
		// Transform, Load
		else if (!extractProcessState && transformProcessState && loadProcessState){
			if (transformUpdated && loadUpdated){
				setProcessToExecute('Transform, Load')
				setStartMig(true)
			}
		}
		// FullETL
		else if (extractProcessState && transformProcessState && loadProcessState){
			if (extractUpdated && transformUpdated && loadUpdated){
				setProcessToExecute('ETL')
				setStartMig(true)
			}
		}
	},[extractProcessState, transformProcessState, loadProcessState, extractUpdated, transformUpdated, loadUpdated])

	const extractForm = useFormik({
		initialValues: {
			uidSrc: '',
			pwdSrc: '',
			uriSrc: '',
			prtSrc: '',
			sidSrc: '',
			tableOwnerSrc: '',
			tableNameSrc: '',
			columnsSrc: '',
			extractProcessNum: '',
			oracleHint: '',
			extractChunkSize: '',
			arraySize: '',
			prefetchRows: '',
		},
		onSubmit: () => {
			const socket = new WebSocket(
				`${process.env.REACT_APP_WEBSOCKET_URL}${process.env.REACT_APP_UPDATE_EXTRACT}`,
			);
			socket.onopen = () => {
				socket.send(JSON.stringify(extractForm.values));
			};
			socket.onmessage = (event) => {
				if (event.data == 'done') {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Extract Successfully Updated</span>
						</span>,
						'Extract details have been successfully Updated.',
					);
					setExtractUpdated(true);
				} else {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Caught problem while updating Extract details.',
					);
					setExtractUpdated(false);
				}
				socket.close();
			};
		},
	});

	const formTransform = useFormik({
		initialValues: {
			columnToMap: '',
			conditionalValue: '',
			newValue: '',
			condition: '',
			transformProcessNum: '',
		},
		onSubmit: () => {
			const socket = new WebSocket(
				`${process.env.REACT_APP_WEBSOCKET_URL}${process.env.REACT_APP_UPDATE_TRANSFORM}`,
			);
			socket.onopen = () => {
				socket.send(JSON.stringify(formTransform.values));
			};
			socket.onmessage = (event) => {
				if (event.data == 'done') {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Transform Successfully Updated</span>
						</span>,
						'Transform details have been successfully Updated.',
					);
					setTransformUpdated(true);
				} else {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Caught problem while updating Transform details.',
					);
					setTransformUpdated(false);
				}
				socket.close();
			};
		},
	});

	const formLoad = useFormik({
		initialValues: {
			uidTrg: '',
			pwdTrg: '',
			uriTrg: '',
			prtTrg: '',
			sidTrg: '',
			tableOwnerTrg: '',
			tableNameTrg: '',
			loadProcessNum: '',
		},
		onSubmit: () => {
			const socket = new WebSocket(
				`${process.env.REACT_APP_WEBSOCKET_URL}${process.env.REACT_APP_UPDATE_LOAD}`,
			);
			socket.onopen = () => {
				socket.send(JSON.stringify(formLoad.values));
			};
			socket.onmessage = (event) => {
				if (event.data == 'done') {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Load Successfully Updated</span>
						</span>,
						'Load details have been successfully Updated.',
					);
					setLoadUpdated(true);
				} else {
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Caught problem while updating Load details.',
					);
					setLoadUpdated(false);
				}
				socket.close();
			};
		},
	});
	return (
		<PageWrapper title='starter'>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-4 col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Build'>
									<CardTitle>
										Migration process <small>- configuration</small>
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<Button
											icon='Stream'
											color='info'
											className='w-100 p-3'
											isDisable={!extractProcessState}
											isLight={TABS.EXTRACT_DETAIL !== activeTab}
											onClick={() => setActiveTab(TABS.EXTRACT_DETAIL)}>
											{TABS.EXTRACT_DETAIL}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Cable'
											color='info'
											className='w-100 p-3'
											isDisable={!transformProcessState}
											isLight={TABS.TRANSFORM_DETAIL !== activeTab}
											onClick={() => setActiveTab(TABS.TRANSFORM_DETAIL)}>
											{TABS.TRANSFORM_DETAIL}
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='Storage'
											color='info'
											className='w-100 p-3'
											isDisable={!loadProcessState}
											isLight={TABS.LOAD_DETAIL !== activeTab}
											onClick={() => setActiveTab(TABS.LOAD_DETAIL)}>
											{TABS.LOAD_DETAIL}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100 row g-3'>
									<div className='col-12'>
										<Button
											icon='Build'
											color='warning'
											className='w-100 p-3'
											onClick={() => setProcessModelConfig(true)}>
											Configure Process
										</Button>
									</div>
									<div className='col-12'>
										<Button
											icon='NotStarted'
											isDisable={!startMig}
											onClick={() => {
												const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}${process.env.REACT_APP_STARTER_PATH}`)
												socket.onopen = () =>{
													socket.send(processToExecute);
													showNotification(
														<span className='d-flex align-items-center'>
															<Icon icon='Info' size='lg' className='me-1' />
															<span>Process Started</span>
														</span>,
														'You are being redirected to Monitor in Real Time',
													);
													navigate('/migration-live')
												};
												socket.onmessage = (event) =>{
													if (event.data === 'Done'){
														showNotification(
															<span className='d-flex align-items-center'>
																<Icon icon='Info' size='lg' className='me-1' />
																<span>Process Finished</span>
															</span>,
															'Thanks for your trust.',
														);
														socket.close()
													}
												}
											}}
											color='success'
											className='w-100 p-3'>
											Launch Migration
										</Button>
									</div>
								</CardFooterLeft>
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
												setActiveTab(TABS.EMPTY);
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
												setActiveTab(TABS.EMPTY);
											}}>
											Submit
										</Button>
									</div>
								</ModalFooter>
							</Modal>
						</>
					</div>
					<div className='col-lg-8 col-md-6'>
						{TABS.EMPTY === activeTab && <></>}
						{TABS.EXTRACT_DETAIL === activeTab && (
							<Wizard
								isHeader
								stretch
								color='info'
								noValidate
								onSubmit={extractForm.handleSubmit}
								className='shadow-3d-info'>
								<WizardItem id='step1' title='Extract details'>
									<Card>
										<CardHeader>
											<CardLabel icon='Edit' iconColor='info'>
												<CardTitle>Source Database details</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='uidSrc'
														label='Source DataBase UID'
														isFloating>
														<Input
															autoComplete='additional-name'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.uidSrc}
															isValid={extractForm.isValid}
															isTouched={extractForm.touched.uidSrc}
															invalidFeedback={
																extractForm.errors.uidSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='pwdSrc'
														label='Source Database password'
														isFloating>
														<Input
															type='password'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.pwdSrc}
															isValid={extractForm.isValid}
															isTouched={extractForm.touched.pwdSrc}
															invalidFeedback={
																extractForm.errors.pwdSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-6'>
													<FormGroup
														id='uriSrc'
														label='Source URI'
														isFloating>
														<Input
															placeholder='Source DataBase URI'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.uriSrc}
															isValid={extractForm.isValid}
															isTouched={extractForm.touched.uriSrc}
															invalidFeedback={
																extractForm.errors.uriSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='prtSrc'
														label='Database Port'
														isFloating>
														<Input
															type='number'
															autoComplete='number'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.prtSrc}
															isValid={extractForm.isValid}
															isTouched={extractForm.touched.prtSrc}
															invalidFeedback={
																extractForm.errors.prtSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='sidSrc'
														label='Database system ID'
														isFloating>
														<Input
															type='text'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.sidSrc}
															isValid={extractForm.isValid}
															isTouched={extractForm.touched.sidSrc}
															invalidFeedback={
																extractForm.errors.sidSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
									<Card>
										<CardHeader>
											<CardLabel icon='Approval' iconColor='info'>
												<CardTitle>Source Data location</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='tableOwnerSrc'
														label='Table owner username'
														isFloating>
														<Input
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.tableOwnerSrc}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.tableOwnerSrc
															}
															invalidFeedback={
																extractForm.errors.tableOwnerSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='tableNameSrc'
														label='Table name'
														isFloating>
														<Input
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.tableNameSrc}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.tableNameSrc
															}
															invalidFeedback={
																extractForm.errors.tableNameSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
									<Card>
										<CardHeader>
											<CardLabel icon='PermDataSetting' iconColor='info'>
												<CardTitle>Columns to extract</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-12'>
													<FormGroup
														id='columnsSrc'
														label='Selected Columns'
														isFloating>
														<Textarea
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.columnsSrc}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.columnsSrc
															}
															invalidFeedback={
																extractForm.errors.columnsSrc
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
									<Card stretch>
										<CardHeader>
											<CardLabel icon='Build' iconColor='info'>
												<CardTitle>Ressource Settings</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-5'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='extractProcessNum'
														label='Extraction process number'
														isFloating>
														<Input
															type='number'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={
																extractForm.values.extractProcessNum
															}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched
																	.extractProcessNum
															}
															invalidFeedback={
																extractForm.errors.extractProcessNum
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='oracleHint'
														label='Oracle Hint'
														isFloating>
														<Input
															type='number'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.oracleHint}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.oracleHint
															}
															invalidFeedback={
																extractForm.errors.oracleHint
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='extractChunkSize'
														label='Chunk size'
														isFloating>
														<Input
															type='number'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={
																extractForm.values.extractChunkSize
															}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.extractChunkSize
															}
															invalidFeedback={
																extractForm.errors.extractChunkSize
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='arraySize'
														label='Oracle array size'
														isFloating>
														<Input
															type='number'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.arraySize}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.arraySize
															}
															invalidFeedback={
																extractForm.errors.arraySize
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='prefetchRows'
														label='Oracle prefetch rows'
														isFloating>
														<Input
															type='number'
															onChange={extractForm.handleChange}
															onBlur={extractForm.handleBlur}
															value={extractForm.values.prefetchRows}
															isValid={extractForm.isValid}
															isTouched={
																extractForm.touched.prefetchRows
															}
															invalidFeedback={
																extractForm.errors.prefetchRows
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>

								<WizardItem id='step2' title='Check before submit'>
									<div className='row g-3'>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Extraction Details</h3>
											<h4 className='mt-4'>Source Database Informations</h4>
										</div>
										<PreviewItem
											title='Database User ID'
											value={extractForm.values.uidSrc}
										/>
										<PreviewItem
											title='Database uniform ressource identifier'
											value={extractForm.values.uriSrc}
										/>
										<PreviewItem
											title='Database port'
											value={extractForm.values.prtSrc}
										/>
										<PreviewItem
											title='Database System ID'
											value={extractForm.values.sidSrc}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Database Table Location</h4>
										</div>
										<PreviewItem
											title='Table owner'
											value={extractForm.values.tableOwnerSrc}
										/>
										<PreviewItem
											title='Table name'
											value={extractForm.values.tableNameSrc}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Columns to map</h4>
										</div>
										<PreviewItem
											title='Selected columns'
											value={extractForm.values.columnsSrc}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Ressource settings</h4>
										</div>
										<PreviewItem
											title='Executing process number'
											value={extractForm.values.extractProcessNum}
										/>
										<PreviewItem
											title='Oracle hint'
											value={extractForm.values.oracleHint}
										/>
										<PreviewItem
											title='Chunk size'
											value={extractForm.values.extractChunkSize}
										/>
										<PreviewItem
											title='Oracle array size'
											value={extractForm.values.arraySize}
										/>
										<PreviewItem
											title='Oracle prefetched rows'
											value={extractForm.values.prefetchRows}
										/>
									</div>
								</WizardItem>
							</Wizard>
						)}
						{TABS.TRANSFORM_DETAIL === activeTab && (
							<Wizard
								isHeader
								stretch
								color='info'
								noValidate
								onSubmit={formTransform.handleSubmit}
								className='shadow-3d-info'>
								<WizardItem id='step1' title='Transform details'>
									<Card>
										<CardHeader>
											<CardLabel icon='Edit' iconColor='info'>
												<CardTitle>Transform details</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-12'>
													<FormGroup
														id='transformProcessNum'
														label='Number of transformation Process'
														isFloating>
														<Input
															type='number'
															onChange={formTransform.handleChange}
															onBlur={formTransform.handleBlur}
															value={
																formTransform.values
																	.transformProcessNum
															}
															isValid={formTransform.isValid}
															isTouched={
																formTransform.touched
																	.transformProcessNum
															}
															invalidFeedback={
																formTransform.errors
																	.transformProcessNum
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='columnToMap'
														label='Column to transform'
														isFloating>
														<Input
															onChange={formTransform.handleChange}
															onBlur={formTransform.handleBlur}
															value={formTransform.values.columnToMap}
															isValid={formTransform.isValid}
															isTouched={
																formTransform.touched.columnToMap
															}
															invalidFeedback={
																formTransform.errors.columnToMap
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-6'>
													<FormGroup
														id='conditionalValue'
														label='Value to transform'
														isFloating>
														<Input
															onChange={formTransform.handleChange}
															onBlur={formTransform.handleBlur}
															value={
																formTransform.values
																	.conditionalValue
															}
															isValid={formTransform.isValid}
															isTouched={
																formTransform.touched
																	.conditionalValue
															}
															invalidFeedback={
																formTransform.errors
																	.conditionalValue
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='condition'
														label='Transformation condition'
														isFloating>
														<Input
															onChange={formTransform.handleChange}
															onBlur={formTransform.handleBlur}
															value={formTransform.values.condition}
															isValid={formTransform.isValid}
															isTouched={
																formTransform.touched.condition
															}
															invalidFeedback={
																formTransform.errors.condition
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='newValue'
														label='Set new column value'
														isFloating>
														<Input
															onChange={formTransform.handleChange}
															onBlur={formTransform.handleBlur}
															value={formTransform.values.newValue}
															isValid={formTransform.isValid}
															isTouched={
																formTransform.touched.newValue
															}
															invalidFeedback={
																formTransform.errors.newValue
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>

								<WizardItem id='step2' title='Check before submit'>
									<div className='row g-3'>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Transform Details</h3>
											<h4 className='mt-4'>Transform process number</h4>
										</div>
										<PreviewItem
											title='Process number'
											value={formTransform.values.transformProcessNum}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Transformation applied</h4>
										</div>
										<PreviewItem
											title='Columns to transform'
											value={formTransform.values.columnToMap}
										/>
										<PreviewItem
											title='Values to transform'
											value={formTransform.values.conditionalValue}
										/>
										<PreviewItem
											title='Transformation Condition'
											value={formTransform.values.condition}
										/>
										<PreviewItem
											title='New value'
											value={formTransform.values.newValue}
										/>
									</div>
								</WizardItem>
							</Wizard>
						)}
						{TABS.LOAD_DETAIL === activeTab && (
							<Wizard
								isHeader
								stretch
								color='info'
								noValidate
								onSubmit={formLoad.handleSubmit}
								className='shadow-3d-info'>
								<WizardItem id='step1' title='Load details'>
									<Card>
										<CardHeader>
											<CardLabel icon='Edit' iconColor='info'>
												<CardTitle>Target Database details</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='uidTrg'
														label='Target DataBase UID'
														isFloating>
														<Input
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.uidTrg}
															isValid={formLoad.isValid}
															isTouched={formLoad.touched.uidTrg}
															invalidFeedback={formLoad.errors.uidTrg}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='pwdTrg'
														label='Target Database password'
														isFloating>
														<Input
															type='password'
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.pwdTrg}
															isValid={formLoad.isValid}
															isTouched={formLoad.touched.pwdTrg}
															invalidFeedback={formLoad.errors.pwdTrg}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-6'>
													<FormGroup
														id='uriTrg'
														label='Source URI'
														isFloating>
														<Input
															placeholder='Target DataBase URI'
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.uriTrg}
															isValid={formLoad.isValid}
															isTouched={formLoad.touched.uriTrg}
															invalidFeedback={formLoad.errors.uriTrg}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='prtTrg'
														label='Database Port'
														isFloating>
														<Input
															type='number'
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.prtTrg}
															isValid={formLoad.isValid}
															isTouched={formLoad.touched.prtTrg}
															invalidFeedback={formLoad.errors.prtTrg}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='sidTrg'
														label='Database system ID'
														isFloating>
														<Input
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.sidTrg}
															isValid={formLoad.isValid}
															isTouched={formLoad.touched.sidTrg}
															invalidFeedback={formLoad.errors.sidTrg}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
									<Card>
										<CardHeader>
											<CardLabel icon='Approval' iconColor='info'>
												<CardTitle>Target Data location</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-md-6'>
													<FormGroup
														id='tableOwnerTrg'
														label='Table owner username'
														isFloating>
														<Input
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.tableOwnerTrg}
															isValid={formLoad.isValid}
															isTouched={
																formLoad.touched.tableOwnerTrg
															}
															invalidFeedback={
																formLoad.errors.tableOwnerTrg
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-6'>
													<FormGroup
														id='tableNameTrg'
														label='Table name'
														isFloating>
														<Input
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.tableNameTrg}
															isValid={formLoad.isValid}
															isTouched={
																formLoad.touched.tableNameTrg
															}
															invalidFeedback={
																formLoad.errors.tableNameTrg
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
									<Card stretch>
										<CardHeader>
											<CardLabel icon='Build' iconColor='info'>
												<CardTitle>Ressource Settings</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-5'>
											<div className='row g-4'>
												<div className='col-md-12'>
													<FormGroup
														id='loadProcessNum'
														label='Load process number'
														isFloating>
														<Input
															type='number'
															onChange={formLoad.handleChange}
															onBlur={formLoad.handleBlur}
															value={formLoad.values.loadProcessNum}
															isValid={formLoad.isValid}
															isTouched={
																formLoad.touched.loadProcessNum
															}
															invalidFeedback={
																formLoad.errors.loadProcessNum
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>

								<WizardItem id='step2' title='Check before submit'>
									<div className='row g-3'>
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Load Details</h3>
											<h4 className='mt-4'>Target Database Informations</h4>
										</div>
										<PreviewItem
											title='Database User ID'
											value={formLoad.values.uidTrg}
										/>
										<PreviewItem
											title='Database uniform ressource identifier'
											value={formLoad.values.uriTrg}
										/>
										<PreviewItem
											title='Database port'
											value={formLoad.values.prtTrg}
										/>
										<PreviewItem
											title='Database System ID'
											value={formLoad.values.sidTrg}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Database Table Location</h4>
										</div>
										<PreviewItem
											title='Table owner'
											value={formLoad.values.tableOwnerTrg}
										/>
										<PreviewItem
											title='Table name'
											value={formLoad.values.tableNameTrg}
										/>
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Ressource settings</h4>
										</div>
										<PreviewItem
											title='Executing process number'
											value={formLoad.values.loadProcessNum}
										/>
									</div>
								</WizardItem>
							</Wizard>
						)}
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Migpage;
