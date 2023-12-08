import React, { FC, ReactNode, useContext, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useTour } from '@reactour/tour';
import Button, { IButtonProps } from '../../../components/bootstrap/Button';
import { HeaderRight } from '../../../layout/Header/Header';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Alert from '../../../components/bootstrap/Alert';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import ThemeContext from '../../../contexts/themeContext';
import LANG, { getLangWithKey, ILang } from '../../../lang';
import showNotification from '../../../components/extras/showNotification';
import useDarkMode from '../../../hooks/useDarkMode';
import Popovers from '../../../components/bootstrap/Popovers';
import Spinner from '../../../components/bootstrap/Spinner';

interface ICommonHeaderRightProps {
	beforeChildren?: ReactNode;
	afterChildren?: ReactNode;
}
const CommonHeaderRight: FC<ICommonHeaderRightProps> = ({ beforeChildren, afterChildren }) => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const styledBtn: IButtonProps = {
		color: darkModeStatus ? 'dark' : 'light',
		hoverShadow: 'default',
		isLight: !darkModeStatus,
		size: 'lg',
	};

	const [offcanvasStatus, setOffcanvasStatus] = useState(false);

	const { i18n } = useTranslation();

	const changeLanguage = (lng: ILang['key']['lng']) => {
		i18n.changeLanguage(lng).then();
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon={getLangWithKey(lng)?.icon} size='lg' className='me-1' />
				<span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
			</span>,
			'You updated the language of the site. (Only "Aside" was prepared as an example.)',
		);
	};

	/**
	 * Language attribute
	 */
	useLayoutEffect(() => {
		document.documentElement.setAttribute('lang', i18n.language.substring(0, 2));
	});

	const { setIsOpen } = useTour();

	return (
		<HeaderRight>
			<div className='row g-3'>
				{beforeChildren}
				{/* Tour Modal */}
				{/* {localStorage.getItem('tourModalStarted') === 'shown' && (
					<div className='col-auto position-relative'>
						<Popovers trigger='hover' desc='Start the "DataMigrationMorpher" tour'>
							<Button
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...styledBtn}
								icon='Tour'
								onClick={() => setIsOpen(true)}
								aria-label='Start the "DataMigrationMorpher" tour'
							/>
						</Popovers>
						<Icon
							icon='Circle'
							className={classNames(
								'position-absolute start-65',
								'text-danger',
								'animate__animated animate__heartBeat animate__infinite animate__slower',
							)}
						/>
					</div>
				)} */}

				{/* Dark Mode */}
				<div className='col-auto'>
					<Popovers trigger='hover' desc='Dark / Light mode'>
						<Button
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...styledBtn}
							onClick={() => setDarkModeStatus(!darkModeStatus)}
							className='btn-only-icon'
							data-tour='dark-mode'>
							<Icon
								icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
								color={darkModeStatus ? 'info' : 'warning'}
								className='btn-icon'
							/>
						</Button>
					</Popovers>
				</div>

				{/*	Full Screen */}
				<div className='col-auto'>
					<Popovers trigger='hover' desc='Fullscreen'>
						<Button
							data-tour='fullscreen'
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...styledBtn}
							icon={fullScreenStatus ? 'FullscreenExit' : 'Fullscreen'}
							onClick={() => setFullScreenStatus(!fullScreenStatus)}
							aria-label='Toggle dark mode'
						/>
					</Popovers>
				</div>

				{/* Lang Selector */}
				<div className='col-auto'>
					{/* <Dropdown>
						<DropdownToggle hasIcon={false}>
							{typeof getLangWithKey(i18n.language as ILang['key']['lng'])?.icon ===
							'undefined' ? (
								<Button
									// eslint-disable-next-line react/jsx-props-no-spreading
									{...styledBtn}
									className='btn-only-icon'
									aria-label='Change language'
									data-tour='lang-selector'>
									<Spinner isSmall inButton='onlyIcon' isGrow />
								</Button>
							) : (
								<Button
									// eslint-disable-next-line react/jsx-props-no-spreading
									{...styledBtn}
									icon={
										getLangWithKey(i18n.language as ILang['key']['lng'])?.icon
									}
									aria-label='Change language'
									data-tour='lang-selector'
								/>
							)}
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd data-tour='lang-selector-menu'>
							{Object.keys(LANG).map((i) => (
								<DropdownItem key={LANG[i].lng}>
									<Button
										icon={LANG[i].icon}
										onClick={() => changeLanguage(LANG[i].lng)}>
										{LANG[i].text}
									</Button>
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown> */}
				</div>
				{afterChildren}
			</div>
		</HeaderRight>
	);
};
CommonHeaderRight.propTypes = {
	beforeChildren: PropTypes.node,
	afterChildren: PropTypes.node,
};
CommonHeaderRight.defaultProps = {
	beforeChildren: null,
	afterChildren: null,
};

export default CommonHeaderRight;
