import React, { useState } from 'react';
import { useRef } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdAttachFile, MdOutlineDone } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import uuid from 'react-uuid';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import { getIpDetails } from '../../../services/global/globalFunction';
import SubmitButton from '../auth/SubmitButton';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import EmailInput from '../create-profile/email-input/EmailInput';
import ReapplyModal from '../create-profile/reapply/ReapplyModal';
import TextInput from '../create-profile/text-input/TextInput';

const NewApplicantForm = ({
	jobID,
	refetchData,
	setAddedApplicants,
	addedApplicants,
}) => {
	const [tnc, setTnc] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [imageUploading, setImageUploading] = useState(false);
	const [imageUploaded, setImageUploaded] = useState(false);
	const { createProfile } = EndPoints.createProfile;
	const { uploadJobLogo } = EndPoints.createJob;
	const [profileValue, setProfileValue] = useState({
		name: '',
		email: '',
		phone_number: '',
		github_profile: '',
	});

	const [showReplyModal, setShowReplyModal] = useState(false);
	const resumeUploadRef = useRef(null);

	const fileChange = (e) => {
		console.log(e.target.files[0]);
		if (!e.target.files[0]) {
			alert('please Select a valid file');
			return;
		}
		const newFile = e.target.files[0];
		setImageFile(newFile);
		setFileName(
			`${jobID}-${uuid()}-${newFile.name.split(' ').join('')}`.trim(),
		);
	};

	const uploadImage = async () => {
		console.log(imageFile);
		if (!imageFile) return;

		setImageUploading(true);
		const options = {
			headers: {
				//Authorization: `Bearer ${user.token}`,
				'Content-Type': imageFile.type,
			},
		};

		try {
			const { data } = await axiosInstance.post(`${uploadJobLogo}`, {
				filename: fileName,
				bucketname: 'github-cv',
			});

			const uploadUrl = JSON.parse(data).data.URL;
			console.log(uploadUrl);
			const res = await axiosInstance.put(uploadUrl, imageFile, options);
			console.log(res);
			setImageFile(undefined);
		} catch (err) {
			console.log(err.message);
		}
		setImageUploading(false);
		setImageUploaded(true);
	};

	const handleAddApplicants = async (reapply = false) => {
		if (!fileName) {
			toast.error('Please Upload your Resume', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}

		const postData = { ...profileValue, resume: fileName };
		try {
			await uploadImage();
			const ipData = await getIpDetails();
			const { data } = await axiosInstance.post(`${createProfile}`, {
				...postData,
				reapply,
				hid: jobID.trim(),
				resume: fileName,
				...ipData,
			});
			if (data.message === 'already applied') {
				setShowReplyModal(true);
				return;
			}
			//console.log(JSON.parse(data.body));
			toast.success('Added Candidate', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setAddedApplicants([...addedApplicants, profileValue]);
			setTnc(false);
			setFileName('');
			setImageFile(null);
			setImageUploading(false);
			setImageUploaded(false);
			setProfileValue({
				name: '',
				email: '',
				phone_number: '',
				github_profile: '',
			});
			resumeUploadRef.current.value = '';
		} catch (err) {
			console.log(err.message);
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
	const onSubmit = (e) => {
		e.preventDefault();
		handleAddApplicants();
	};

	const reapplyJobApplication = (e) => {
		e.preventDefault();
		setShowReplyModal(false);
		handleAddApplicants(true);
	};

	return (
		<div className="relative  ">
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
			<form
				onSubmit={onSubmit}
				className="w-full flex flex-col gap-6 md:gap-10 "
			>
				<div className="flex flex-col md:grid grid-cols-2 gap-6 ">
					<TextInput
						value={profileValue.name}
						setValue={(val) => setProfileValue({ ...profileValue, name: val })}
						label={'Name'}
						placeholder={'Enter Applicant Name'}
						required={true}
					/>
					<EmailInput
						value={profileValue.email}
						setValue={(val) => setProfileValue({ ...profileValue, email: val })}
						label={'Email'}
						placeholder={'Enter Applicant Email'}
						required={true}
					/>

					<TextInput
						value={profileValue.phone_number}
						setValue={(val) =>
							setProfileValue({
								...profileValue,
								phone_number: val,
							})
						}
						label={'Phone'}
						placeholder={'Enter Applicant contact number '}
						allowNumber
					/>
					<TextInput
						value={profileValue.github_profile}
						setValue={(val) =>
							setProfileValue({ ...profileValue, github_profile: val })
						}
						label={'Github'}
						placeholder={'Enter Applicant Github'}
						required={true}
					/>
					<label className="flex flex-col gap-2 text-xs md:text-sm mb-6 sm:mb-3 md:mb-0 col-span-1 ">
						<p className=" font-semibold  ">Upload Resume</p>
						<div className="flex gap-2 items-center w-[200px]">
							<div
								className={`flex  cursor-pointer   justify-center items-center text-sm font-semibold gap-2 p-[10px] disabled:bg-gray-400 px-4 bg-blue-500 text-white rounded-xl`}
							>
								<MdAttachFile className="text-xl" />
								Attach Resume / CV
							</div>
							{imageUploading && <BiLoaderAlt className="animate-spin" />}
							{imageUploaded && <MdOutlineDone />}
						</div>

						<p>{imageFile?.name}</p>
						<input
							ref={resumeUploadRef}
							type="file"
							className="hidden"
							onChange={fileChange}
							accept=".doc, .docx,.pdf"
						/>
					</label>
				</div>
				<div className=" md:w-1/2  flex flex-col justify-between gap-3">
					{/* <label className="flex items-center gap-2 font-600  cursor-pointer text-xs z-0">
						<input
							value={tnc}
							onChange={(e) => setTnc(e.target.checked)}
							className=" cursor-pointer"
							type="checkbox"
						/>

						<p>I Confirm the details provided are correct</p>
					</label> */}

					<button
						type="submit"
						className="p-3 px-5  bg-blue-500 text-white rounded-xl w-32 text-sm font-semibold "
					>
						Add Applicant
					</button>
				</div>
			</form>
			{showReplyModal && (
				<div className="fixed left-0 right-0 top-0 h-screen w-full z-10  bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-md p-6 m-auto z-50">
						<ClickWrapper func={() => setShowReplyModal(false)}>
							<ReapplyModal
								title={
									'You have already applied to this Job . Do you want to reapply ?'
								}
								positiveText={'Reapply'}
								negativeText={'Cancel'}
								handleNegative={() => setShowReplyModal(false)}
								handlePositive={reapplyJobApplication}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}
		</div>
	);
};

export default NewApplicantForm;
