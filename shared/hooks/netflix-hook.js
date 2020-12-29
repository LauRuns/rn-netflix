import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

import { MOVIES_KEY } from '@env';

let headersConfig = {
	'x-rapidapi-host': 'unogsng.p.rapidapi.com',
	'x-rapidapi-key': MOVIES_KEY,
	useQueryString: true
};

export const useNetflixClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	let cancelToken;
	let _isMounted = useRef(null);

	useEffect(() => {
		_isMounted.current = true;
		cancelToken = axios.CancelToken.source();

		return () => {
			console.log('Netflix cleanup');
			setIsLoading(false);
			_isMounted.current = false;
		};
	}, []);

	const fetchNetflixData = useCallback(
		async ({ urlEndpoint, method = 'GET', body = null, params }) => {
			setIsLoading(true);

			axios.interceptors.request.use(
				(config) => {
					// config.headers = headersConfig;
					return config;
				},
				(err) => {
					throw err;
				}
			);
			axios.interceptors.response.use(
				(response) => {
					return response;
				},
				(err) => {
					throw err;
				}
			);

			try {
				const response = await axios({
					method: method,
					url: `https://unogsng.p.rapidapi.com/${urlEndpoint}`,
					data: body,
					headers: headersConfig,
					params: params,
					cancelToken: cancelToken.token
				}).catch((e) => {
					if (axios.isCancel(e)) {
						console.log('Axios CX on Netflix request');
						setError(e.message);
					}
					if (e.response) {
						console.log('There is an issue with the response', e);
						setError(e.message);
					} else if (e.request) {
						console.log('There is an error with the request', e);
					} else {
						console.log('The colonel says: ', e.message);
					}
				});

				if (_isMounted.current) {
					let responseData;
					if (response?.data) {
						responseData = response.data.results;
					}
					setIsLoading(false);
					return responseData;
				}
			} catch (error) {
				if (_isMounted.current) {
					setError(error.message);
					setIsLoading(false);
				}
				throw error;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	return { isLoading, error, fetchNetflixData, clearError };
};
