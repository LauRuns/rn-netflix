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

	/* Handles the login by setting the context state and storing the data in the device memory */
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

	/* Handles logout by setting the state back to null and removing the data from device memory */
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

	/* Checks if token and token expirationdate are set in state, if not, it will clear the logout timer. */
	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	/*
    Returns the user data that was stored in the device memory. If present, then it will run the login again.
    This is more useful for a webapp where the user is able to manually refresh the page, losing all the authstate.
    By setting it in device memory (or browser memory) it persists when reloads occur.
    */
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
