import { Step, StepLabel, Stepper } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import RippleLoader from '../../components/loader/RippleLoader';
import AddApplicantModal from '../../components/self-jobs/AddApplicantModal';
import ApplicantAdditionTable from '../../components/self-jobs/ApplicantAdditionTable';
import CreateJobSkillTab from '../../components/self-jobs/CreateJobSkillTab';
import CreateSelfJobModal from '../../components/self-jobs/CreateSelfJobModal';
import OptionScreen from '../../components/self-jobs/OptionScreen';

const ProcessCandidatePage = () => {
	const [createdJobId, setCreatedJobId] = useState('');
	const [enteredJobId, setEnteredJobId] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [showCreateJob, setShowCreateJob] = useState(true);
	const [currentJobData, setCurrentJobData] = useState({});
	const [singleJobData, setSingleJobData] = useState([]);
	const [allSkills, setAllSkills] = useState([]);
	const [tnc, setTnc] = useState(false);

	const [showOptionScreen, setShowOptionScreen] = useState(true);

	const [secretKey, setSecretKey] = useState('');
	const { checkJobExist } = EndPoints.createProfile;
	const { getJobListing } = EndPoints.jobListing;
	const { postJob } = EndPoints.createJob;

	const [profileValue, setProfileValue] = useState({
		user_id: 16,
		job_name: '',
		status: 'OPEN_UNPUBLISHED',
		organization: '',
		description: '',
		management: [],
		soft: [],
		technical: [],
	});

	const steps = [
		{
			title: showCreateJob ? 'Add job Details' : 'Job Details',
			show: true,
		},
		{
			title: 'Create Job',
			show: showCreateJob ? true : false,
		},
		{
			title: 'Add Applicants',
			show: true,
		},
		{
			title: 'Manage Applicants',
			show: true,
		},
	];

	const [activeStep, setActiveStep] = useState(0);

	const fetchJobData = async (jobID) => {
		try {
			const { data } = await axiosInstance.get(
				`${checkJobExist}/getjobdetails?job_id=${jobID}`,
			);
			// if (JSON.parse(data.body.message).length === 0) {
			// 	setshowMessage(true);
			// }
			setCurrentJobData(JSON.parse(data.body.message)[0]);
			setIsLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchSingleJobData = async (jobID) => {
		try {
			const res = await Promise.all([
				axiosInstance.get(`${getJobListing}/getjobapplicants?job_id=${jobID}`),
			]);
			const parsedData = res.map((res) => JSON.parse(res.data.body).message);

			setSingleJobData(parsedData[0]);
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchAllSkills = async () => {
		try {
			const { data } = await axiosInstance.get(
				`${'https://b2jzh4pdxj.execute-api.ap-south-1.amazonaws.com/Dev/getSkillCloud?skill=all'}`,
			);
			//console.log(data);
			setAllSkills(data);
		} catch (err) {
			console.log(err.message);
		}
	};

	const refetchData = (jobID) => {
		fetchJobData(jobID);
		fetchSingleJobData(jobID);
	};

	useEffect(() => {
		if (!showOptionScreen) {
			const jobID = createdJobId === '' ? enteredJobId : createdJobId;
			if (showCreateJob) {
				fetchAllSkills();
				setIsLoading(false);
			} else {
				fetchJobData(jobID);
				fetchSingleJobData(jobID);
				// fetchAllSkills();
			}
		}
	}, [showOptionScreen]);

	const handleCreateJob = async (e) => {
		e.preventDefault();
		const postDataValue = { ...profileValue };

		delete postDataValue.management;
		delete postDataValue.soft;
		delete postDataValue.technical;

		try {
			const { data } = await axiosInstance.post(`${postJob}`, {
				...postDataValue,
				required_management_skills: String(profileValue.management),
				required_soft_skills: String(profileValue.soft),
				required_technical_skills: String(profileValue.technical),
			});
			const res = JSON.parse(data.body);
			toast.success(res.message, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setCreatedJobId(res.job_id);
			refetchData(res.job_id);
			setShowCreateJob(false);
			setActiveStep(activeStep + 1);
		} catch (err) {
			toast.error(err.message, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	if (showOptionScreen) {
		return (
			<div className="min-h-screen p-4 sm:p-6 md:p-10 ">
				<OptionScreen
					setShowOptionScreen={setShowOptionScreen}
					setShowCreateJob={setShowCreateJob}
					setEnteredJobId={setEnteredJobId}
				/>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-4 sm:p-6 md:p-10 ">
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
			{isLoading ? (
				<RippleLoader />
			) : (
				<Fragment>
					<div className="flex flex-col  max-w-6xl mx-auto">
						{(createdJobId.length > 0 || enteredJobId.length > 0) && (
							<div className="flex gap-4 text-sm flex-col items-end">
								<p className="font-semibold">
									JOB ID: {createdJobId === '' ? enteredJobId : createdJobId}
								</p>
								<p className="text-yellow-500">
									Keep the above mentioned Job ID with yourself to evaluate
									candidate
								</p>
							</div>
						)}
						<div className="flex flex-col gap-4">
							<Stepper activeStep={activeStep}>
								{steps.map((label, index) => {
									const stepProps = {};
									const labelProps = {};

									return (
										label.show && (
											<Step key={index} {...stepProps}>
												<StepLabel {...labelProps}>{label.title}</StepLabel>
											</Step>
										)
									);
								})}
							</Stepper>
							<div className="h-[2px] bg-gradient-to-r from-blue-400 to-orange-400 rounded-full w-full"></div>
						</div>

						{activeStep === 0 && (
							<CreateSelfJobModal
								showCreateJob={showCreateJob}
								currentJobData={currentJobData}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
								profileValue={profileValue}
								setProfileValue={setProfileValue}
								setSecretKey={setSecretKey}
								secretKey={secretKey}
							/>
						)}

						{activeStep === 1 && showCreateJob && (
							<CreateJobSkillTab
								profileValue={profileValue}
								setProfileValue={setProfileValue}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
								allSkills={allSkills}
								tnc={tnc}
								setTnc={setTnc}
								onSubmit={handleCreateJob}
							/>
						)}

						{activeStep === 2 && (
							<AddApplicantModal
								refetchData={refetchData}
								close={() => {
									refetchData(
										createdJobId === '' ? enteredJobId : createdJobId,
									);
								}}
								jobID={createdJobId === '' ? enteredJobId : createdJobId}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
							/>
						)}

						{activeStep === 3 && (
							<ApplicantAdditionTable
								applicantsData={singleJobData}
								refetchData={refetchData}
								jobID={createdJobId === '' ? enteredJobId : createdJobId}
								setActiveStep={setActiveStep}
								activeStep={activeStep}
							/>
						)}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default ProcessCandidatePage;
