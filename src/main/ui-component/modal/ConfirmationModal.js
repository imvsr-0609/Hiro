import React from 'react';

const ConfirmationModal = ({
	handlePositive,
	handleNegative,
	title,
	heading,
	positiveText,
	negativeText,
}) => {
	return (
		<div className=" bg-white flex flex-col gap-10  text-sm  rounded-lg shadow-lg overflow-hidden">
			<div className="">
				<h1 className="text-xl p-3 border-b border-gray-300 font-semibold border-opacity-40 text-center ">
					{heading}
				</h1>
				<h3 className="text-base text-center p-3">{title}</h3>
			</div>

			<div className="flex  items-center ">
				<button
					onClick={handleNegative}
					className="p-3  w-1/2 grid place-items-center  bg-red-400 hover:bg-red-500 text-white "
				>
					{negativeText}
				</button>
				<button
					onClick={handlePositive}
					className="p-3  w-1/2 grid place-items-center  bg-blue-400 hover:bg-blue-500 text-white "
				>
					{positiveText}
				</button>
			</div>
		</div>
	);
};

export default ConfirmationModal;
