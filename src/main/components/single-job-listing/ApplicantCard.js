import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import ResponsiveApplicantCard from './ResponsiveApplicantCard';
import WebApplicantCard from './WebApplicantCard';

const ApplicantCard = (props) => {
	const theme = useTheme();
	const largeView = useMediaQuery(theme.breakpoints.up('md'));
	return largeView ? (
		<WebApplicantCard {...props} />
	) : (
		<ResponsiveApplicantCard {...props} />
	);
};

export default ApplicantCard;
