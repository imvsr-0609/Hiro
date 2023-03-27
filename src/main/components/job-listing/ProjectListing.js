import React, { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import IconButton from '../../ui-component/buttons/IconButton';
import ClickWrapper from '../click-wrapper/ClickWrapper';
import CreateProjectModal from '../project/CreateProjectModal';
import ProjectListingWrapper from './ProjectListingWrapper';

const ProjectListing = ({ fetchAllProjects, allProjectData }) => {
	const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
	const [tab, setTab] = useState(1);

	return (
		<div>
			<div className="flex flex-col-reverse max-w-7xl m-auto sm:flex-row justify-between gap-3 items-end sm:items-center mb-6 md:mb-10 ">
				<div className="flex w-full sm:max-w-xs justify-between items-center text xs  sm:text-sm  ">
					<button
						className={`flex-1 p-3 grid place-items-center ${
							tab === 1 &&
							'bg-blue-50 shadow-md  rounded-full border  font-semibold  '
						} `}
						onClick={() => setTab(1)}
					>
						Open Projects
					</button>
					<button
						className={`flex-1 p-3 grid place-items-center ${
							tab === 2 &&
							'bg-orange-50  shadow-md rounded-full border font-semibold  '
						}  `}
						onClick={() => setTab(2)}
					>
						Closed Projects
					</button>
				</div>

				<IconButton
					toolTipTitle={'Create Project'}
					onClick={() => setShowCreateProjectModal(true)}
					text={'Create Project'}
					icon={<IoAddCircle />}
					type="primary"
				/>
			</div>

			{showCreateProjectModal && (
				<div className="fixed text-left left-0 right-0 top-0 h-screen w-full z-10 bg-gray-300 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center">
					<div className="w-full max-w-4xl p-4 m-auto z-50">
						<ClickWrapper func={() => {}}>
							<CreateProjectModal
								refetchData={fetchAllProjects}
								close={() => setShowCreateProjectModal(false)}
							/>
						</ClickWrapper>
					</div>
				</div>
			)}

			{tab === 1 && (
				<ProjectListingWrapper
					allJobData={allProjectData.filter((job) => job.status === 'OPEN')}
					fetchAllJobs={fetchAllProjects}
				/>
			)}
			{tab === 2 && (
				<ProjectListingWrapper
					allJobData={allProjectData.filter((job) => job.status === 'CLOSE')}
					fetchAllJobs={fetchAllProjects}
				/>
			)}
		</div>
	);
};

export default ProjectListing;
