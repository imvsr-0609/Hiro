import React, { Fragment } from 'react';
import { IoPersonAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import IconButton from '../../ui-component/buttons/IconButton';
import ListingPagination from '../ui-component/ListingPagination';
import TableSearch from '../ui-component/TableSearch';
import SingleAddApplicantTable from './SingleAddApplicantTable';
import { applicantHeaderData } from './data';

const ApplicantAdditionTable = ({
	applicantsData,
	jobID = '',
	isAdmin = false,
	activeStep,
	setActiveStep,
	page,
	limit,
	totalPage,
	search,
	setSearch,
	setPage,
}) => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-6  py-10 items-end">
			{!isAdmin && (
				<IconButton
					toolTipTitle={'Add Applicants'}
					onClick={() => setActiveStep(activeStep - 1)}
					text={'Add Applicants'}
					icon={<IoPersonAdd />}
					type="primary"
				/>
			)}
			<TableSearch
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={'Search Candidate name / github'}
			/>
			<div className="overflow-x-scroll w-full mt-10">
				<table className={`p-4 w-full rounded-2xl  shadow-custom bg-white`}>
					<tbody className="text-xs xl:text-sm rounded-lg ">
						<tr className="bg-blue-400 bg-opacity-20 p-2 ">
							{applicantHeaderData.map((head) => (
								<th key={uuid()} className="text-center p-2 py-3 ">
									{head.title}{' '}
								</th>
							))}
						</tr>

						{applicantsData.length !== 0 &&
							applicantsData.map((singleApplicant, idx) => (
								<SingleAddApplicantTable
									key={uuid()}
									data={singleApplicant}
									idx={idx}
									isAdmin={isAdmin}
								/>
							))}
					</tbody>
				</table>
				{applicantsData.length === 0 && (
					<Fragment>
						<p className="text-center w-full font-600 py-4 my-4 text-gray-500">
							No Applicants
						</p>
					</Fragment>
				)}
				<ListingPagination
					page={page}
					onPageChange={(val) => setPage(val)}
					count={totalPage}
				/>
			</div>
			<button
				onClick={() => navigate(`/job-listing/${jobID}`)}
				className="p-3 px-5  bg-blue-500 text-white rounded-xl mt-6  text-sm font-semibold w-32 "
			>
				Finish
			</button>
		</div>
	);
};

export default ApplicantAdditionTable;
