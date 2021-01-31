import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	let signal;
	let isMounted = useRef(null);

	useEffect(() => {
		isMounted.current = true;
		signal = axios.CancelToken.source();

		return () => {
			setIsLoading(false);
			isMounted.current = false;
		};
	}, []);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);

			try {
				axios.interceptors.response.use(
					(response) => {
						return response;
					},
					(err) => {
						setIsLoading(false);
						throw err;
					}
				);

				if (isMounted.current) {
					const response = await axios({
						method: method,
						url: url,
						data: body,
						headers: headers,
						withCredentials: true,
						cancelToken: signal.token
					});

					let responseData;
					if (response?.data) {
						responseData = response.data;
					}
					setIsLoading(false);
					return responseData;
				}
			} catch (err) {
				if (isMounted.current) {
					setIsLoading(false);

					if (axios.isCancel(err)) {
						console.log('Axios isCancel is thrown___:', err.message);
					} else if (err.response) {
						console.log(
							"Voldemort says there's an issue with your Response___:",
							err.response.status
						);
						setError(err.message);
					} else if (err.request) {
						console.log(
							"Voldemort says there's an issue with your Request___:",
							err.message
						);
						setError(err.message);
					} else {
						console.log('Voldemort says ', err.message);
						setError(err.message);
					}
				}
				throw err;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	return { isLoading, error, sendRequest, clearError };
};
