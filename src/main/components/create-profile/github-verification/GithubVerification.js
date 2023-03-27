import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import EndPoints from '../../../../services/api/api';
import axiosInstance from '../../../../services/axios/axios';

const GithubVerification = ({
	value,
	setValue,
	isGithubVerified,
	setIsGithubVerified,
}) => {
	const { verifyGithubId } = EndPoints.createProfile;
	const verifyGithub = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axiosInstance.get(
				`${verifyGithubId}/userexists?username=${value}`,
			);
			console.log(data);
			if (data?.exist) {
				setIsGithubVerified(true);
				toast.success('Github ID Verified', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				setIsGithubVerified(false);
				toast.error('Invalid Github ID', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<label className="flex flex-col col-span-2 sm:col-span-1 gap-2 text-xs md:text-sm ">
			<p className=" font-semibold  ">Verify Github</p>
			<div className="flex justify-between text-sm bg-white border-2 w-full flex-1  outline-none border-gray-500 border-opacity-20  rounded-xl placeholder:gray-200 ">
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
				<input
					className=" w-full flex-1 p-3 outline-none placeholder:gray-200 "
					disabled={isGithubVerified}
					placeholder={
						!isGithubVerified ? 'Verify your Github Account' : 'Github verified'
					}
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button
					onClick={verifyGithub}
					disabled={isGithubVerified}
					className=" flex px-3 outline-none items-center gap-2 rounded-md rounded-l-none uppercase  text-sm bg-gray-700 hover:bg-gray-600 text-white font-500 "
				>
					<FaGithub />
					<span className="text-white">
						{!isGithubVerified ? 'Verify' : 'Verified'}
					</span>
					{isGithubVerified && (
						<div className="text-green-400 text-xl font-bold">
							<MdDone />
						</div>
					)}
				</button>
			</div>
		</label>
	);
};

export default GithubVerification;
