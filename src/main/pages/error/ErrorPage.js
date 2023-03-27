import React from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/404/404';

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className="w-screen h-screen grid place-items-center">
			<Error />

			<button
				className="bg-blue-500 text-white px-3 py-2"
				onClick={() => navigate('/')}
			>
				Back to Home
			</button>
		</div>
	);
};

export default ErrorPage;
