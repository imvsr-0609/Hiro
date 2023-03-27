import React, { Fragment, useEffect, useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { IoPersonAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { PROCESS_CANDIDATE_PAGE } from '../../../navigation/routes';
import IconButton from '../../ui-component/buttons/IconButton';
import TableSearch from '../../ui-component/inputs/TableSearch';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import AddApplicantModal from '../self-jobs/AddApplicantModal';
import ApplicantCard from './ApplicantCard';
import SingleJobChart from './SingleJobChart';

const JobApplicantsTable = ({
	data,
	fetchAllApplicants,
	eligible,
	fetchCreditData,
	jobId = '',
	isProcessingJob,
}) => {
	const [filterApplicantData, setfilterApplicantData] = useState(data);
	const [showAddApplicantModal, setShowAddApplicantModal] = useState(false);
	const [applicantText, setApplicantText] = useState('');
	const [filter, setFilter] = useState('');
	const [sortVal, setSortVal] = useState('none');
	const [summary, setSummary] = useState({
		selected: 0,
		inProgress: 0,
		rejected: 0,
	});
	const navigate = useNavigate();
	const jobStatus = [
		'ALL',
		'SHORTLIST1',
		'SHORTLIST2',
		'ROUND1',
		'ROUND2',
		'REJECT-PD',
		'JOINED',
		'AI SELECTED',
		'MONITOR',
		'REJECT',
	];
	const filterChange = (text) => {
		const filteredData = data.filter((user) =>
			user?.languages_used
				? user?.name.toUpperCase().includes(text.toUpperCase()) ||
				  user?.github_profile.toUpperCase().includes(text.toUpperCase()) ||
				  user?.languages_used.toUpperCase().includes(text.toUpperCase())
				: user?.name.toUpperCase().includes(text.toUpperCase()) ||
				  user?.github_profile.toUpperCase().includes(text.toUpperCase()),
		);

		setfilterApplicantData(filteredData);
	};

	const onTextChange = (e) => {
		setApplicantText(e.target.value);
		filterChange(e.target.value);
	};

	const handleStatusChange = async (e) => {
		const val = e.target.value;
		setFilter(val);
		if (val === 'ALL') {
			setfilterApplicantData(data);
			return;
		}

		setfilterApplicantData(
			data.filter(
				(applicant) =>
					applicant.status === val.toUpperCase() ||
					applicant.status === val.toLowerCase(),
			),
		);
	};

	const handleScoreChange = (e) => {
		setSortVal(e.target.value);
		const val = e.target.value;
		switch (val) {
			case 'none':
				setfilterApplicantData(data);
				break;
			case 'asc':
				setfilterApplicantData(
					data.sort((a, b) => a.profile_score - b.profile_score),
				);
				break;
			case 'desc':
				setfilterApplicantData(
					data.sort((a, b) => b.profile_score - a.profile_score),
				);
				break;
			default:
				setfilterApplicantData(data);
				break;
		}
	};

	useEffect(() => {
		setfilterApplicantData(data);
		const selected = data.filter(
			(data) => data.status === 'AI SELECTED' || data.status === 'JOINED',
		).length;
		const rejected = data.filter((data) => data.status === 'REJECT').length;
		const inProgress = data.length - selected - rejected;
		setSummary({ selected, rejected, inProgress });
	}, [data]);

	return (
		<div className="flex flex-col gap-4  max-w-[1400px] mx-auto relative ">
			<div className="flex flex-col sm:flex-row gap-4 items-center ">
				<div className="sm:w-1/2">
					<SingleJobChart
						data={{
							labels: ['Selected', 'Rejected', 'In-Progress'],
							series: [summary.selected, summary.rejected, summary.inProgress],
						}}
					/>
				</div>
				<div className="flex flex-col gap-4 sm:w-1/2">
					<div className=" grid grid-cols-2 lg:grid-cols-4   gap-4">
						<div className="flex flex-col gap-3 p-4  rounded-lg bg-opacity-40  text-green-600 font-bold   bg-green-300  items-center">
							<h2 className="text-base  font-semibold">Total Students</h2>
							<p className=" text-2xl md:text-4xl ">{data.length}</p>
						</div>
						<div className="flex flex-col gap-3 p-4  rounded-lg bg-blue-300  text-blue-800 font-bold    items-center">
							<h2 className="text-base  font-semibold">Selected</h2>
							<p className=" text-2xl md:text-4xl ">{summary.selected}</p>
						</div>
						<div className="flex flex-col gap-3 p-4  rounded-lg bg-blue-50  text-blue-500 font-bold   items-center">
							<h2 className="text-base  font-semibold">In-Progress</h2>
							<p className=" text-2xl md:text-4xl ">{summary.inProgress}</p>
						</div>
						<div className="flex flex-col gap-3 p-4  rounded-lg bg-orange-50 font-bold  text-orange-500  items-center">
							<h2 className="text-base  font-semibold">Rejected</h2>
							<p className=" text-2xl md:text-4xl ">{summary.rejected}</p>
						</div>
					</div>
					<div className="hidden lg:flex flex-col gap-6  items-end my-4 md:my-8">
						<TableSearch
							value={applicantText}
							onChange={onTextChange}
							placeholder={'Search Applicants'}
						/>

						<div className="flex gap-6 items-center">
							<div className="p-3  border flex gap-2 items-center bg-blue-50 shadow-md rounded-full">
								<FiFilter />
								<select
									onChange={handleStatusChange}
									className="outline-none bg-transparent cursor-pointer  border-none text-xs"
									value={filter}
								>
									{jobStatus.map((status) => (
										<option key={uuid()} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div className="p-3  border flex gap-2 items-center bg-orange-50 shadow-md rounded-full">
								<BiSort />
								<select
									onChange={handleScoreChange}
									className="outline-none bg-transparent  cursor-pointer  border-none text-xs"
									value={sortVal}
								>
									<option value={'none'}>None</option>
									<option value={'asc'}>Ascending</option>
									<option value={'desc'}>Descending</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex lg:hidden flex-col gap-6  items-end my-4 md:my-8">
				<TableSearch
					value={applicantText}
					onChange={onTextChange}
					placeholder={'Search Applicants'}
				/>

				<div className="flex gap-6 items-center">
					<div className="p-3  border flex gap-2 items-center bg-blue-50 shadow-md rounded-full">
						<FiFilter />
						<select
							onChange={handleStatusChange}
							className="outline-none bg-transparent cursor-pointer  border-none text-xs"
							value={filter}
						>
							{jobStatus.map((status) => (
								<option key={uuid()} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
					<div className="p-3  border flex gap-2 items-center bg-orange-50 shadow-md rounded-full">
						<BiSort />
						<select
							onChange={handleScoreChange}
							className="outline-none bg-transparent  cursor-pointer  border-none text-xs"
							value={sortVal}
						>
							<option value={'none'}>None</option>
							<option value={'asc'}>Ascending</option>
							<option value={'desc'}>Descending</option>
						</select>
					</div>
				</div>
			</div>
			{isProcessingJob && (
				<div className="flex justify-end">
					<IconButton
						toolTipTitle={'Add Applicants'}
						text={'Add Applicants'}
						icon={<IoPersonAdd />}
						onClick={() => setShowAddApplicantModal(true)}
						type={'primary'}
					/>
				</div>
			)}

			{showAddApplicantModal && (
				<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-4xl p-4 m-auto z-50">
						<ClickWrapper func={() => {}}>
							<AddApplicantModal
								refetchData={fetchAllApplicants}
								close={() => {
									fetchAllApplicants();
									setShowAddApplicantModal(false);
								}}
								isModal
							/>
						</ClickWrapper>
					</div>
				</div>
			)}

			<div className="text-xs w-full  m-auto xl:text-sm grid grid-cols-1  gap-6 lg:gap-10 my-6 ">
				{filterApplicantData.length !== 0 &&
					filterApplicantData.map((applicantData, idx) => (
						<ApplicantCard
							fetchCreditData={fetchCreditData}
							eligible={eligible}
							key={uuid()}
							fetchAllApplicants={fetchAllApplicants}
							data={applicantData}
							idx={idx}
							jobStatus={jobStatus}
						/>
					))}
			</div>

			{filterApplicantData.length === 0 && (
				<Fragment>
					<p className="text-center w-full font-600 py-4 my-4 text-gray-500">
						No Applicants Found
					</p>
				</Fragment>
			)}
		</div>
	);
};

export default JobApplicantsTable;
