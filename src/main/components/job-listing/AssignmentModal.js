import React from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../../services/axios/axios';
import SubmitButton from '../auth/SubmitButton';
import DateInput from '../create-profile/date-input/DateInput';
import MessageInput from '../create-profile/message-input/MessageInput';
import TextInput from '../create-profile/text-input/TextInput';
import RippleLoader from '../loader/RippleLoader';
import uuid from 'react-uuid';
import EndPoints from '../../../services/api/api';
import { MdClose } from 'react-icons/md';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const assignmentLanguages = [
	{
		title: 'None',
		value: '',
	},
	{
		title: 'Java',
		value: 'MAVEN',
	},
	{
		title: 'JavaScript',
		value: 'JAVASCRIPT',
	},
	{
		title: 'Python',
		value: 'PYTHON',
	},
	{
		title: 'Typescript',
		value: 'TYPESCRIPT',
	},
];

const AssignmentModal = ({
	close,
	applicantId,
	jobid,
	applicantGithub,
	refreshData,
}) => {
	const [assignmentDetails, setAssignmentDetails] = useState({
		title: '',
		message: '',
		lastDate: '',
		taskLang: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const { createAssignment } = EndPoints.singleJobListing;
	const handleSendAssignment = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const postData = {
			APPLICANT_ID: applicantId,
			TASK: assignmentDetails.message,
			TASK_LANG:
				assignmentDetails.taskLang === ''
					? 'OTHERS'
					: assignmentDetails.taskLang,
			TASK_CLOSE_DATE: assignmentDetails.lastDate,
			TASK_TITLE: assignmentDetails.title,
			APPLICANT_GITHUB: applicantGithub,
			JOB_ID: jobid,
			USER_ID: 16,
		};

		console.log(postData);
		try {
			const { data } = await axiosInstance.post(
				`${createAssignment}/githubconfigandsonarcloud`,
				postData,
			);
			//console.log(data);
			toast.success(data.body, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setIsLoading(false);
			refreshData();
			close();
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<form
			onSubmit={handleSendAssignment}
			className="w-full p-3 md:p-12 bg-white rounded-2xl shadow-lg m-auto  relative flex flex-col gap-6"
		>
			<button
				onClick={close}
				className="absolute top-6 right-6 text-3xl font-bold text-blue-500"
			>
				<IoMdCloseCircleOutline />
			</button>
			{isLoading && (
				<div className="absolute inset-0 grid place-items-center bg-white bg-opacity-40">
					<RippleLoader />
				</div>
			)}
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

			<TextInput
				label={'Title'}
				required
				placeholder={'Enter Title'}
				value={assignmentDetails.title}
				setValue={(val) =>
					setAssignmentDetails({ ...assignmentDetails, title: val })
				}
			/>
			<DateInput
				label={'Last Date'}
				value={assignmentDetails.lastDate}
				setValue={(val) =>
					setAssignmentDetails({ ...assignmentDetails, lastDate: val })
				}
			/>
			<label className="flex flex-col gap-2 text-xs md:text-sm  ">
				<p className=" font-semibold  ">Task Language</p>
				<div className="p-3  w-full border-2 rounded-xl">
					<select
						onChange={(e) =>
							setAssignmentDetails({
								...assignmentDetails,
								taskLang: e.target.value,
							})
						}
						className="outline-none cursor-pointer w-full  border-none text-xs"
						value={assignmentDetails.taskLang}
					>
						{assignmentLanguages.map((language) => (
							<option key={uuid()} value={language.value}>
								{language.title}
							</option>
						))}
					</select>
				</div>
			</label>
			<MessageInput
				label={'Task'}
				placeholder={'Write Assignment Task Description'}
				value={assignmentDetails.message}
				setValue={(val) =>
					setAssignmentDetails({ ...assignmentDetails, message: val })
				}
			/>
			<div className="grid place-items-center">
				<SubmitButton
					text={'Send Assignment '}
					disabled={
						assignmentDetails.title === '' || assignmentDetails.message === ''
					}
				/>
			</div>
		</form>
	);
};

export default AssignmentModal;
