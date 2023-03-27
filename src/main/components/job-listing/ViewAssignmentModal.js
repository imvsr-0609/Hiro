import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { AiFillBug, AiFillUnlock } from 'react-icons/ai';
import { BiLoaderAlt } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { GiNuclear } from 'react-icons/gi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdOutlineUploadFile } from 'react-icons/md';
import axiosInstance from '../../../services/axios/axios';
import IconButton from '../../ui-component/buttons/IconButton';
import { ArrowTooltip } from '../../ui-component/tooltip/Tooltip';

const ViewAssignmentModal = ({
	assignment,
	close,
	recruiter = true,
	applicantId: applicant_id,
	refetchData,
}) => {
	const [tab, setTab] = useState(1);
	const isSubmitted =
		assignment[0].checkin_status === 'CREATED' ||
		assignment[0].checkin_status === 'INCOMPLETED' ||
		assignment[0].checkin_status === 'PUSHED'
			? false
			: true;

	const [loading, setLoading] = useState(false);
	const convertScoreToResult = (score) => {
		if (score === null) return { bgcolor: 'gray', score: '-' };
		if (score <= 5) return { bgcolor: 'green', score: 'A' };
		if (score > 5 && score < 10) return { bgcolor: 'yellow', score: 'B' };
		else return { bgcolor: 'red', score: 'C' };
	};

	const handleSubmitAssignment = async () => {
		setLoading(true);
		try {
			await axiosInstance.put(
				`${'https://b2jzh4pdxj.execute-api.ap-south-1.amazonaws.com/Stage/updateassignstatus'}`,
				{
					action: isSubmitted ? 'INCOMPLETED' : 'COMPLETED',
					applicant_id,
				},
			);

			await refetchData();
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="w-full h-[600px] bg-white relative rounded-2xl shadow-lg m-auto p-4 md:p-10 lg:p-12 flex flex-col gap-4 ">
			<button
				onClick={close}
				className="absolute top-6 right-6 text-3xl font-bold text-blue-500"
			>
				<IoMdCloseCircleOutline />
			</button>
			<div className="flex w-full max-w-xs justify-between items-center text-sm  ">
				<button
					className={`flex-1 p-3 rounded-full grid place-items-center ${
						tab === 1 && 'bg-blue-200  shadow-md  '
					} `}
					onClick={() => setTab(1)}
				>
					{recruiter ? 'Assignment Sent' : 'Assignment Received'}
				</button>
				{recruiter && (
					<button
						className={`flex-1 p-3 rounded-full grid place-items-center ${
							tab === 2 && 'bg-orange-100 shadow-md  '
						}  `}
						onClick={() => setTab(2)}
					>
						Assignment Result
					</button>
				)}
			</div>
			<div className="h-full pt-4">
				{tab === 1 && (
					<div className="w-full h-full ">
						<div className="flex flex-col gap-6 text-sm h-[85%] overflow-y-scroll">
							<div className="flex gap-3 items-center">
								<ArrowTooltip title={'Link to assignment repository'}>
									<a
										className=" p-3 text-sm  text-white flex gap-2 items-center justify-center bg-blue-500 hover:bg-blue-400  rounded-full w-40 text-center cursor-pointer"
										href={`https://github.com/${assignment[0].github_owner}/${assignment[0].repo_name}`}
										target="blank"
									>
										<BsGithub />
										Task Repository
									</a>
								</ArrowTooltip>

								{!recruiter && (
									<IconButton
										toolTipTitle={
											isSubmitted ? 'Unsubmit Assignment' : 'Submit Assignment'
										}
										text={isSubmitted ? 'Unsubmit' : 'Submit'}
										icon={
											loading ? (
												<div className=" animate-spin ">
													{' '}
													<BiLoaderAlt />{' '}
												</div>
											) : (
												<MdOutlineUploadFile />
											)
										}
										type="warning"
										outline
										onClick={handleSubmitAssignment}
									/>
								)}
							</div>

							<div className="flex flex-col gap-1">
								<h3 className=" font-bold">Title : </h3>
								<h3 className=" ">
									{ReactHtmlParser(assignment[0].task_title)}
								</h3>
							</div>

							{assignment[0].task_close_date && (
								<div className="flex flex-col gap-1">
									<h3 className=" font-bold">Last Date : </h3>
									<h3>
										<span className="font-semibold">
											{assignment[0].task_close_date
												.split(' ')[0]
												.split('-')
												.reverse()
												.join('-')}
										</span>
									</h3>
								</div>
							)}

							<div className="flex flex-col gap-1">
								<h3 className=" font-bold">Task Language : </h3>
								<h3 className=" capitalize ">
									<span className="font-semibold">
										{ReactHtmlParser(
											assignment[0].task_lang === 'MAVEN'
												? 'Java'
												: assignment[0].task_lang.toLowerCase(),
										)}
									</span>
								</h3>
							</div>

							<div className="flex flex-col gap-1">
								<h3 className=" font-bold">Task : </h3>
								<h3>{ReactHtmlParser(assignment[0].task)}</h3>
							</div>
						</div>
						{assignment[0].create_date && (
							<h3 className="text-right mt-auto">
								Posted on{' '}
								<span className="font-semibold">
									{assignment[0].create_date
										.split(' ')[0]
										.split('-')
										.reverse()
										.join('-')}
								</span>
							</h3>
						)}
					</div>
				)}

				{tab === 2 && (
					<div className="h-full">
						{assignment.length > 0 && (
							<div className="  h-full">
								{(assignment[0].checkin_status.toUpperCase() === 'PUSHED' ||
									assignment[0].checkin_status.toUpperCase() ===
										'INCOMPLETED') && (
									<h3 className="mb-2 text-lg font-semibold">
										Partial Result based on recent commits
									</h3>
								)}
								{assignment[0].checkin_status.toUpperCase() === 'CREATED' ? (
									<div className="grid place-items-center justify-around items-center text-base font-semibold bg-gray-100 h-full rounded-md p-4 py-10">
										Result is yet to be evaluated
									</div>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 h-full place-items-center rounded-md p-4 py-10">
										<div className="flex flex-col  ">
											<p className=" italic text-gray-500 p-3 border-b border-gay-500 border-opacity-40 ">
												Reliability
											</p>
											<div className="flex gap-3 items-center py-2">
												<div className="grid place-items-center text-lg  w-8 h-8 rounded-full bg-gray-300 text-black">
													<AiFillBug />
												</div>
												<h2 className="font-bold text-4xl">
													{assignment[0].bug}
												</h2>
												<div className="flex flex-col ">
													<div
														className={`grid place-items-center text-lg w-8 h-8 rounded-full bg-${
															convertScoreToResult(assignment[0].bug).bgcolor
														}-500 text-white`}
													>
														{convertScoreToResult(assignment[0].bug).score}
													</div>
													<p className="font-semibold text-base ">Bugs</p>
												</div>
											</div>
										</div>
										<div className="flex flex-col">
											<p className=" italic text-gray-500 p-3 border-b border-gay-500 border-opacity-40 ">
												Security
											</p>
											<div className="flex gap-3 items-center py-2">
												<div className="grid place-items-center text-lg  w-8 h-8 rounded-full bg-gray-300 text-black">
													<AiFillUnlock />
												</div>
												<h2 className="font-bold text-4xl">
													{assignment[0].vulnerability}
												</h2>
												<div className="flex flex-col ">
													<div
														className={`grid place-items-center text-lg w-8 h-8 rounded-full bg-${
															convertScoreToResult(assignment[0].vulnerability)
																.bgcolor
														}-500 text-white`}
													>
														{
															convertScoreToResult(assignment[0].vulnerability)
																.score
														}
													</div>
													<p className="font-semibold text-base ">
														Vulnerabilities
													</p>
												</div>
											</div>
										</div>
										<div className="flex flex-col">
											<p className=" italic text-gray-500 p-3 border-b border-gay-500 border-opacity-40 ">
												Maintainability
											</p>
											<div className="flex gap-3 items-center py-2">
												<div className="grid place-items-center text-lg  w-8 h-8 rounded-full bg-gray-300 text-black">
													<GiNuclear />
												</div>
												<h2 className="font-bold text-4xl">
													{assignment[0].code_smell}
												</h2>
												<div className="flex flex-col ">
													<div
														className={`grid place-items-center text-lg w-8 h-8 rounded-full bg-${
															convertScoreToResult(assignment[0].code_smell)
																.bgcolor
														}-500 text-white`}
													>
														{
															convertScoreToResult(assignment[0].code_smell)
																.score
														}
													</div>
													<p className="font-semibold text-base ">
														Code Smells
													</p>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewAssignmentModal;
