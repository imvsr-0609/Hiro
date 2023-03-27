import React, { Fragment, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import { htmltoText } from '../../../services/global/globalFunction';
import SubmitButton from '../auth/SubmitButton';
import MessageInput from '../create-profile/message-input/MessageInput';
import TextInput from '../create-profile/text-input/TextInput';
import RippleLoader from '../loader/RippleLoader';

const SendMailModal = ({ close, refetchData, recieverDetails, multiple }) => {
	const [emailDetails, setEmailDetails] = useState({
		title: '',
		message: '',
	});
	const { sendMail } = EndPoints.singleJobListing;
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMail = async (e) => {
		e.preventDefault();
		//setIsLoading(true);
		const postData = {
			title: emailDetails.title,
			template: emailDetails.message,
			user_data: recieverDetails,
			user_id: 16,
			message: htmltoText(emailDetails.message),
		};

		console.log(postData);
		try {
			const { data } = await axiosInstance.post(`${sendMail}`, postData);
			console.log(data);
			toast.success('Email Sent Successfully', {
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
			onSubmit={handleSendMail}
			className="w-full bg-white rounded-2xl shadow-lg m-auto relative p-4 md:p-10 lg:p-12 min-h-[500px]   "
		>
			<button
				onClick={close}
				className="absolute top-6 right-6 text-3xl font-bold text-blue-500"
			>
				<IoMdCloseCircleOutline />
			</button>
			<div className="flex flex-col gap-4 justify-center h-full ">
				{isLoading && (
					<div className="absolute inset-0 grid place-items-center bg-white bg-opacity-40">
						<RippleLoader />
					</div>
				)}

				{multiple && (
					<Fragment>
						<div className="flex items-center flex-wrap text-xs ">
							<p className="text-sm font-semibold mr-1"> Message to :</p>

							{recieverDetails.slice(0, 5).map((reciever, idx) => (
								<p key={uuid()} className="mx-1 text-xs">
									{reciever.github_id}{' '}
									{idx !== recieverDetails.length - 1 && ','}
								</p>
							))}
							{recieverDetails.length > 5 && (
								<span className="">+ {recieverDetails.length - 5} more</span>
							)}
						</div>
					</Fragment>
				)}
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
						text={'Send Email'}
						disabled={emailDetails.title === '' || emailDetails.message === ''}
					/>
				</div>
			</div>
		</form>
	);
};

export default SendMailModal;
