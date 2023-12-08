import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

interface ILoadDetails {
	uidTrg: string;
	pwdTrg: string;
	uriTrg: string;
	prtTrg: string;
	sidTrg: string;
	tableOwnerTrg: string;
	tableNameTrg: string;
	loadProcessNum: string;
}

const validate = (values: ILoadDetails) => {
	const errors: ILoadDetails = {
		uidTrg: '',
		pwdTrg: '',
		uriTrg: '',
		prtTrg: '',
		sidTrg: '',
		tableOwnerTrg: '',
		tableNameTrg: '',
		loadProcessNum: '',
	};
	if (!values.uidTrg) {
		errors.uidTrg = 'Required';
	}
	if (!values.pwdTrg) {
		errors.pwdTrg = 'Required';
	}
	if (!values.prtTrg) {
		errors.prtTrg = 'Required';
	} else if (parseInt(values.prtTrg) < 0) {
		errors.prtTrg = 'Port can not be negative';
	}
	if (!values.sidTrg) {
		errors.sidTrg = 'Required';
	}
	if (!values.uriTrg) {
		errors.uriTrg = 'Required';
	} else if (
		!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(
			values.uriTrg,
		)
	) {
		errors.uriTrg = 'Wrong URI form';
	}
	if (!values.tableNameTrg) {
		errors.tableNameTrg = 'Required';
	}
	if (!values.tableOwnerTrg) {
		errors.tableOwnerTrg = 'Required';
	}
	if (!values.loadProcessNum) {
		errors.loadProcessNum = 'Required';
	} else if (parseInt(values.loadProcessNum) < 1) {
		errors.loadProcessNum = 'Minimum process number to execute is 1';
	}
	return errors
};

const LoadCard = () => {
	const formikDBTrg = useFormik({
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
		validate,
		onSubmit: () => {
			console.log('loading started');
		},
	});
	useEffect(() => {
		const allValuesFilled = Object.values(formikDBTrg.values).every(value => Boolean(value));
		if (allValuesFilled){
			let data: any = formikDBTrg.values
			localStorage.setItem('loadInfos', JSON.stringify(data))
		}
		else{
			if (localStorage.getItem('loadInfos') !== null){
				localStorage.removeItem('loadInfos');
			}
		}
	}, [formikDBTrg.values]);
	return (
		<Card stretch color='danger' className='shadow-3d-info'>
			<CardBody isScrollable>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<Card>
							<CardLabel icon='Edit' iconColor='info'>
								<CardTitle>Transformation details</CardTitle>
							</CardLabel>
							<CardBody className='pt-5'>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup
											id='uidTrg'
											label='Target Database user ID'
											isFloating>
											<Input
												placeholder='Target Database user ID'
												type='text'
												autoComplete='text'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.uidTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.uidTrg}
												invalidFeedback={formikDBTrg.errors.uidTrg}
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
												placeholder='Target Database password'
												type='password'
												autoComplete='password'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.pwdTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.pwdTrg}
												invalidFeedback={formikDBTrg.errors.pwdTrg}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup
											id='uriTrg'
											label='Database uniform ressource identifier'
											isFloating>
											<Input
												placeholder='Database uniform ressource identifier'
												type='text'
												autoComplete='text'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.uriTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.uriTrg}
												invalidFeedback={formikDBTrg.errors.uriTrg}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup id='prtTrg' label='Database Port' isFloating>
											<Input
												placeholder='Database Port'
												type='number'
												autoComplete='number'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.prtTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.prtTrg}
												invalidFeedback={formikDBTrg.errors.prtTrg}
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
												placeholder='Database system ID'
												type='text'
												autoComplete='text'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.sidTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.sidTrg}
												invalidFeedback={formikDBTrg.errors.sidTrg}
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
						<Card>
							<CardLabel icon='Approval' iconColor='info'>
								<CardTitle>Target Data locating</CardTitle>
							</CardLabel>
							<CardBody className='pt-5'>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup
											id='tableOwnerTrg'
											label='Table owner username'
											isFloating>
											<Input
												placeholder='Table owner username'
												type='text'
												autoComplete='text'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.tableOwnerTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.tableOwnerTrg}
												invalidFeedback={formikDBTrg.errors.tableOwnerTrg}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='tableNameTrg' label='Table name' isFloating>
											<Input
												placeholder='Table name'
												type='text'
												autoComplete='text'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.tableNameTrg}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.tableNameTrg}
												invalidFeedback={formikDBTrg.errors.tableNameTrg}
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
												placeholder='Load process number'
												type='number'
												autoComplete='number'
												onChange={formikDBTrg.handleChange}
												onBlur={formikDBTrg.handleBlur}
												value={formikDBTrg.values.loadProcessNum}
												isValid={formikDBTrg.isValid}
												isTouched={formikDBTrg.touched.loadProcessNum}
												invalidFeedback={formikDBTrg.errors.loadProcessNum}
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

export default LoadCard;
