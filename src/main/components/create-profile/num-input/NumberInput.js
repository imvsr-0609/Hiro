import React from 'react';

const NumberInput = ({
	label,
	placeholder,
	value,
	setValue,
	required = false,
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
}) => {
	return (
		<label className="flex w-full flex-col gap-2 text-xs md:text-sm ">
			<p className=" font-semibold  ">{label}</p>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				style={{ width: '100%' }}
				className="bg-white border-2  outline-none border-gray-500 border-opacity-20 p-3 rounded-xl placeholder:gray-200 "
				type="number"
				placeholder={placeholder}
				required={required}
				min={min}
				max={max}
			/>
		</label>
	);
};

export default NumberInput;
