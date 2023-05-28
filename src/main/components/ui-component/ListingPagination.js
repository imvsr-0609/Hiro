import React from 'react';
import Pagination from '@mui/material/Pagination';

const ListingPagination = ({ onPageChange, count, page }) => {
	return (
		<div className="sm:p-2 my-2 md:my-0 md:p-4 grid place-items-center text-white">
			<Pagination
				count={count}
				shape="rounded"
				page={page}
				defaultPage={1}
				color="primary"
				onChange={(event, value) => onPageChange(value)}
			/>
		</div>
	);
};

export default ListingPagination;
