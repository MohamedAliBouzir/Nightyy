import React from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
	MigrationPageMenu,
} from '../menu';
import ProfilePageHeader from '../pages/_layout/_headers/ProfilePageHeader';
import SummaryHeader from '../pages/_layout/_headers/HomeHeader';

const headers: RouteProps[] = [
	{ path: demoPagesMenu.login.path, element: null },
	{ path: demoPagesMenu.signUp.path, element: null },
	{ path: demoPagesMenu.page404.path, element: null },
	{
		path: dashboardPagesMenu.summary.path,
		element: <SummaryHeader />,
	},
	{ path: dashboardPagesMenu.general.path, element: <ProfilePageHeader /> },
	{ path: `${MigrationPageMenu.migrationID.path}/:id`, element: <ProfilePageHeader />},
	{path: dashboardPagesMenu.migrationLauncher.path, element: <ProfilePageHeader />},
	{
		path: `*`,
		element: <SummaryHeader />,
	},
];

export default headers;
