import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ArrowTooltip } from '../../ui-component/tooltip/Tooltip';

const SingleAddApplicantTable = ({ data, idx, isAdmin }) => {
	const {
		applied_date,
		avatar_url,
		email,
		github_profile,
		id,
		job_id,
		last_updated,
		resume_phone,
		resume,
		name,
	} = data;

	return (
		<tr className="text-xs xl:text-sm cursor-pointer font-semibold font-600 relative text-gray-600   ">
			<td className="text-center">
				<p className=" p-2 px-4 ">{idx + 1}</p>
			</td>
			<td>
				{github_profile && (
					<div className="flex gap-3 items-start sm:px-3 w-[200px]">
						<img
							className="w-10 h-10 object-contain rounded-lg"
							src={avatar_url}
							alt={github_profile}
						/>
						<Link
							to={`/dashboard/${github_profile}`}
							className=" flex flex-col gap-1 cursor-pointer hover:text-blue-500"
						>
							<p className=" lg:text-sm font-semibold">{github_profile}</p>
						</Link>
					</div>
				)}
			</td>

			<td className="text-center">
				<p className=" p-2  ">{name}</p>
			</td>
			<td className="text-center">
				<p className=" p-2  ">{email} </p>
			</td>
			<td className="text-center">
				<p className=" p-2  ">{resume_phone} </p>
			</td>
			<td className="text-center">
				<p className=" p-2  ">{applied_date} </p>
			</td>
			<td className="text-center">
				<p className=" p-2  ">{last_updated} </p>
			</td>
			<td className="text-center">
				{!isAdmin ? (
					<div className="flex gap-2 items-center justify-center">
						{resume && (
							<ArrowTooltip title="Resume">
								<a className="text-green-500" href={resume} target="blank">
									<HiOutlineDocumentReport className="text-xl" />
								</a>
							</ArrowTooltip>
						)}
						<ArrowTooltip title={'See Processing'}>
							<Link
								to={`/job-listing/${job_id}`}
								target="_blank"
								className=" p-2  text-yellow-500 "
							>
								<BiLinkExternal className="text-xl" />
							</Link>
						</ArrowTooltip>
					</div>
				) : (
					<p>-</p>
				)}
			</td>
		</tr>
	);
};

export default SingleAddApplicantTable;
