import React from 'react';
import { AiFillUnlock } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axiosInstance from '../../../services/axios/axios';
import IconButton from '../../ui-component/buttons/IconButton';

const SonarcloudRequest = ({ status, close }) => {
	const requestSonarCubeAccess = async () => {
		// try {
		// 	await axiosInstance.put(
		// 		`https://b2jzh4pdxj.execute-api.ap-south-1.amazonaws.com/Dev/updatestatus`,
		// 		{
		// 			USER_ID: 16,
		// 			STATUS: 'REQUESTED',
		// 		},
		// 	);
		// 	toast.success('Request Sent', {
		// 		position: 'top-center',
		// 		autoClose: 3000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 		progress: undefined,
		// 	});
		// 	close();
		// } catch (err) {
		// 	console.log(err.message);
		// }
	};
	return (
		<div className="bg-white p-4 md:p-6 rounded-md text-sm">
			{status === 'PROCESSING' ? (
				<div className="flex flex-col gap-4">
					<h3 className="text-lg font-semibold text-center ">
						Your Request is pending{' '}
					</h3>
					<p>
						Please Login again to get the updated status . Our team will reach
						out to you for access credentials once the request is approved .
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<h3 className="text-lg font-semibold text-center">Request Access </h3>
					<p>
						Our assignment flow is connected with SonarCube . You need to
						request for access.
					</p>

					<IconButton
						toolTipTitle={'Request Access'}
						text={'Request Access'}
						onClick={() => requestSonarCubeAccess()}
						icon={<AiFillUnlock />}
						type="primary"
					/>
				</div>
			)}
		</div>
	);
};

export default SonarcloudRequest;
