import React from 'react';

const RippleLoader = () => {
	return (
		<div className="w-full  grid place-items-center p-10 ">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default RippleLoader;
