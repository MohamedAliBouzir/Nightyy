import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Avatar from '../../../components/Avatar';
import UserImage2Webp from '../../../assets/img/wanna/wanna1.webp';
import UserImage2 from '../../../assets/img/wanna/wanna1.png';
import CommonHeaderRight from './CommonHeaderRight';
import { getUserDataWithId } from '../../../common/data/userDummyData';

const ProfilePageHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<div className='col d-flex align-items-center'>
					<div className='me-3'>
						<Avatar
							srcSet={UserImage2Webp}
							src={UserImage2}
							size={48}
							color='primary'
						/>
					</div>
					<div>
						<div className='fw-bold fs-6 mb-0'>
							{getUserDataWithId('1').name} {getUserDataWithId('1').surname}
						</div>
						<div className='text-muted'>
							<small>{getUserDataWithId('1').position}</small>
						</div>
					</div>
				</div>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default ProfilePageHeader;
