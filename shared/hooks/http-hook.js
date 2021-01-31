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
				/* Perform a task before the request is sent */
				axios.interceptors.request.use(
					(config) => {
						return config;
					},
					(err) => {
						throw err;
					}
				);

				/* Perform a task before the response is passed on. If an error is set on the response body, then a check is performed what kind of error it is. */
				axios.interceptors.response.use(
					(response) => {
						return response;
					},
					(err) => {
						if (isMounted.current) {
							setIsLoading(false);
							if (axios.isCancel(err)) {
								console.error(err);
							} else if (err.response) {
								setError(
									err.response.data.message
										? err.response.data.message
										: err.message
								);
							} else if (err.request) {
								setError(
									err.response.data.message
										? err.response.data.message
										: err.message
								);
							} else {
								setError(
									err.response.data.message
										? err.response.data.message
										: err.message
								);
							}
						}
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
					setError(
						err.response.data.message ? err.response.data.message : err.message
					);
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
