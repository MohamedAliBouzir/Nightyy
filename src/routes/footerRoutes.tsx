import React from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers: RouteProps[] = [
	{ path: demoPagesMenu.page404.path, element: null },
	{ path: '*', element: <DefaultFooter /> },
];

export default footers;
