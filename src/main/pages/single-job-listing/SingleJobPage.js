import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import ErrorComponent from '../../components/error/ErrorComponent';
import RippleLoader from '../../components/loader/RippleLoader';
import JobApplicantsTable from '../../components/single-job-listing/SingleJobCards';

const SingleJobPage = () => {
	const { jobId } = useParams();
	const [loading, setLoading] = useState(true);
	const [singleJobData, setSingleJobData] = useState([]);
	const [isProcessingJob, setIsProcessingJob] = useState(false);
	const { getJobListing } = EndPoints.jobListing;
	const { checkJobExist } = EndPoints.createProfile;

	const fetchSingleJobData = async () => {
		try {
			const res = await Promise.all([
				axiosInstance.get(`${getJobListing}/getjobapplicants?job_id=${jobId}`),

				axiosInstance.get(`${checkJobExist}/getjobstatus?job_id=${jobId}`),
			]);
			const parsedData = res.map((res) => JSON.parse(res.data.body));

			setSingleJobData(parsedData[0].message);
			if (parsedData[1]?.status.toLowerCase() === 'open_unpublished') {
				setIsProcessingJob(true);
			}
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchSingleJobData();
	}, []);

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
							fetchAllApplicants={fetchSingleJobData}
							jobId={jobId}
							isProcessingJob={isProcessingJob}
						/>
					</ErrorBoundary>
				</div>
			)}
		</div>
	);
};

export default SingleJobPage;
