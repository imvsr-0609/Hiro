import React from 'react';

const TextInput = ({
	label,
	placeholder,
	value,
	setValue,
	disabled = false,
	allowNumber = false,
	required = false,
}) => {
	const handleChange = (e) => {
		if (allowNumber) {
			const regex = /^[0-9\b]+$/;
			if (e.target.value === '' || regex.test(e.target.value)) {
				setValue(e.target.value);
			}
		} else {
			setValue(e.target.value);
		}
	};

	return (
		<label className="flex flex-col w-full gap-2 text-xs md:text-sm ">
			<p className={`font-semibold  ${disabled && 'text-gray-300'}  `}>
				{label}
			</p>
			<input
				value={value}
				onChange={handleChange}
				className="bg-white border-2  outline-none border-gray-500 border-opacity-20 p-3 rounded-xl placeholder:gray-200 disabled:text-gray-300 disabled:cursor-default"
				type="text"
				placeholder={placeholder}
				required={required}
				disabled={disabled}
			/>
		</label>
	);
};

export default TextInput;
