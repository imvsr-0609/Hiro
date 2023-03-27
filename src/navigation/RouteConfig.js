import React, { useEffect } from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';
import ErrorPage from '../main/pages/error/ErrorPage';
import ProcessCandidatePage from '../main/pages/process-caandidate/ProcessCandidatePage';
import SingleJobPage from '../main/pages/single-job-listing/SingleJobPage';
import { ERROR_PAGE, HOME_PAGE, SINGLE_JOB_LISTING_PAGE } from './routes';

const RouteConfig = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: '0px' });
	}, [pathname]);
	return (
		<Switch>
			<Route exact path={HOME_PAGE} element={<ProcessCandidatePage />} />
			<Route exact path={SINGLE_JOB_LISTING_PAGE} element={<SingleJobPage />} />
			<Route path={ERROR_PAGE} element={<ErrorPage />} />
		</Switch>
	);
};

export default RouteConfig;
