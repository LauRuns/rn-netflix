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
			console.log('HTTP HOOK RUNNING CLEANUP');
			signal.cancel('The request was cancelled!');
			setIsLoading(false);
			isMounted.current = false;
		};
	}, []);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);

			try {
				console.log('sendRequest was fired');
				if (isMounted.current) {
					const response = await axios({
						method: method,
						url: url,
						data: body,
						headers: headers,
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
