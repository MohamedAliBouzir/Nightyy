import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
} from '../menu';

const HOME = {
	HOME: lazy(() => import('../pages/presentation/HomePage')),
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};


const presentation: RouteProps[] = [
	{
		path: dashboardPagesMenu.summary.path,
		element: <HOME.HOME />,
	},
	{
		path: dashboardPagesMenu.general.path,
		element: <HOME.DASHBOARD />,
	},
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
];
const contents = [...presentation];

export default contents;
