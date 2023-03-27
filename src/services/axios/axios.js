import axios from 'axios';

const axiosInstance = axios.create({});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.headers['Authorization'] = 'Bearer ' + getToken()
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (401 === error.response.status) {
			console.log(error.message + 'Unauthorized');
		} else {
			if (typeof error.response === 'undefined') {
				alert('There seems to be server issue');
			}
			return Promise.reject(error);
		}
	},
);
export default axiosInstance;
