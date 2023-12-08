
import React, { FC } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import classNames from 'classnames';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';




const MigrationDetails = (props: any) => {
	const propsEntries = Object.entries(props);
	const {darkModeStatus} = useDarkMode();
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='PermDataSetting'>
					<CardTitle>
						<span>
							Details
							<small> - general</small>
						</span>
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody isScrollable>
				<div className='row g-3'>
				{propsEntries.map(([propName, propValue]:any) => 
				(<div key={propName} className='col-12'>
					<div className='row'>
						<div className='col d-flex align-items-center'>
							<div className='flex-shrink-0'>
								<div className='ratio ratio-1x1 me-3' style={{ width: 48 }}>
									<div
										className={classNames(
											'rounded-2',
											'd-flex align-items-center justify-content-center',
											{
												'bg-l10-dark': !darkModeStatus,
												'bg-l90-dark': darkModeStatus,
											},
										)}>
											<span className='fw-bold'>{getFirstLetter(propValue.value)}</span>
									</div>
								</div>
							</div>
							<div className='flex-grow-1'>
								<div className='fs-6'>{propValue.value}</div>
							</div>
						</div>
						<div className='col-auto text-end'>
							<br></br>
							<div className='text-muted'>
								<small>{propValue.data}</small>
							</div>
						</div>
					</div>
				</div>))}
				</div>
			</CardBody>
		</Card>
	);
};

export default MigrationDetails;
