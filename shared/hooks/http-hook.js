import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	// const activeHttpRequests = useRef([]);
	let signal;
	let isMounted = useRef(null);

	useEffect(() => {
		isMounted.current = true;
		signal = axios.CancelToken.source();

		return () => {
			// activeHttpRequests.current.forEach((abortControl) => abortControl.abort());
			console.log('HTTP HOOK RUNNING CLEANUP');
			signal.cancel('The request was cancelled!');
			setIsLoading(false);
			isMounted.current = false;
		};
	}, []);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);
			// const httpAbortController = new AbortController();
			// activeHttpRequests.current.push(httpAbortController);

			try {
				// request interceptor
				axios.interceptors.request.use(
					(config) => {
						/*
			    perform a task before the request is sent
			    - Setting the Authorization token on every request?
			    */
						return config;
					},
					(err) => {
						// handle the error
						throw err;
					}
				);

				// response interceptor
				axios.interceptors.response.use(
					(response) => {
						// perform a task before the response is received
						return response;
					},
					(err) => {
						// handle the error
						throw err;
					}
				);

				if (isMounted.current) {
					const response = await axios({
						method: method,
						url: url,
						data: body,
						headers: headers,
						cancelToken: signal.token
					});
					// .catch((err) => {
					// 	if (axios.isCancel(err)) {
					// 		console.log('Axios isCancel is thrown', err);
					// 		setError(err.message);
					// 		setIsLoading(false);
					// 	}
					// 	if (err.response) {
					// 		console.log("Voldemort says there's an issue with your Response ", err.response.status);
					// 	} else if (err.request) {
					// 		console.log("Voldemort says there's an issue with your Request.");
					// 	} else {
					// 		console.log('Voldemort says ', err.message);
					// 	}
					// });

					let responseData;
					if (response?.data) {
						responseData = response.data;
					}
					setIsLoading(false);
					return responseData;
				}

				/*
            Using Fetch
            */
				// const response = await fetch(url, {
				// 	method,
				// 	body,
				// 	headers,
				// 	signal: httpAbortController.signal
				// });

				// const responseData = await response.json();

				// activeHttpRequests.current = activeHttpRequests.current.filter(
				// 	(reqCtrl) => reqCtrl !== httpAbortController
				// );

				// if (response.statusText !== 'OK') {
				// 	throw new Error(response.message);
				// }

				// let responseData;
				// if (response?.data) {
				// 	console.log('There is response data!');

				// 	responseData = response.data;
				// }
				// setIsLoading(false);
				// return responseData;
			} catch (err) {
				// setError(err.message); // <-- when using fetch as method
				// setError(err.response.data.message);
				// setError(err);
				if (isMounted.current) {
					setError(err.response.data.message);
					setIsLoading(false);
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
