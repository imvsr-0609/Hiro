import React from 'react';

const EmailInput = ({
	label,
	placeholder,
	value,
	setValue,
	required = false,
}) => {
	return (
		<label className="flex flex-col gap-2 text-xs md:text-sm ">
			<p className=" font-semibold  ">{label}</p>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="bg-white border-2  outline-none border-gray-500 border-opacity-20 p-3 rounded-xl placeholder:gray-200 "
				type="email"
				placeholder={placeholder}
				required={required}
			/>
		</label>
	);
};

export default EmailInput;
