import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import ErrorComponent from '../../components/error/ErrorComponent';
import RippleLoader from '../../components/loader/RippleLoader';
import JobApplicantsTable from '../../components/single-job-listing/SingleJobCards';

export const applicantStatus = [
	{
		label: 'All',
		value: 'ALL',
	},
	{
		label: 'New applicant',
		value: 'NEW',
	},
	{
		label: 'Under Review',
		value: 'UNDER_REVIEW',
	},
	{
		label: 'Shortlisted',
		value: 'SHORTLISTED',
	},
	{
		label: 'Phone Screening',
		value: 'PHONE_SCREENING',
	},
	{
		label: 'Assessment',
		value: 'ASSESSMENT',
	},
	{
		label: 'Interview',
		value: 'INTERVIEW',
	},
	{
		label: 'Second Interview',
		value: 'SECOND_INTERVIEW',
	},
	{
		label: 'Background Check',
		value: 'BACKGROUND_CHECK',
	},
	{
		label: 'Reference Check',
		value: 'REFERENCE_CHECK',
	},
	{
		label: 'Job Offer',
		value: 'JOB_OFFER',
	},
	{
		label: 'Offer Accepted',
		value: 'OFFER_ACCEPTED',
	},
	{
		label: 'Offer Declined',
		value: 'OFFER_DECLINED',
	},
	{
		label: 'On Hold',
		value: 'ON_HOLD',
	},
	{
		label: 'Not Selected',
		value: 'NOT_SELECTED',
	},
];

const SingleJobPage = () => {
	const { jobId } = useParams();
	const [loading, setLoading] = useState(true);
	const [singleJobData, setSingleJobData] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPage, setTotalPage] = useState(0);
	const [search, setSearch] = useState('');
	const [loadingSearch, setLoadingSearch] = useState(false);
	const [isProcessingJob, setIsProcessingJob] = useState(false);
	const { getJobListing } = EndPoints.jobListing;
	const { checkJobExist } = EndPoints.createProfile;

	const getJobStatus = async () => {
		try {
			const { data } = await axiosInstance.get(
				`${checkJobExist}/getjobstatus?job_id=${jobId}`,
			);
			const res = JSON.parse(data.body);
			if (res?.status.toLowerCase() === 'open_unpublished') {
				setIsProcessingJob(true);
			}
		} catch (err) {}
	};

	const fetchSingleJobApplicants = async () => {
		try {
			const { data } = await axiosInstance.get(
				`${getJobListing}/getjobapplicants?job_id=${jobId}&page=${page}&limit=${limit}&status=${'ALL'}&search=${search}`,
			);

			const parsedData = JSON.parse(data.body);

			setSingleJobData(parsedData.message);
			setTotalPage(parsedData.total_pages);

			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const applySearchFilter = async () => {
		setLoadingSearch(true);
		setPage(1);
		fetchSingleJobApplicants();
	};

	useEffect(() => {
		getJobStatus();
	}, []);

	useEffect(() => {
		fetchSingleJobApplicants();
	}, [page, limit]);

	useEffect(() => {
		if (search.length > 0) {
			setLoadingSearch(true);
		} else setLoadingSearch(false);

		const jobSearchTimeout = setTimeout(() => {
			applySearchFilter();
		}, 2000);
		return () => {
			clearTimeout(jobSearchTimeout);
		};
	}, [search]);

	return (
		<div className="min-h-screen p-4 sm:p-6 md:p-10">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{loading ? (
				<RippleLoader />
			) : (
				<div>
					<ErrorBoundary FallbackComponent={ErrorComponent}>
						<JobApplicantsTable
							data={singleJobData}
							fetchAllApplicants={fetchSingleJobApplicants}
							jobId={jobId}
							isProcessingJob={isProcessingJob}
							page={page}
							limit={limit}
							totalPage={totalPage}
							search={search}
							setSearch={setSearch}
							setPage={setPage}
							applicantStatus={applicantStatus}
						/>
					</ErrorBoundary>
				</div>
			)}
		</div>
	);
};

export default SingleJobPage;
