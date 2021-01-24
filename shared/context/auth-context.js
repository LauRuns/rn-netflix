import React, {
	useState,
	useContext,
	createContext,
	useCallback,
	useEffect
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext();
let logoutTimer;

export const AuthContextProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isLoggedIn: false,
		userId: null,
		token: null
	});
	const [token, setToken] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();

	const login = useCallback((uid, token, expirationDate) => {
		setAuthState({
			...authState,
			isLoggedIn: true,
			userId: uid,
			token: token
		});
		setToken(token);

		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);

		AsyncStorage.setItem(
			'tokenData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setAuthState({
			...authState,
			isLoggedIn: false,
			userId: null,
			token: null
		});
		setToken(null);
		setTokenExpirationDate(null);
		AsyncStorage.removeItem('tokenData');
		AsyncStorage.removeItem('countryData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		let storedData;
		const getData = async () => {
			try {
				storedData = await AsyncStorage.getItem('userData');
				storedData = JSON.parse(storedData);
				if (
					storedData &&
					storedData.token &&
					new Date(storedData.expiration) > new Date()
				) {
					login(
						storedData.userId,
						storedData.token,
						new Date(storedData.expiration)
					);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [login]);

	const authData = {
		...authState,
		isAuthenticated: authState.userId !== null && authState.isLoggedIn,
		login,
		logout
	};

	return (
		<AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
	);
};

export const useAuthState = () => useContext(AuthContext);
