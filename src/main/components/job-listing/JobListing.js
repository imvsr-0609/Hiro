import React, { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import IconButton from '../../ui-component/buttons/IconButton';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import CreateJobModal from '../create-job/CreateJobModal';
import JobListingWrapper from './JobListingWrapper';

const JobListing = ({ fetchAllJobs, allJobData }) => {
	const [showCreateJobModal, setShowCreateJobModal] = useState(false);
	const { state } = useLocation();
	console.log(state);
	const [tab, setTab] = useState(state?.tabIndex ? state?.tabIndex : 1);
	const { user } = useSelector((state) => state.auth);
	return (
		<div>
			<div className="flex flex-col-reverse max-w-7xl m-auto sm:flex-row justify-between gap-3 items-end sm:items-center mb-6 md:mb-10 ">
				<div className="flex w-full flex-wrap sm:max-w-md gap-1 items-center text-xs sm:text-sm  ">
					<button
						className={`flex-1 p-3 grid place-items-center ${
							tab === 1 &&
							'bg-blue-50 shadow-md  rounded-full border  font-semibold  '
						} `}
						onClick={() => setTab(1)}
					>
						Open Jobs
					</button>
					<button
						className={`flex-1 p-3 grid place-items-center ${
							tab === 2 &&
							'bg-orange-50  shadow-md rounded-full border font-semibold  '
						}  `}
						onClick={() => setTab(2)}
					>
						Closed Jobs
					</button>
					<button
						className={`flex-1 p-3 grid place-items-center ${
							tab === 4 &&
							'bg-orange-50  shadow-md rounded-full border font-semibold  '
						}  `}
						onClick={() => setTab(4)}
					>
						Processing Jobs
					</button>
					{user.type === 'AGENCY' && (
						<button
							className={`flex-1 p-3 grid place-items-center ${
								tab === 3 &&
								'bg-gray-100  shadow-md rounded-full border font-semibold  '
							}  `}
							onClick={() => setTab(3)}
						>
							Pending Jobs
						</button>
					)}
				</div>
				<IconButton
					toolTipTitle={'Create Job'}
					onClick={() => setShowCreateJobModal(true)}
					text={'Create Job'}
					icon={<IoAddCircle />}
					type="primary"
				/>
			</div>

			{showCreateJobModal && (
				<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-4xl p-4 m-auto z-50">
						<ClickWrapper func={() => {}}>
							<CreateJobModal
								refetchData={fetchAllJobs}
								close={() => setShowCreateJobModal(false)}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}

			{tab === 1 && (
				<JobListingWrapper
					allJobData={allJobData.filter((job) => job.status === 'OPEN')}
					fetchAllJobs={fetchAllJobs}
				/>
			)}
			{tab === 2 && (
				<JobListingWrapper
					allJobData={allJobData.filter((job) => job.status === 'CLOSE')}
					fetchAllJobs={fetchAllJobs}
				/>
			)}
			{tab === 3 && (
				<JobListingWrapper
					allJobData={allJobData.filter((job) => job.status === 'PENDING')}
					fetchAllJobs={fetchAllJobs}
				/>
			)}
			{tab === 4 && (
				<JobListingWrapper
					allJobData={allJobData.filter(
						(job) => job.status === 'OPEN_UNPUBLISHED',
					)}
					fetchAllJobs={fetchAllJobs}
				/>
			)}
		</div>
	);
};

export default JobListing;
