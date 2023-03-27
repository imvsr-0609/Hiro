import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactHtmlParser from 'react-html-parser';
import {
	AiOutlineAntDesign,
	AiOutlineClockCircle,
	AiOutlineCloseCircle,
} from 'react-icons/ai';
import { BiDetail, BiDotsVerticalRounded, BiLockOpenAlt } from 'react-icons/bi';
import { GiDesk, GiMoneyStack } from 'react-icons/gi';
import { IoMedalOutline, IoPeopleOutline, IoPersonAdd } from 'react-icons/io5';
import {
	MdCopyAll,
	MdLocationPin,
	MdOutlinePending,
	MdOutlineWorkOutline,
	MdWorkOutline,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { PROCESS_CANDIDATE_PAGE } from '../../../navigation/routes';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import IconButton from '../../ui-component/buttons/IconButton';
import ConfirmationModal from '../../ui-component/modal/ConfirmationModal';
import { ArrowTooltip } from '../../ui-component/tooltip/Tooltip';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import EditJobModal from '../create-job/EditJobModal';
import RippleLoader from '../loader/RippleLoader';

const SingleJobCard = ({ singleJobData, fetchAllJobs }) => {
	const {
		company_logo,
		create_date,
		description,
		job_email,
		job_id,
		id,
		job_name,
		job_type,
		key_skills,
		organization,
		pay_range,
		status,
		job_category,
		country,
		weekly_hours,
		work_hours,
		years_of_experience,
	} = singleJobData;
	const navigate = useNavigate();
	const [isReadMore, setIsReadmore] = useState(true);
	const [isLoading, setLoading] = useState(false);
	const { singleJobOperation } = EndPoints.singleJobListing;
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showMenuBar, setShowMenubar] = useState(false);
	const [showEditJobModal, setShowEditJobModal] = useState(false);
	const [showStatusConfirmationModal, setShowStatusConfirmationModal] =
		useState(false);

	const copyJobid = () => {
		toast.success('Copied Job ID to Clipboard', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const handleStatusChange = async (val) => {
		const putData = {
			job_id,
			status: val,
		};
		setLoading(true);
		try {
			const { data } = await axiosInstance.put(
				`${singleJobOperation}/updatejobstatus`,
				putData,
			);
			console.log(data);
			fetchAllJobs();
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDeleteJob = async () => {
		const putData = {
			job_id,
			status: 'DELETE',
		};
		setLoading(true);
		try {
			await axiosInstance.put(`${singleJobOperation}/updatejobstatus`, putData);

			fetchAllJobs();
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="rounded-2xl flex flex-col text-sm p-4 gap-1 shadow-outer   bg-white  relative">
			{isLoading && (
				<div className="absolute inset-0 bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-20 grid place-items-center ">
					<RippleLoader />
				</div>
			)}
			{showDeleteModal && (
				<div className="fixed left-0 right-0 top-0 h-screen w-full z-10  bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-md p-6 m-auto z-50">
						<ClickWrapper func={() => setShowDeleteModal(false)}>
							<ConfirmationModal
								heading={'Delete Job'}
								title={'Are you sure you want to delete the Job ?'}
								positiveText={'Delete'}
								negativeText={'Cancel'}
								handlePositive={handleDeleteJob}
								handleNegative={() => setShowDeleteModal(false)}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}
			{showStatusConfirmationModal && (
				<div className="fixed left-0 right-0 top-0 h-screen w-full z-10  bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-md p-6 m-auto z-50">
						<ClickWrapper func={() => setShowStatusConfirmationModal(false)}>
							<ConfirmationModal
								heading={`${status === 'OPEN' ? 'Close' : 'Open'} Job`}
								title={`Are you sure you want to ${
									status === 'OPEN' ? 'Close' : 'Open'
								} the Job ?`}
								positiveText={status === 'OPEN' ? 'Close' : 'Open'}
								negativeText={'Cancel'}
								handlePositive={() =>
									handleStatusChange(status === 'CLOSE' ? 'OPEN' : 'CLOSE')
								}
								handleNegative={() => setShowStatusConfirmationModal(false)}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}

			<div className="flex flex-col gap-6 relative">
				<div className="flex flex-col sm:flex-row justify-between gap-6 items-start border-b-2 border-gray-300 border-opacity-40 pt-2 pb-6 ">
					<div className="flex flex-col gap-2">
						<div className="flex gap-3 items-center">
							{company_logo && (
								<img
									className="w-16 h-16 rounded-md object-contain "
									src={`${company_logo}?rand=${new Date()}`}
									alt={''}
								/>
							)}
							<p className="text-xl font-semibold ">{organization}</p>
						</div>
						<p className="text-blue-500 flex gap-2 items-center font-semibold text-sm">
							{' '}
							<AiOutlineAntDesign />
							<span>{job_name}</span>
						</p>
						<div className="flex gap-2 text-xs items-center text-blue-500">
							<MdOutlineWorkOutline />
							<p>
								<span className="font-semibold">Job ID : </span>
								{job_id}
							</p>
							<CopyToClipboard text={job_id} onCopy={copyJobid}>
								<ArrowTooltip title="Copy Job-Id">
									<button className="text-lg">
										<MdCopyAll />
									</button>
								</ArrowTooltip>
							</CopyToClipboard>
						</div>
					</div>

					<div className="flex gap-2 ">
						<div className="flex flex-wrap sm:flex-col gap-2 sm:mr-8">
							{status !== 'OPEN_UNPUBLISHED' && (
								<IconButton
									toolTipTitle={'Change Job Status'}
									text={
										status === 'CLOSE'
											? 'Open Job'
											: status === 'OPEN'
											? 'Close Job'
											: 'Pending Job'
									}
									icon={
										status === 'CLOSE' ? (
											<BiLockOpenAlt />
										) : status === 'OPEN' ? (
											<AiOutlineCloseCircle />
										) : (
											<MdOutlinePending />
										)
									}
									outline
									onClick={() => setShowStatusConfirmationModal(true)}
									type={
										status === 'CLOSE'
											? 'success'
											: status === 'OPEN'
											? 'warning'
											: ''
									}
									disabled={status === 'PENDING'}
								/>
							)}

							{(status === 'OPEN' || status === 'OPEN_UNPUBLISHED') && (
								<IconButton
									toolTipTitle={'See Applicants'}
									text={'View Applicants'}
									icon={<IoPeopleOutline />}
									onClick={() => navigate(`/job-listing/${job_id}`)}
									type={status === 'PENDING' ? '' : 'primary'}
									outline
									disabled={status === 'PENDING'}
								/>
							)}
							{status === 'OPEN' && (
								<IconButton
									toolTipTitle={'View Job Listing'}
									text={'View Listing'}
									icon={<BiDetail />}
									onClick={() =>
										navigate(
											`/${organization.split(' ').join('-')}/${job_id}/apply`,
										)
									}
									type={status === 'PENDING' ? '' : 'success'}
									outline
									disabled={status === 'PENDING'}
								/>
							)}
							{status === 'OPEN_UNPUBLISHED' && (
								<IconButton
									toolTipTitle={'Add Applicants'}
									text={'Add Applicants'}
									icon={<IoPersonAdd />}
									onClick={() =>
										navigate(PROCESS_CANDIDATE_PAGE, {
											state: { jobID: job_id },
										})
									}
									type={'success'}
									outline
								/>
							)}
						</div>
						<button
							onClick={() => setShowMenubar(true)}
							className="p-2 w-6 h-6 grid place-items-center absolute top-2 right-2"
						>
							{' '}
							<BiDotsVerticalRounded className="text-xl" />{' '}
						</button>
						{showMenuBar && (
							<div>
								<ClickWrapper func={() => setShowMenubar(false)}>
									<div className="bg-white absolute top-16  right-0 shadow-custom  fleOPEN_UNPUBLISHEDx flex-col ">
										{status !== 'OPEN_UNPUBLISHED' && (
											<div
												onClick={() => setShowEditJobModal(true)}
												className="p-3 py-2 font-semibold text-sm w-32 cursor-pointer hover:bg-gray-100 border-y border-gray-300 border-opacity-25"
											>
												Edit
											</div>
										)}

										<div
											onClick={() => setShowDeleteModal(true)}
											className="p-3 py-2 font-semibold text-sm w-32 cursor-pointer hover:bg-gray-100 border-y border-gray-300 border-opacity-25"
										>
											Delete
										</div>
									</div>
								</ClickWrapper>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col-reverse sm:flex-row gap-8 ">
					{key_skills && key_skills.length > 0 && (
						<div className="flex-1">
							<h2 className="font-semibold mb-2"> Skills required : </h2>

							<div>
								{key_skills && (
									<div className="flex gap-2 items-center flex-wrap">
										{key_skills.split(',').map((skills) => (
											<p
												key={uuid()}
												className="bg-gray-100 p-2 px-3 shadow text-gray-700 rounded-full text-xs "
											>
												{' '}
												{skills}
											</p>
										))}
									</div>
								)}
							</div>
						</div>
					)}
					<div className=" flex flex-row flex-wrap sm:flex-col gap-4 sm:gap-2">
						{years_of_experience ? (
							<p className="text-sm flex  gap-2 items-center ">
								<IoMedalOutline className="text-xl" />
								{years_of_experience}
								{years_of_experience > 1 ? 'years' : 'year'} of experience
							</p>
						) : (
							<></>
						)}

						{pay_range && (
							<p className="text-sm flex  gap-2 items-center ">
								<GiMoneyStack className="text-xl" />
								{pay_range}
							</p>
						)}
						{job_type && (
							<p className="text-sm flex  gap-1 items-center ">
								<MdWorkOutline className="text-xl" />
								{job_type}
							</p>
						)}
						{country && (
							<p className="text-sm flex  gap-1 capitalize items-center ">
								<MdLocationPin className="text-xl" />
								{country}
							</p>
						)}
						{work_hours && (
							<p className="text-sm flex  gap-1 capitalize items-center ">
								<GiDesk className="text-xl" />
								{work_hours}
							</p>
						)}
						{weekly_hours ? (
							<p className="text-sm flex  gap-1 items-center ">
								<AiOutlineClockCircle className="text-xl" />
								{weekly_hours} hours
							</p>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>

			<div className="my-3 ">
				{description && (
					<>
						<p>
							<span className="font-semibold mb-1">Description</span>
						</p>
						<p className={`${isReadMore ? 'truncate' : ''} `}>
							{' '}
							{ReactHtmlParser(
								!isReadMore ? description : description.slice(0, 200),
							)}
						</p>
						{description.toString().split(' ').length > 15 && (
							<button
								onClick={() => setIsReadmore(!isReadMore)}
								className="text-blue-400 text-sm font-semibold"
							>
								{!isReadMore ? 'Read less' : 'Read More'}
							</button>
						)}
					</>
				)}
			</div>

			<div className="flex justify-between items-end gap-4 w-full mt-auto ">
				<p className="text-xs w-full text-right ">
					<span className="font-semibold">Posted on </span>
					{create_date
						? create_date.split(' ')[0].split('-').reverse().join('/')
						: ''}
				</p>
			</div>

			{showEditJobModal && (
				<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-4xl p-4 m-auto z-50">
						<ClickWrapper func={() => {}}>
							<EditJobModal
								refetchData={fetchAllJobs}
								close={() => setShowEditJobModal(false)}
								id={id}
								jobData={{
									job_name,
									key_skills,
									status,
									organization,
									job_email,
									years_of_experience,
									description,
									job_type,
									weekly_hours,
									work_hours,
									pay_range,
									company_logo,
									country,
									job_category,
								}}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleJobCard;
