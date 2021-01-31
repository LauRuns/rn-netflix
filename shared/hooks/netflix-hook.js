import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { MOVIES_KEY } from '@env';

let headersConfig = {
	'x-rapidapi-host': 'unogsng.p.rapidapi.com',
	'x-rapidapi-key': MOVIES_KEY,
	useQueryString: true
};

/* Custom hook for fetching Netflix content from the unogsNG located at rapidapi.com */
export const useNetflixClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	let cancelToken;
	let _isMounted = useRef(null);

	/* Creates a reference that is used to check if the component is mounted and a axios canceltoken. Runs on every request made. */
	useEffect(() => {
		_isMounted.current = true;
		cancelToken = axios.CancelToken.source();

		return () => {
			setIsLoading(false);
			_isMounted.current = false;
		};
	}, []);

	/*
    Makes the call to the API and returns the response data or an error object.
    Interceptors are used to add on to the request header and check for errors on the response.
    */
	const fetchNetflixData = useCallback(
		async ({ urlEndpoint, method = 'GET', body = null, params }) => {
			setIsLoading(true);

			/* Perform a task before the request is sent */
			axios.interceptors.request.use(
				(config) => {
					let header = {
						...config.headers,
						...headersConfig
					};
					config.headers = header;
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

			try {
				if (_isMounted.current) {
					const response = await axios({
						method: method,
						url: `https://unogsng.p.rapidapi.com/${urlEndpoint}`,
						data: body,
						// headers: headersConfig,
						params: params,
						cancelToken: cancelToken.token
					});
					let responseData;
					if (response?.data) {
						responseData = response.data.results;
					}
					setIsLoading(false);
					return responseData;
				}
			} catch (error) {
				if (_isMounted.current) {
					setError(
						err.response.data.message ? err.response.data.message : err.message
					);
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
