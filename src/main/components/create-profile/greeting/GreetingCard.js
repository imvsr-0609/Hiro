import React from 'react';
import { MdOutlineDone } from 'react-icons/md';

const GreetingCard = () => {
	return (
		<div className="w-full h-full grid place-items-center">
			<div className="shadow-lg max-w-3xl mx-auto p-4 rounded-lg bg-gray-200 flex flex-col gap-4 items-center text-center ">
				<MdOutlineDone className="text-7xl" />
				<h1 className="text-2xl font-bold">Thank You for applying</h1>
				<h5>Your application has been submitted</h5>
				<p className="text-sm  ">
					You'll now be redirected to Home Page in 5 sec . Make sure to connect
					your profile with us in order to proceed with your application process
				</p>
			</div>
		</div>
	);
};

export default GreetingCard;
