import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import TextInput from '../create-profile/text-input/TextInput';

const OptionScreen = ({
	setShowOptionScreen,
	setShowCreateJob,
	setEnteredJobId,
}) => {
	const [showJobIdInput, setShowJobidInput] = useState(false);
	const [jobID, setJobID] = useState('');
	const { checkJobExist } = EndPoints.createProfile;

	const handleAddNewJob = () => {
		setShowCreateJob(true);
		setShowOptionScreen(false);
	};

	const handleManageExisting = () => {
		setShowJobidInput(true);
	};

	const handleJobIdCheck = async () => {
		try {
			const { data } = await axiosInstance.get(
				`${checkJobExist}/getjobstatus?job_id=${jobID}`,
			);
			if (data.body === 'null') {
				toast.error("Job doesn't exist", {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				const status = JSON.parse(data.body)?.status;
				if (status === 'OPEN_UNPUBLISHED') {
					setEnteredJobId(jobID);
					setShowCreateJob(false);
					setShowOptionScreen(false);
				} else {
					toast.error('Not a valid Job', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<div className="flex flex-col gap-10  w-full h-full  ">
			<div className="flex flex-col justify-center items-center text-center">
				<div className=" h-[200px] w-80 object-contain ">
					<lottie-player
						src="https://assets6.lottiefiles.com/packages/lf20_syglwy7h.json"
						background="transparent"
						speed="1"
						style={{
							height: '100%',
							objectFit: 'contain',
							margin: 'auto',
						}}
						loop
						autoplay
					></lottie-player>
				</div>
				<div className="flex flex-col gap-2 ">
					<h1 className=" text-2xl md:text-4xl font-bold">
						Candidate Processing
					</h1>
					<h2 className="text-sm md:text-lg font-semibold">
						Processing Job candidates made easier
					</h2>
				</div>
			</div>
			<div className="w-full h-full  max-w-5xl mx-auto  rounded-3xl  flex flex-col lg:flex-row gap-10  text-gray-600">
				<div
					onClick={handleAddNewJob}
					className=" w-full border-blue-400 border-2 cursor-pointer relative  p-16 rounded-lg overflow-hidden bg-white"
				>
					<div className="flex flex-col items-center gap-6 ">
						<div className=" h-full w-80 object-contain ">
							<lottie-player
								src="https://assets6.lottiefiles.com/packages/lf20_ij2ngolf.json"
								background="transparent"
								speed="1"
								style={{
									height: '100%',
									objectFit: 'contain',
									margin: 'auto',
								}}
								loop
								autoplay
							></lottie-player>
						</div>

						<h1 className="text-center bg-blue-400 text-white text-sm absolute bottom-0 inset-x-0 px-6 py-4 font-bold ">
							Add New Job
						</h1>
					</div>
				</div>
				<div
					onClick={handleManageExisting}
					className=" w-full border-green-400 border-2 cursor-pointer relative  p-16 rounded-lg overflow-hidden bg-white"
				>
					<div className="flex flex-col items-center gap-6 ">
						<div className=" h-full w-80 object-contain ">
							<lottie-player
								src="https://assets4.lottiefiles.com/packages/lf20_X8wA00rqrk.json"
								background="transparent"
								speed="1"
								style={{
									height: '100%',
									objectFit: 'contain',
									margin: 'auto',
								}}
								loop
								autoplay
							></lottie-player>
						</div>
						<h1 className="text-center bg-green-400 text-white text-sm absolute bottom-0 inset-x-0 px-6 py-4 font-bold ">
							Manage Existing Job
						</h1>
					</div>
					{showJobIdInput && (
						<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
							<div className="w-full max-w-xl p-4 m-auto z-50">
								<ClickWrapper func={() => setShowJobidInput(false)}>
									<div className="p-8 bg-white rounded-xl flex flex-col gap-6 ">
										<TextInput
											value={jobID}
											setValue={(val) => setJobID(val)}
											label={'Job ID'}
											placeholder={'Enter Job ID'}
										/>
										<button
											onClick={handleJobIdCheck}
											className="bg-blue-500 w-40 rounded-full text-white px-6 py-3 text-sm text-center"
										>
											Continue
										</button>
									</div>
								</ClickWrapper>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OptionScreen;
