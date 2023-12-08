import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardLabel, CardTitle, CardHeader, CardActions } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Input from '../../../components/bootstrap/forms/Input';

interface ISrcdetails {
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

const validate = (values: ISrcdetails) => {
	const errors: ISrcdetails = {
		uidSrc: '',
		pwdSrc: '',
		uriSrc: '',
		prtSrc: '',
		sidSrc: '',
		tableNameSrc: '',
		tableOwnerSrc: '',
		columnsSrc: '',
		extractProcessNum: '',
		oracleHint: '',
		extractChunkSize: '',
		arraySize: '',
		prefetchRows: '',
	};
	if (!values.uidSrc) {
		errors.uidSrc = 'Required';
	}
	if (!values.pwdSrc) {
		errors.pwdSrc = 'Required';
	}
	if (!values.prtSrc) {
		errors.prtSrc = 'Required';
	} else if (parseInt(values.prtSrc) < 0) {
		errors.prtSrc = 'Port can not be negative';
	}
	if (!values.sidSrc) {
		errors.sidSrc = 'Required';
	}
	if (!values.uriSrc) {
		errors.uriSrc = 'Required';
	} else if (
		!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(
			values.uriSrc,
		)
	) {
		errors.uriSrc = 'Wrong URI form';
	}
	if (!values.tableOwnerSrc) {
		errors.tableOwnerSrc = 'Required';
	}
	if (!values.tableNameSrc) {
		errors.tableNameSrc = 'Required';
	}
	if (!values.columnsSrc) {
		errors.columnsSrc = 'Required';
	}
	if (!values.extractProcessNum) {
		errors.extractProcessNum = 'Required';
	} else if (parseInt(values.extractProcessNum) < 1) {
		errors.extractProcessNum = 'Minimum process number to execute is 1';
	}
	if (!values.oracleHint) {
		errors.oracleHint = 'Required';
	} else if (parseInt(values.oracleHint) < 1) {
		errors.oracleHint = 'Oracle hints can not be less than 1';
	}
	if (!values.extractChunkSize) {
		errors.extractChunkSize = 'Required';
	} else if (parseInt(values.extractChunkSize) < 1) {
		errors.extractChunkSize = 'Chunk size can not be less than 1';
	}
	if (!values.arraySize) {
		errors.arraySize = 'Required';
	} else if (parseInt(values.arraySize) < 1) {
		errors.arraySize = 'Oracle Array size can not be less than 1';
	}
	if (!values.prefetchRows) {
		errors.prefetchRows = 'Required';
	} else if (parseInt(values.prefetchRows) < 0) {
		errors.prefetchRows = 'Oracle prefetched rows can not be less than 1';
	} else if (parseInt(values.prefetchRows) > 100) {
		errors.prefetchRows = 'Oracle prefetched rows can not be greater than 100';
	}
	return errors;
};
const ExtractCard = () => {
	const formikDBSrc = useFormik({
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
		validate,
		onSubmit: () => {
			console.log('hani ndir f extract');
		},
	});
	useEffect(() => {
		const allValuesFilled = Object.values(formikDBSrc.values).every(value => Boolean(value));
		if (allValuesFilled){
			let data: any = formikDBSrc.values
			localStorage.setItem('extractInfos', JSON.stringify(data))
		}
		else{
			if (localStorage.getItem('extractInfos') !== null){
				// localStorage.removeItem('extractInfos');
				console.log('extracted : ' + localStorage.getItem('extractInfos'))
			}
		}
	}, [formikDBSrc.values]);
	return (
		<Card stretch color='success' className='shadow-3d-info'>
			<CardBody isScrollable>
				<Card>
					<CardLabel icon='Edit' iconColor='success'>
						<CardTitle>Source Database details</CardTitle>
					</CardLabel>
					<CardBody className='pt-5'>
						<div className='row g-4'>
							<div className='col-md-6'>
								<FormGroup
									id='uidSrc'
									label='Source Database user ID'
									isFloating>
									<Input
										placeholder='Source Database user ID'
										type='text'
										autoComplete='text'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.uidSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.uidSrc}
										invalidFeedback={formikDBSrc.errors.uidSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='pwdSrc' label='Source Database password' isFloating>
									<Input
										placeholder='Source DataBase password'
										type='password'
										autoComplete='password'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.pwdSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.pwdSrc}
										invalidFeedback={formikDBSrc.errors.pwdSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup
									id='uriSrc'
									label='Database uniform ressource identifier'
									isFloating>
									<Input
										placeholder='DataBase uniform ressource identifier'
										type='text'
										autoComplete='text'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.uriSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.uriSrc}
										invalidFeedback={formikDBSrc.errors.uriSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='prtSrc' label='Database Port' isFloating>
									<Input
										placeholder='DataBase Port'
										type='number'
										autoComplete='number'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.prtSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.prtSrc}
										invalidFeedback={formikDBSrc.errors.prtSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='sidSrc' label='Database system ID' isFloating>
									<Input
										placeholder='DataBase system ID'
										type='text'
										autoComplete='text'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.sidSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.sidSrc}
										invalidFeedback={formikDBSrc.errors.sidSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card>
				<Card>
					<CardLabel icon='Approval' iconColor='success'>
						<CardTitle>Source Data location</CardTitle>
					</CardLabel>
					<CardBody className='pt-5'>
						<div className='row g-4'>
							<div className='col-md-6'>
								<FormGroup
									id='tableOwnerSrc'
									label='Table owner username'
									isFloating>
									<Input
										placeholder='Table owner username'
										type='text'
										autoComplete='text'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.tableOwnerSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.tableOwnerSrc}
										invalidFeedback={formikDBSrc.errors.tableOwnerSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='tableNameSrc' label='Table name' isFloating>
									<Input
										placeholder='Table name'
										type='text'
										autoComplete='text'
										onChange={formikDBSrc.handleChange}
										onBlur={formikDBSrc.handleBlur}
										value={formikDBSrc.values.tableNameSrc}
										isValid={formikDBSrc.isValid}
										isTouched={formikDBSrc.touched.tableNameSrc}
										invalidFeedback={formikDBSrc.errors.tableNameSrc}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='PermDataSetting' iconColor='success'>
									<CardTitle>Columns to extract</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										color='success'
										onClick={() => {
											console.log('mezel mezel');
										}}>
										Select
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody className='pt-5'>
								<div className='row g-4'>
									<div className='col-md-12'>
										<FormGroup
											id='columnsSrc'
											label='Selected Columns'
											isFloating>
											<Textarea
												placeholder='Selected Columns'
												onChange={formikDBSrc.handleChange}
												onBlur={formikDBSrc.handleBlur}
												value={formikDBSrc.values.columnsSrc}
												isValid={formikDBSrc.isValid}
												isTouched={formikDBSrc.touched.columnsSrc}
												invalidFeedback={formikDBSrc.errors.columnsSrc}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Build' iconColor='success'>
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
												placeholder='Extraction process number'
												type='number'
												autoComplete='number'
												onChange={formikDBSrc.handleChange}
												onBlur={formikDBSrc.handleBlur}
												value={formikDBSrc.values.extractProcessNum}
												isValid={formikDBSrc.isValid}
												isTouched={formikDBSrc.touched.extractProcessNum}
												invalidFeedback={
													formikDBSrc.errors.extractProcessNum
												}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='oracleHint' label='Oracle Hint' isFloating>
											<Input
												placeholder='Oracle Hint'
												type='number'
												autoComplete='number'
												onChange={formikDBSrc.handleChange}
												onBlur={formikDBSrc.handleBlur}
												value={formikDBSrc.values.oracleHint}
												isValid={formikDBSrc.isValid}
												isTouched={formikDBSrc.touched.oracleHint}
												invalidFeedback={formikDBSrc.errors.oracleHint}
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
												placeholder='Chunk size'
												type='number'
												autoComplete='number'
												onChange={formikDBSrc.handleChange}
												onBlur={formikDBSrc.handleBlur}
												value={formikDBSrc.values.extractChunkSize}
												isValid={formikDBSrc.isValid}
												isTouched={formikDBSrc.touched.extractChunkSize}
												invalidFeedback={
													formikDBSrc.errors.extractChunkSize
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
												placeholder='Oracle array size'
												type='number'
												autoComplete='number'
												onChange={formikDBSrc.handleChange}
												onBlur={formikDBSrc.handleBlur}
												value={formikDBSrc.values.arraySize}
												isValid={formikDBSrc.isValid}
												isTouched={formikDBSrc.touched.arraySize}
												invalidFeedback={formikDBSrc.errors.arraySize}
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
												placeholder='Oracle prefetch rows'
												type='number'
												autoComplete='number'
												onChange={formikDBSrc.handleChange}
												onBlur={formikDBSrc.handleBlur}
												value={formikDBSrc.values.prefetchRows}
												isValid={formikDBSrc.isValid}
												isTouched={formikDBSrc.touched.prefetchRows}
												invalidFeedback={formikDBSrc.errors.prefetchRows}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ExtractCard;
