import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactHtmlParser from 'react-html-parser';
import { AiOutlineAntDesign, AiOutlineCloseCircle } from 'react-icons/ai';
import {
	BiDetail,
	BiDotsVerticalRounded,
	BiLockOpenAlt,
	BiTime,
} from 'react-icons/bi';
import { GiMoneyStack } from 'react-icons/gi';
import { IoMedalOutline, IoPeopleOutline } from 'react-icons/io5';
import { MdCopyAll, MdLocationPin, MdOutlineWorkOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import IconButton from '../../ui-component/buttons/IconButton';
import ConfirmationModal from '../../ui-component/modal/ConfirmationModal';
import { ArrowTooltip } from '../../ui-component/tooltip/Tooltip';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import RippleLoader from '../loader/RippleLoader';
import EditProjectModal from '../project/EditProjectModal';
import { parseDuration } from '../project/SingleProjectCard';

const SingleProjectCard = ({ singleProjectData, fetchAllProjects }) => {
	const {
		agency,
		company_logo,
		country,
		create_date,
		description,
		duration,
		email,
		guidance,
		id,
		key_skills,
		organization,
		payment,
		project_category,
		project_id,
		project_title,
		status,
		updated_at,
		user_id,
		years_of_experience,
	} = singleProjectData;
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
		toast.success('Copied Project ID to Clipboard', {
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
			id,
			status: val,
		};
		setLoading(true);
		try {
			const { data } = await axiosInstance.put(
				`https://b2jzh4pdxj.execute-api.ap-south-1.amazonaws.com/Dev/UpdateProject`,
				putData,
			);
			console.log(data);
			fetchAllProjects();
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDeleteJob = async () => {
		const putData = {
			id,
			status: 'DELETE',
		};
		setLoading(true);
		try {
			await axiosInstance.put(
				`https://b2jzh4pdxj.execute-api.ap-south-1.amazonaws.com/Dev/UpdateProject`,
				putData,
			);

			fetchAllProjects();
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
								heading={'Delete Project'}
								title={'Are you sure you want to delete the Project ?'}
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
								} the Project ?`}
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
							<span>{project_title}</span>
						</p>
						<div className="flex gap-2 text-xs items-center text-blue-500">
							<MdOutlineWorkOutline />
							<p>
								<span className="font-semibold">Project ID : </span>
								{project_id}
							</p>
							<CopyToClipboard text={project_id} onCopy={copyJobid}>
								<ArrowTooltip title="Copy Project-Id">
									<button className="text-lg">
										<MdCopyAll />
									</button>
								</ArrowTooltip>
							</CopyToClipboard>
						</div>
					</div>

					<div className="flex gap-2 ">
						<div className="flex flex-wrap sm:flex-col gap-2 sm:mr-8">
							<IconButton
								toolTipTitle={'Change Project Status'}
								text={status === 'CLOSE' ? 'Open Project' : 'Close Project'}
								icon={
									status === 'CLOSE' ? (
										<BiLockOpenAlt />
									) : (
										<AiOutlineCloseCircle />
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
							/>
							{status === 'OPEN' && (
								<IconButton
									toolTipTitle={'See Applicants'}
									text={'Applicants'}
									icon={<IoPeopleOutline />}
									onClick={() => navigate(`/project-listing/${project_id}`)}
									type={'primary'}
									outline
								/>
							)}
							{status === 'OPEN' && (
								<IconButton
									toolTipTitle={'View Project Listing'}
									text={'View Listing'}
									icon={<BiDetail />}
									onClick={() =>
										navigate(
											`/${organization
												.split(' ')
												.join('-')}/projects/${project_id}/apply`,
										)
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
									<div className="bg-white absolute top-16  right-0 shadow-custom  flex flex-col ">
										<div
											onClick={() => setShowEditJobModal(true)}
											className="p-3 py-2 font-semibold text-sm w-32 cursor-pointer hover:bg-gray-100 border-y border-gray-300 border-opacity-25"
										>
											Edit
										</div>
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
										{key_skills.split('|').map((skills) => (
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
						{years_of_experience && (
							<div className="flex gap-1 items-center">
								<IoMedalOutline />
								<p className="text-sm">
									{years_of_experience}{' '}
									{years_of_experience > 1 ? 'years' : 'year'} of experience
								</p>
							</div>
						)}

						{payment && (
							<p className="text-sm flex  gap-2 items-center ">
								<GiMoneyStack className="text-xl" />
								{payment}
							</p>
						)}
						{country && (
							<div className="flex gap-1 items-center">
								<MdLocationPin />
								<p className="text-sm">{country}</p>
							</div>
						)}

						{duration && (
							<div className="flex gap-1 items-center">
								<BiTime />
								<p className="text-sm">{parseDuration(duration)}</p>
							</div>
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
							<EditProjectModal
								refetchData={fetchAllProjects}
								close={() => setShowEditJobModal(false)}
								id={id}
								projectData={singleProjectData}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleProjectCard;
