import React, { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { AiOutlineCaretDown, AiOutlineLineChart } from 'react-icons/ai';
import { BsGithub, BsTelephoneFill, BsWindowDock } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FaLinkedin } from 'react-icons/fa';
import { FiEye, FiMail } from 'react-icons/fi';
import {
	HiOutlineDocumentReport,
	HiOutlineDocumentText,
	HiOutlineLink,
} from 'react-icons/hi';
import { MdInfo, MdLocationPin, MdReport, MdVerified } from 'react-icons/md';
import { RiMessage3Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import EndPoints from '../../../services/api/api';
import axiosInstance from '../../../services/axios/axios';
import {
	htmltoText,
	includeComma,
} from '../../../services/global/globalFunction';
import IconButton from '../../ui-component/buttons/IconButton';
import { ArrowTooltip } from '../../ui-component/tooltip/Tooltip';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import AssignmentModal from '../job-listing/AssignmentModal';
import CoverLetter from '../job-listing/CoverLetter';
import RaiseIssueModal from '../job-listing/RaiseIssueModal';
import SendMailModal from '../job-listing/SendMailModal';
import ViewAssignmentModal from '../job-listing/ViewAssignmentModal';
import SonarcloudRequest from './SonarcloudRequest';
import ReactHtmlParser from 'react-html-parser';

const WebApplicantCard = ({
	fetchAllApplicants,
	data,
	eligible,
	fetchCreditData,
	jobStatus,
	type = 'job',
}) => {
	const {
		age,
		applied_date,
		assignment,
		avatar_url,
		bio,
		college,
		commit_status,
		company,
		cover_letter,
		date_of_birth,
		email,
		experience,
		followers,
		following,
		github_profile,
		id,
		git_create_date,
		github_email,
		github_last_updated,
		github_name,
		github_status,
		issues,
		job_id,
		resume_key_skills,
		key_skills,
		languages_used,
		last_updated,
		linkdin,
		location,
		name,
		portfolio,
		profile_score,
		ranking,
		recommended,
		repositories_contributed_to,
		resume,
		resume_name,
		resume_management_score,
		resume_technical_score,
		resume_soft_score,
		resume_phone,
		skilltable_management_score,
		skilltable_soft_score,
		skilltable_technical_score,
		status,
		total_commits,
		total_pullRequests,
		total_repos,
		total_stars,
		user_summary,
		verified,
		website_url,
	} = data;
	const [showMailModal, setShowMailModal] = useState(false);
	const [showIssueModal, setShowIssueModal] = useState(false);
	const [showAssignmentModal, setShowAssignmentModal] = useState(false);
	const [showAssignment, setShowAssignment] = useState(false);
	const [showStatusEditModal, setShowStatusEditModal] = useState(false);
	const [showCoverLetter, setShowCoverLetter] = useState(false);
	const [showSonarRequest, setShowSonarRequest] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [showMoreSkill, setShowMoreSkill] = useState(false);
	const [showMoreKeySkill, setShowMoreKeySkill] = useState(false);
	const [showMoreRoles, setShowMoreRoles] = useState(false);
	const [showMoreSummary, setShowMoreSummary] = useState(false);
	const { jobStatusChange } = EndPoints.singleApplicant;
	const { jobId } = useParams();

	const resumeScore =
		(resume_management_score + resume_technical_score + resume_soft_score) / 3;

	const getVerifiedData = (verified) => {
		switch (verified) {
			case 'VERIFIED':
				return {
					icon: <MdVerified />,
					toolText: 'This candidate has confirmed the application',
					color: 'green',
				};
			case 'REJECTED':
				return {
					icon: <MdReport />,
					toolText: 'This candidate has rejected the application',
					color: 'yellow',
				};
			default:
				return { icon: null, toolText: '', color: '' };
		}
	};

	const getStatusType = (status) => {
		if (
			status === 'SHORTLIST1' ||
			status === 'SHORTLIST2' ||
			status === 'MONITOR' ||
			status === 'ROUND1' ||
			status === 'ROUND2'
		)
			return 'warning';
		if (status === 'REJECT-PD' || status === 'REJECT') return 'error';
		if (status === 'JOINED' || status === 'AI SELECTED') return 'success';
	};
	const handleStatusChange = async (val) => {
		const putData = {
			id,
			status: val,
		};
		setLoading(true);
		try {
			const { data } = await axiosInstance.put(
				`${jobStatusChange}/updateapplicantstatus`,
				putData,
			);
			console.log(data);
			fetchAllApplicants();
			setLoading(false);
			setShowStatusEditModal(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="  bg-white shadow-outer rounded-2xl  flex justify-between  gap-6 relative ">
			{verified !== 'PENDING' && (
				<ArrowTooltip title={getVerifiedData(verified)?.toolText}>
					<div
						className={`absolute top-0 left-0 transform -translate-x-2 bg-white rounded-full p-[2px] shadow-md -translate-y-2 text-${
							getVerifiedData(verified)?.color
						}-500 text-4xl `}
					>
						{getVerifiedData(verified)?.icon}
					</div>
				</ArrowTooltip>
			)}

			<div className="flex flex-col w-full justify-between items-start">
				<div className="flex justify-between gap-6 p-3 flex-wrap rounded-br-2xl rounded-tl-2xl shadow w-full ">
					<div className={`flex gap-2 items-start min-w-[200px]   `}>
						<img
							className="w-12 h-12 object-contain rounded-lg"
							src={avatar_url}
							alt={github_profile}
						/>
						<div className="flex flex-col gap-1">
							<h3 className="font-semibold text-base sm:text-lg flex gap-2 items-center ">
								{name}
							</h3>

							{recommended === 1 && (
								<p
									className={`bg-green-500  text-white text-xs font-semibold p-2 py-1 border text-center border-green-400 border-opacity-40 rounded-r-full `}
								>
									Recommended
								</p>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						{email && (
							<div className="text-xs md:text-sm text-blue-500 flex items-center gap-1 font-semibold">
								<FiMail /> <p>{email}</p>
							</div>
						)}
						{resume_phone && (
							<div className="text-xs md:text-sm text-blue-500 flex items-center gap-1 font-semibold">
								<BsTelephoneFill /> <p>{resume_phone}</p>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-2">
						{location && (
							<div className="text-xs md:text-sm  flex items-center gap-1 font-semibold">
								<MdLocationPin /> <p>{location}</p>
							</div>
						)}

						<p className="text-xs font-semibold  w-full  ">
							Applied on :
							{applied_date
								? applied_date.split(' ')[0].split('-').reverse().join('-')
								: ''}
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex gap-1 items-center text-xl ">
							{linkdin && (
								<ArrowTooltip title="LinkedIn">
									<a className="text-blue-500" href={linkdin} target="blank">
										<FaLinkedin />
									</a>
								</ArrowTooltip>
							)}
							{portfolio && (
								<ArrowTooltip title="Portfolio">
									<a
										className="text-yellow-500"
										href={portfolio}
										target="blank"
									>
										<CgWebsite />
									</a>
								</ArrowTooltip>
							)}
							{resume && (
								<ArrowTooltip title="Resume">
									<a className="text-green-500" href={resume} target="blank">
										<HiOutlineDocumentReport />
									</a>
								</ArrowTooltip>
							)}
							{cover_letter && cover_letter !== '' && (
								<ArrowTooltip title={'Cover Letter'}>
									<button
										className="text-blue-500"
										onClick={() => setShowCoverLetter(true)}
									>
										<BsWindowDock />
									</button>
								</ArrowTooltip>
							)}
							{email !== null && email !== '' ? (
								<ArrowTooltip title={`Send mail to ${email}`}>
									<button
										className="text-blue-500"
										onClick={() => setShowMailModal(true)}
									>
										<RiMessage3Line />
									</button>
								</ArrowTooltip>
							) : (
								<ArrowTooltip title={`connect with ${github_profile}`}>
									<button
										disabled={!eligible}
										className="text-blue-500"
										onClick={() => setShowIssueModal(true)}
									>
										<HiOutlineLink />
									</button>
								</ArrowTooltip>
							)}
						</div>

						<p className="text-xs font-semibold  w-full  ">
							Updated on :
							{last_updated
								? last_updated.split(' ')[0].split('-').reverse().join('-')
								: ''}
						</p>
					</div>
				</div>

				<div className="flex gap-4 justify-between w-full p-4 pr-0  ">
					<div className="flex flex-col  gap-2 w-1/3">
						<h2 className="font-semibold ">Key Skills:</h2>

						<div>
							{resume_key_skills && (
								<div className="flex gap-2 items-center  flex-wrap ">
									{showMoreKeySkill ? (
										<>
											{resume_key_skills.split(',').map((skills) => (
												<p
													key={uuid()}
													className="bg-gray-100 shadow p-1  rounded-full text-xs text-gray-900 "
												>
													{' '}
													{skills}
												</p>
											))}
										</>
									) : (
										<>
											{resume_key_skills

												.split(',')
												.slice(0, 10)
												.map((skills) => (
													<p
														key={uuid()}
														className="bg-gray-100 shadow p-1 rounded-full text-xs text-gray-900 "
													>
														{skills}
													</p>
												))}
										</>
									)}

									<p
										className="text-blue-500 text-xs underline underline-offset-2 ml-2 cursor-pointer "
										onClick={() => setShowMoreKeySkill(!showMoreKeySkill)}
									>
										{showMoreKeySkill ? ' Less...' : ' More...'}
									</p>
								</div>
							)}
						</div>

						<h2 className="font-semibold ">Suitable Roles:</h2>

						<div>
							{languages_used && (
								<div className="flex gap-2 items-center  flex-wrap ">
									{showMoreRoles ? (
										<>
											{languages_used.split(',').map((skills) => (
												<p
													key={uuid()}
													className="bg-gray-100 shadow p-1  rounded-full text-xs text-gray-900 "
												>
													{skills}
												</p>
											))}
										</>
									) : (
										<>
											{languages_used
												.split(',')
												.slice(0, 10)
												.map((skills) => (
													<p
														key={uuid()}
														className="bg-gray-100 shadow p-1  rounded-full text-xs text-gray-900 "
													>
														{' '}
														{skills}
													</p>
												))}
										</>
									)}

									<p
										className="text-blue-500 text-xs underline underline-offset-2 ml-2 cursor-pointer "
										onClick={() => setShowMoreRoles(!showMoreRoles)}
									>
										{showMoreRoles ? ' Less...' : ' More...'}
									</p>
								</div>
							)}
						</div>
						<div className="shadow border p-2 flex flex-col gap-3 mt-1 h-full rounded-2xl">
							<div className="flex flex-col  gap-1 w-full ">
								<p className="text-xs text-left capitalize font-semibold">
									Technical Skills (
									{skilltable_technical_score?.toFixed(2) ?? 0}
									%)
								</p>
								<div className="w-full h-2 relative bg-gray-100   rounded-full shadow overflow-hidden ">
									<div
										style={{
											width: `${skilltable_technical_score}%`,
										}}
										className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
									></div>
								</div>
							</div>
							<div className="flex flex-col  gap-1 w-full ">
								<p className="text-xs text-left capitalize font-semibold">
									Management Skills (
									{skilltable_management_score?.toFixed(2) ?? 0}%)
								</p>
								<div className="w-full h-2 relative bg-gray-100   rounded-full shadow overflow-hidden ">
									<div
										style={{
											width: `${skilltable_management_score}%`,
										}}
										className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
									></div>
								</div>
							</div>
							<div className="flex flex-col  gap-1 w-full ">
								<p className="text-xs text-left capitalize font-semibold">
									Soft Skills ({skilltable_soft_score?.toFixed(2) ?? 0}%)
								</p>
								<div className="w-full h-2 relative bg-gray-100   rounded-full shadow overflow-hidden ">
									<div
										style={{
											width: `${skilltable_soft_score}%`,
										}}
										className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
									></div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 w-2/3 ">
						{user_summary && (
							<div className="w-full break-words">
								<p>
									<span className="font-semibold mb-1">Profile Summary</span>
								</p>
								<p>
									{/* {ReactHtmlParser(
										showMoreSummary
											? user_summary
											: user_summary.split('\n')[1],
									)} */}
									{showMoreSummary
										? htmltoText(user_summary)
										: htmltoText(user_summary).slice(0, 250) + '...'}
								</p>
								{user_summary.toString().split(' ').length > 15 && (
									<button
										onClick={() => setShowMoreSummary(!showMoreSummary)}
										className="text-blue-400 text-sm text-left max-w-max font-semibold"
									>
										{showMoreSummary ? 'Read less' : 'Read More'}
									</button>
								)}
							</div>
						)}
						{github_name && (
							<div className="flex flex-col p-4 rounded-2xl shadow border  flex-1">
								<div className="flex gap-10 justify-between">
									<div className="flex flex-col gap-2">
										<Link
											to={`/dashboard/${github_profile}`}
											className="flex gap-1 items-center cursor-pointer text-blue-500"
										>
											<BsGithub />
											<p className="text-base font-semibold">
												@{github_profile}
											</p>
										</Link>

										<div className="flex flex-col gap-1  items-start">
											<p className="text-3xl text-blue-500 text-left capitalize font-semibold flex gap-1 items-center">
												<AiOutlineLineChart />
												{ranking !== 'NA' ? ranking : ''}
											</p>
											<p className="text-blue-500">
												({profile_score ? profile_score?.toFixed(2) : 0}%)
											</p>

											<div className="w-full h-2 relative bg-gray-200  my-2 shadow-lg rounded-full overflow-hidden ">
												<div
													style={{
														width: `${profile_score ? profile_score : 0}%`,
													}}
													className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
												></div>
											</div>
										</div>
									</div>
									<div className="flex flex-col gap-2 flex-1">
										<div className="w-full grid grid-cols-4 gap-3 my-2 bg-blue-50 p-4 rounded-2xl">
											<div className="flex flex-col items-center text-xs font-semibold justify-between gap-2">
												<h4>Commits</h4>
												<p className="  font-semibold">
													{includeComma(total_commits)}
												</p>
											</div>
											<div className="flex flex-col items-center text-xs font-semibold justify-between gap-2">
												<h4>Contribution</h4>
												<p className="  font-semibold">
													{repositories_contributed_to}
												</p>
											</div>
											<div className="flex flex-col items-center text-xs font-semibold justify-between gap-2">
												<h4>Repo</h4>
												<p className="  font-semibold">{total_repos}</p>
											</div>
											<div className="flex flex-col items-center text-xs font-semibold justify-between gap-2">
												<h4>Stars</h4>
												<p className="  font-semibold">{total_stars}</p>
											</div>
										</div>

										<div className="flex gap-1 ">
											<h2 className="font-semibold pt-3">Skills:</h2>

											<div>
												{languages_used && (
													<div className="flex gap-2 items-center my-2 flex-wrap ">
														{showMoreSkill ? (
															<>
																{languages_used.split(',').map((skills) => (
																	<p
																		key={uuid()}
																		className="bg-gray-100 shadow p-2  rounded-full text-xs text-gray-900 "
																	>
																		{' '}
																		{skills}
																	</p>
																))}
															</>
														) : (
															<>
																{languages_used
																	.split(',')
																	.slice(0, 10)
																	.map((skills) => (
																		<p
																			key={uuid()}
																			className="bg-gray-100 shadow p-2  rounded-full text-xs text-gray-900 "
																		>
																			{' '}
																			{skills}
																		</p>
																	))}
															</>
														)}

														<p
															className="text-blue-500 underline underline-offset-2 ml-2 cursor-pointer "
															onClick={() => setShowMoreSkill(!showMoreSkill)}
														>
															{showMoreSkill ? ' Less...' : ' More...'}
														</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{showMailModal && (
					<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
						<div className="w-full max-w-2xl p-4 m-auto z-50">
							<ClickWrapper func={() => setShowMailModal(false)}>
								<SendMailModal
									refetchData={fetchCreditData}
									recieverDetails={[{ email, github_id: github_profile }]}
									close={() => setShowMailModal(false)}
								/>
							</ClickWrapper>
						</div>
					</div>
				)}
				{showCoverLetter && (
					<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
						<div className="w-full max-w-3xl p-4 m-auto z-50">
							<ClickWrapper func={() => setShowCoverLetter(false)}>
								<CoverLetter
									close={() => setShowCoverLetter(false)}
									coverLetter={cover_letter}
								/>
							</ClickWrapper>
						</div>
					</div>
				)}
				{showStatusEditModal && (
					<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
						<div className="w-full max-w-xl p-6 m-auto z-50">
							<ClickWrapper func={() => setShowStatusEditModal(false)}>
								<div className="w-full bg-white rounded-md shadow-lg m-auto p-6 ">
									<div className="flex flex-col w-full gap-1">
										<div className="p-3 px-10 text-sm font-semibold text-left  w-full rounded-md bg-gray-100 ">
											Select Status
										</div>
										{jobStatus.map((_status) => (
											<div
												onClick={() => handleStatusChange(_status)}
												className={` ${
													status === _status && 'bg-blue-100'
												} p-2 px-10 text-sm font-semibold text-left cursor-pointer w-full rounded-md hover:bg-blue-50 `}
												key={uuid()}
											>
												{_status}
											</div>
										))}
									</div>
								</div>
							</ClickWrapper>
						</div>
					</div>
				)}
				{showIssueModal && (
					<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
						<div className="w-full max-w-2xl p-4 m-auto z-50">
							<ClickWrapper func={() => setShowIssueModal(false)}>
								<RaiseIssueModal
									refetchData={fetchCreditData}
									close={() => setShowIssueModal(false)}
									githubid={github_profile}
								/>
							</ClickWrapper>
						</div>
					</div>
				)}
				{showAssignmentModal && (
					<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
						<div className="w-full max-w-3xl p-4 m-auto z-50">
							<ClickWrapper func={() => setShowAssignmentModal(false)}>
								<AssignmentModal
									close={() => setShowAssignmentModal(false)}
									refreshData={fetchAllApplicants}
									applicantId={id}
									jobid={jobId}
									applicantGithub={github_profile}
								/>
							</ClickWrapper>
						</div>
					</div>
				)}
				{/* {showSonarRequest && (
					<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
						<div className="w-full max-w-md p-4 m-auto z-50">
							<ClickWrapper func={() => setShowSonarRequest(false)}>
								<SonarcloudRequest
									close={() => setShowSonarRequest(false)}
									status={user.status}
								/>
							</ClickWrapper>
						</div>
					</div>
				)} */}
			</div>

			<div className="flex flex-col gap-4 w-1/3 py-4 pr-4">
				<div className="flex flex-col xl:flex-row justify-end gap-2 ">
					<IconButton
						toolTipTitle={`Change Status`}
						text={status === null || status === '' ? 'New Applicant' : status}
						onClick={() => setShowStatusEditModal(true)}
						icon={<AiOutlineCaretDown />}
						type={getStatusType(status)}
						align="right"
					/>
					{/* {type === 'job' && (
						<>
							{assignment.length === 0 ? (
								<IconButton
									toolTipTitle={`Assign Task`}
									text={'Send Assignment'}
									onClick={() =>
										user.status === 'ADDED'
											? setShowAssignmentModal(true)
											: setShowSonarRequest(true)
									}
									icon={<HiOutlineDocumentText />}
									type="primary"
								/>
							) : (
								<IconButton
									toolTipTitle={'View Assignment'}
									text={'View Assignment'}
									onClick={() => setShowAssignment(true)}
									icon={<FiEye />}
									type="success"
								/>
							)}
						</>
					)} */}
				</div>
				<div className="shadow border p-4 flex flex-col gap-3 h-full rounded-2xl relative ">
					<ArrowTooltip
						title={
							'Match Score Based on skills in resume as compared to job description requirements'
						}
					>
						<button className="absolute top-3 right-3 cursor-pointer">
							<MdInfo className=" text-2xl text-gray-400 " />
						</button>
					</ArrowTooltip>

					<div style={{ width: '100%', maxWidth: '150px' }}>
						<CircularProgressbar
							value={resumeScore}
							text={`${resumeScore?.toFixed(2)}%`}
							strokeWidth={10}
							styles={buildStyles({
								textColor: 'black',
								pathColor: '#0091FE',
								trailColor: '#efefef',
								textSize: '18px',
								fontWeight: 'bold',
							})}
						/>
					</div>
					<div className="flex flex-col  gap-1 w-full ">
						<p className="text-xs text-left capitalize font-semibold">
							Hard Skills ({resume_technical_score?.toFixed(2) ?? 0}%)
						</p>
						<div className="w-full h-2 relative bg-gray-100   rounded-full shadow overflow-hidden ">
							<div
								style={{
									width: `${resume_technical_score}%`,
								}}
								className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
							></div>
						</div>
					</div>
					<div className="flex flex-col  gap-1 w-full ">
						<p className="text-xs text-left capitalize font-semibold">
							Soft Skills ({resume_soft_score?.toFixed(2) ?? 0}%)
						</p>
						<div className="w-full h-2 relative bg-gray-100   rounded-full shadow overflow-hidden ">
							<div
								style={{
									width: `${resume_soft_score}%`,
								}}
								className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
							></div>
						</div>
					</div>
					<div className="flex flex-col  gap-1 w-full ">
						<p className="text-xs text-left capitalize font-semibold">
							Profile Skills ({resume_management_score?.toFixed(2) ?? 0}%)
						</p>
						<div className="w-full h-2 relative bg-gray-100   rounded-full shadow overflow-hidden ">
							<div
								style={{
									width: `${resume_management_score}%`,
								}}
								className="absolute  top-0 h-full left-0 z-10 rounded-r-full bg-gradient-to-r from-blue-400  to-green-400  "
							></div>
						</div>
					</div>
				</div>
			</div>

			<div className="md:hidden">
				{languages_used && (
					<div className="flex gap-2  items-center my-2 flex-wrap ">
						{showMoreSkill ? (
							<>
								{languages_used.split(',').map((skills) => (
									<p
										key={uuid()}
										className="bg-gray-100 shadow p-2 px-4 rounded-full text-xs text-gray-900 "
									>
										{' '}
										{skills}
									</p>
								))}
							</>
						) : (
							<>
								{languages_used
									.split(',')
									.slice(0, 6)
									.map((skills) => (
										<p
											key={uuid()}
											className="bg-gray-100 shadow p-2 px-4 rounded-full text-xs text-gray-900 "
										>
											{' '}
											{skills}
										</p>
									))}
							</>
						)}

						<p
							className="text-blue-500 underline underline-offset-2 ml-2 cursor-pointer "
							onClick={() => setShowMoreSkill(!showMoreSkill)}
						>
							{showMoreSkill ? ' Less...' : ' More...'}
						</p>
					</div>
				)}
			</div>
			<div className="flex justify-between gap-6 items-center mt-4  md:hidden">
				<p className="text-xs font-semibold text-left w-full  ">
					Applied on :{' '}
					{applied_date
						? applied_date.split(' ')[0].split('-').reverse().join('-')
						: ''}
				</p>
				<p className="text-xs font-semibold text-right w-full   ">
					last updated :{' '}
					{last_updated
						? last_updated.split(' ')[0].split('-').reverse().join('-')
						: ''}
				</p>
			</div>
			{showAssignment && (
				<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-3xl p-4  m-auto z-50">
						<ClickWrapper func={() => setShowAssignment(false)}>
							<ViewAssignmentModal
								close={() => setShowAssignment(false)}
								applicantId={id}
								jobid={jobId}
								applicantGithub={github_profile}
								assignment={assignment}
								refetchData={fetchAllApplicants}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}
		</div>
	);
};

export default WebApplicantCard;
