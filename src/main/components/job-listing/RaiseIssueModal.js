import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import SubmitButton from '../auth/SubmitButton';
import MessageInput from '../create-profile/message-input/MessageInput';
import TextInput from '../create-profile/text-input/TextInput';
import RippleLoader from '../loader/RippleLoader';

const RaiseIssueModal = ({ close, githubid, refetchData }) => {
	const [emailDetails, setEmailDetails] = useState({
		title: '',
		message: '',
	});
	const { raiseIssue } = EndPoints.singleJobListing;
	const [isLoading, setIsLoading] = useState(false);
	const handleRaiseIssue = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const postData = {
			issue_title: emailDetails.title,
			issue_body: `@${githubid} ${emailDetails.message.replace(
				/<[^>]+>/g,
				'',
			)}`,
			owner: 'TechResume',
			repo: 'TechResume-user',
			github_id: githubid,
			user_id: 16,
		};
		try {
			const { data } = await axiosInstance.post(
				`${raiseIssue}/createissue`,
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
			refetchData();
			close();
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<form
			onSubmit={handleRaiseIssue}
			className="w-full bg-white rounded-2xl shadow-lg m-auto relative p-4 md:p-10 lg:p-12 min-h-[500px]   "
		>
			<button
				onClick={close}
				className="absolute top-6 right-6 text-3xl font-bold text-blue-500"
			>
				<IoMdCloseCircleOutline />
			</button>
			<div className="flex flex-col gap-4  ">
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
					label={'TItle'}
					required
					placeholder={'Enter Title'}
					value={emailDetails.title}
					setValue={(val) => setEmailDetails({ ...emailDetails, title: val })}
				/>
				<MessageInput
					label={'Message'}
					placeholder={'Write Message'}
					value={emailDetails.message}
					setValue={(val) => setEmailDetails({ ...emailDetails, message: val })}
				/>
				<div className="grid place-items-center">
					<SubmitButton
						text={'Connect'}
						disabled={emailDetails.title === '' || emailDetails.message === ''}
					/>
				</div>
			</div>
		</form>
	);
};

export default RaiseIssueModal;
