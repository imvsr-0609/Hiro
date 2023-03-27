import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const CoverLetter = ({ coverLetter, close }) => {
	return (
		<div className="w-full bg-white rounded-2xl shadow-lg m-auto relative p-4 md:p-10 lg:p-12 flex flex-col gap-4 max-h-[90vh]  min-h-[400px] ">
			<button
				onClick={close}
				className="absolute top-6 right-6 text-3xl font-bold text-blue-500"
			>
				<IoMdCloseCircleOutline />
			</button>
			<h2 className="text-xl text-center font-semibold mb-2">Cover Letter</h2>

			<div className="h-[2px] bg-gradient-to-r from-blue-500 to-orange-500 w-full"></div>

			<p className="py-10">{ReactHtmlParser(coverLetter)}</p>
		</div>
	);
};

export default CoverLetter;
