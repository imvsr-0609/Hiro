import React from 'react';

const DateInput = ({ label, placeholder, value, setValue }) => {
	return (
		<label className="flex flex-col gap-2 text-xs md:text-sm ">
			<p className=" font-semibold  ">{label}</p>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="bg-white   outline-none border-gray-500 border-opacity-20 p-3 border-2 rounded-xl placeholder:gray-200 "
				type="date"
				style={{ width: '100%' }}
				onFocus={(e) => (e.target.type = 'date')}
				onBlur={(e) => (e.target.type = 'text')}
				placeholder={placeholder}
			/>
		</label>
	);
};

export default DateInput;
