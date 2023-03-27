import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import SubmitButton from '../auth/SubmitButton';
import TextInput from '../create-profile/text-input/TextInput';

const CreateSelfJobModal = ({
	showCreateJob,
	currentJobData,
	activeStep,
	setActiveStep,
	profileValue,
	setProfileValue,
	setSecretKey,
	secretKey,
}) => {
	const [isReadMore, setIsReadmore] = useState(true);
	const handleJobDescriptionChange = (value) => {
		setProfileValue({ ...profileValue, description: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (secretKey !== '95e7f731-ce6a-460c-8fcc-656d809a6df2') {
			toast.error('Invalid Secret Key', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			setActiveStep(activeStep + 1);
		}
	};
	return (
		<div
			className={` w-full max-w-4xl mx-auto py-10   ${
				showCreateJob && ' overflow-y-scroll'
			} bg-white  relative `}
		>
			{showCreateJob ? (
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col  sm:grid sm:grid-cols-2 gap-6  ">
						<TextInput
							value={profileValue.job_name}
							setValue={(val) =>
								setProfileValue({ ...profileValue, job_name: val })
							}
							label={'Title'}
							placeholder={'Enter Job Title'}
						/>
						<label className="flex flex-col gap-2 text-xs md:text-sm col-span-2 mb-6 sm:mb-0 ">
							<p className=" font-semibold  ">Description</p>
							<div className="bg-white h-40">
								<ReactQuill
									className=" h-32 rounded-2xl"
									placeholder="Enter Job Description"
									value={profileValue.description}
									onChange={handleJobDescriptionChange}
								/>
							</div>
						</label>
						<TextInput
							value={secretKey}
							setValue={(val) => setSecretKey(val)}
							label={'Secret Key'}
							placeholder={'Enter Secret Key'}
						/>
					</div>
					<div className=" md:w-1/2 mt-6 flex flex-col justify-between gap-3">
						<SubmitButton text={'Continue'} />
					</div>
				</form>
			) : (
				<div>
					<div className="flex  lg:flex-row justify-between items-start gap-2">
						<div className="flex flex-col lg:flex-row  justify-center lg:items-center gap-4 ">
							{currentJobData.company_logo && (
								<img
									className="w-20 h-20   rounded-md object-contain "
									src={currentJobData.company_logo}
									alt={''}
								/>
							)}

							<div className="flex flex-col gap-2">
								<h1 className=" md:text-xl font-semibold mb-4">
									{currentJobData.organization}
								</h1>
								<p className="  font-semibold text-blue-500">
									{currentJobData.job_name}
								</p>
								<p className="   font-semibold text-blue-500">
									JOB ID : {currentJobData.job_id}
								</p>
							</div>
						</div>
					</div>

					<div className="h-[2px] bg-gray-200 w-full mt-6"></div>

					<div className="flex flex-col w-full gap-2 mb-10 text-sm py-8">
						{currentJobData.description && (
							<div className="text-sm ">
								<p className=" mb-3">
									<span className="font-semibold md:text-xl">
										Description :
									</span>
								</p>
								<p className={`${isReadMore ? 'truncate' : ''} `}>
									{' '}
									{ReactHtmlParser(
										!isReadMore
											? currentJobData.description
											: currentJobData.description.slice(0, 200),
									)}
								</p>
								{currentJobData.description.toString().split(' ').length >
									15 && (
									<button
										onClick={() => setIsReadmore(!isReadMore)}
										className="text-blue-400 text-sm font-semibold"
									>
										{!isReadMore ? 'Read less' : 'Read More'}
									</button>
								)}
							</div>
						)}
					</div>

					<button
						onClick={() => setActiveStep(activeStep + 2)}
						className="p-3 px-5 self-end bg-yellow-500 text-white rounded-xl w-32 text-sm font-semibold "
					>
						Continue
					</button>
				</div>
			)}
		</div>
	);
};

export default CreateSelfJobModal;
