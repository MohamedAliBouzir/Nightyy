import { useFormik } from 'formik';
import React, {useEffect} from 'react'
import Card, { CardBody, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

interface ITransformdetails {
	columnToMap: string;
	conditionalValue: string;
	newValue: string;
	condition: string;
    transformProcessNum: string;
}

const validate = (values: ITransformdetails) => {
	const errors: ITransformdetails = {
		columnToMap: '',
		conditionalValue: '',
		newValue: '',
		condition: '',
        transformProcessNum: '',
	};
	if (!values.columnToMap) {
		errors.columnToMap = 'Required';
	}
	if (!values.condition) {
		errors.condition = 'Required';
	} else if (
		values.condition != '>' &&
		values.condition != '<' &&
		values.condition != '>=' &&
		values.condition != '<=' &&
		values.condition != '=' &&
		values.condition != '!='
	) {
		errors.condition = 'This is not a condition';
	}
	if (!values.newValue) {
		errors.newValue = 'Required';
	}
	if (!values.conditionalValue) {
		errors.conditionalValue = 'Required';
	}
    if (!values.transformProcessNum) {
        errors.transformProcessNum = 'Required';
    }
    else if (parseInt(values.transformProcessNum) < 1){
        errors.transformProcessNum = 'Process number can not be less than 1';
    }
    return errors;
};


const TransformCard = () => {
	const formikTransform = useFormik({
		initialValues: {
            columnToMap: '',
			conditionalValue: '',
			newValue: '',
			condition: '',
            transformProcessNum: '',
		},
		validate,
		onSubmit: () => {
			console.log('hani ndir f transform');
		},
	});
    useEffect(() => {
		const allValuesFilled = Object.values(formikTransform.values).every(value => Boolean(value));
		if (allValuesFilled){
			let data: any = formikTransform.values
			localStorage.setItem('transformInfos', JSON.stringify(data))
		}
		else{
			if (localStorage.getItem('transformInfos') !== null){
				localStorage.removeItem('transformInfos');
			}
		}
	}, [formikTransform.values]);
  return (
    <Card stretch color='danger' className='shadow-3d-info'>
	    <CardBody isScrollable>
            <Card>
                <CardLabel icon='Edit' iconColor='danger'>
                    <CardTitle>Transformation details</CardTitle>
                </CardLabel>
                <CardBody className='pt-5'>
                    <div className='row g-4'>
                        <div className='col-md-12'>
                            <FormGroup
                            id='transformProcessNum'
                            label='Number of transformation Process'
                            isFloating>
                                <Input
                                placeholder='Number of transformation Process'
                                type='number'
                                autoComplete='number'
                                onChange={formikTransform.handleChange}
                                onBlur={formikTransform.handleBlur}
                                value={formikTransform.values.columnToMap}
                                isValid={formikTransform.isValid}
                                isTouched={formikTransform.touched.columnToMap}
                                invalidFeedback={formikTransform.errors.columnToMap}
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
                                placeholder='Column to transform'
                                type='text'
                                autoComplete='text'
                                onChange={formikTransform.handleChange}
                                onBlur={formikTransform.handleBlur}
                                value={formikTransform.values.columnToMap}
                                isValid={formikTransform.isValid}
                                isTouched={formikTransform.touched.columnToMap}
                                invalidFeedback={formikTransform.errors.columnToMap}
                                validFeedback='Looks good!'
                                />
                            </FormGroup>
                        </div>
                        <div className='col-md-6'>
                            <FormGroup
                            id='conditionalValue'
                            label='Value to transform'
                            isFloating>
                                <Input
                                placeholder='Value to transform'
                                type='text'
                                autoComplete='text'
                                onChange={formikTransform.handleChange}
                                onBlur={formikTransform.handleBlur}
                                value={formikTransform.values.conditionalValue}
                                isValid={formikTransform.isValid}
                                isTouched={formikTransform.touched.conditionalValue}
                                invalidFeedback={formikTransform.errors.conditionalValue}
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
                                placeholder='Transformation condition'
                                type='text'
                                autoComplete='text'
                                onChange={formikTransform.handleChange}
                                onBlur={formikTransform.handleBlur}
                                value={formikTransform.values.condition}
                                isValid={formikTransform.isValid}
                                isTouched={formikTransform.touched.condition}
                                invalidFeedback={formikTransform.errors.condition}
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
                                placeholder='Set new column value'
                                type='text'
                                autoComplete='text'
                                onChange={formikTransform.handleChange}
                                onBlur={formikTransform.handleBlur}
                                value={formikTransform.values.newValue}
                                isValid={formikTransform.isValid}
                                isTouched={formikTransform.touched.newValue}
                                invalidFeedback={formikTransform.errors.newValue}
                                validFeedback='Looks good!'
                                />
                            </FormGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </CardBody>
	</Card>
  )
}

export default TransformCard
