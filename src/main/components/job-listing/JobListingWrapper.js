import React from 'react';
import uuid from 'react-uuid';
import SingleJobCard from './SingleJobCard';

const JobListingWrapper = ({ allJobData, fetchAllJobs }) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl m-auto gap-4 sm:gap-6 md:gap-10 ">
			{allJobData.length === 0 && (
				<p className="font-semibold text-center py-20 ">No Job Listed</p>
			)}
			{allJobData.map((singleJobData) => (
				<SingleJobCard
					singleJobData={singleJobData}
					key={uuid()}
					fetchAllJobs={fetchAllJobs}
				/>
			))}
		</div>
	);
};

export default JobListingWrapper;
