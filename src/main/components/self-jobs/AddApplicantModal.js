import React, { useState } from 'react';
import { Fragment } from 'react';
import { MdClose } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import AddedApplicants from './AddedApplicants';
import NewApplicantForm from './NewApplicantForm';

const AddApplicantModal = ({
	refetchData,
	close,
	jobID,
	activeStep,
	setActiveStep,
	isModal = false,
}) => {
	const [addedApplicants, setAddedApplicants] = useState([]);

	const handleButtonClick = () => {
		setActiveStep(activeStep + 1);
		close();
	};

	const handleModalClose = () => {
		if (addedApplicants.length > 0) {
			refetchData();
		}
		close();
	};

	return (
		<Fragment>
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
			<div
				className={`p-3 sm:p-6 md:p-10 py-10 w-full flex flex-col gap-10 ${
					isModal && 'rounded-2xl scrollbar-hidden '
				} max-h-[95vh]  bg-white overflow-y-scroll relative `}
			>
				{isModal && (
					<button
						onClick={close}
						className="absolute top-6 right-6 text-xl font-bold"
					>
						<MdClose />
					</button>
				)}
				<NewApplicantForm
					refetchData={refetchData}
					setAddedApplicants={setAddedApplicants}
					addedApplicants={addedApplicants}
					jobID={jobID}
				/>

				{addedApplicants.length > 0 && (
					<AddedApplicants data={addedApplicants} />
				)}

				<button
					onClick={() => (isModal ? handleModalClose() : handleButtonClick())}
					disabled={isModal && addedApplicants.length === 0}
					className="p-3 px-5 self-end bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-500 text-white rounded-xl w-32 text-sm font-semibold "
				>
					{isModal ? 'Finish' : 'Continue'}
				</button>
			</div>
		</Fragment>
	);
};

export default AddApplicantModal;
