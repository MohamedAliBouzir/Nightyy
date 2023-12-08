import React, { ReactNode, useContext, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Brand from '../../../layout/Brand/Brand';
import Navigation from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import {
	dashboardPagesMenu,
} from '../../../menu';
import ThemeContext from '../../../contexts/themeContext';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		localStorage.getItem('Mig_asideDocStatus') === 'true' || false,
	);

	const { t } = useTranslation(['translation', 'menu']);

	const { darkModeStatus } = useDarkMode();

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{!doc && (
					<>
						<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
					</>
				)}

				{asideStatus && doc && (
					<Card className='m-3 '>
						<CardBody className='pt-0'>
							<p
								className={classNames('h4', {
									'text-dark': !darkModeStatus,
									'text-light': darkModeStatus,
								})}>
								{t('Everything is ready!') as ReactNode}
							</p>
							<Button
								color='info'
								isLight
								className='w-100'
								onClick={() => {
									localStorage.setItem('Mig_asideDocStatus', 'false');
									setDoc(false);
								}}>
								{t('Demo Pages') as ReactNode}
							</Button>
						</CardBody>
					</Card>
				)}
			</AsideBody>
			<AsideFoot>
				<nav aria-label='aside-bottom-menu'>
					<div className='navigation'>
						
					</div>
				</nav>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export default DefaultAside;
