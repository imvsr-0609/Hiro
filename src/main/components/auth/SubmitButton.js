import React from 'react';

const SubmitButton = ({ text, disabled }) => {
	return (
		<button
			disabled={disabled}
			type="submit"
			className="p-3 rounded-full disabled:cursor-default disabled:bg-blue-400 cursor-pointer bg-blue-500 hover:text-blue-600 text-white  text-xs font-600 hover:bg-transparent border-2 border-transparent hover:border-blue-500 transition-all duration-300 min-w-[200px]"
		>
			{text}
		</button>
	);
};

export default SubmitButton;
