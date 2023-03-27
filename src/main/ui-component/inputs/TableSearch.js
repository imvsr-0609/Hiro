import React from 'react';
import { FiSearch } from 'react-icons/fi';

const TableSearch = ({ onChange, value, placeholder }) => {
	return (
		<div className="flex items-center bg-gray-100 shadow-md rounded-full px-3 w-full max-w-3xl ">
			<FiSearch />
			<input
				value={value}
				onChange={onChange}
				type="text"
				placeholder={placeholder}
				className="bg-transparent placeholder-gray-400 p-3 text-sm sm:text-base  border-none outline-none w-full "
			/>
		</div>
	);
};

export default TableSearch;
