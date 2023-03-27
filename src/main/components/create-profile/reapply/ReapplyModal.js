import React from 'react';

const ReapplyModal = ({
	handlePositive,
	handleNegative,
	title,
	positiveText,
	negativeText,
}) => {
	return (
		<div className=" bg-white flex flex-col gap-10  p-6 text-sm  rounded-md shadow-lg">
			<h3 className="text-base text-center">{title}</h3>
			<div className="flex rounded-md overflow-hidden items-center justify-around">
				<button
					onClick={handleNegative}
					className="w-1/2 p-3 py-2 grid place-items-center  bg-red-400 hover:bg-red-500 text-white "
				>
					{negativeText}
				</button>
				<button
					onClick={handlePositive}
					className="w-1/2 p-3 py-2 grid place-items-center  bg-blue-400 hover:bg-blue-500 text-white "
				>
					{positiveText}
				</button>
			</div>
		</div>
	);
};

export default ReapplyModal;
