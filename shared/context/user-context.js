import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useContext } from 'react';
import { CONNECTION_STRING } from '@env';
import AsyncStorage from '@react-native-community/async-storage';
/* Context and hooks */
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthState } from '../../shared/context/auth-context';

export const UserContext = createContext();
export const useContextUser = () => {
	return useContext(UserContext);
};

/* Provides user context for the application */
export const UserContextProvider = ({ children }) => {
	const [activeUser, setActiveUser] = useState({
		user: null
	});
	const [countryData, setCountryData] = useState(null);
	const { token, userId } = useAuthState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	/* Sets the active user in state and in de device memory */
	const setActiveUserHandler = useCallback((data) => {
		setActiveUser({
			...activeUser,
			user: {
				userId: data._id,
				userName: data.name,
				email: data.email,
				avatar: data.image,
				country: data.country,
				updatedAt: data.updatedAt
			}
		});

		if (data.country) {
			setCountryData(data.country);
			AsyncStorage.setItem(
				'countryData',
				JSON.stringify({
					countryData: data.country
				})
			);
		}
	}, []);

	/*
    Updates the user data.
    Takes in name, email data or a country object.
    The backend expects all three, name - email and country object.
    */
	const updateUserHandler = async (data) => {
		const { country, username, email } = data;
		try {
			const responseData = await sendRequest(
				`${CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				JSON.stringify({
					username: username || activeUser.user.userName,
					email: email || activeUser.user.email,
					country: country ? { ...country } : activeUser.user.country
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			setActiveUserHandler(responseData.updatedUser);
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	/* Updates the users image / avatar */
	const updateUserImgHandler = async (data) => {
		try {
			const responseData = await sendRequest(
				`${CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				data,
				{
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			);
			if (responseData) {
				setActiveUserHandler(responseData.updatedUser);
			}
		} catch (err) {
			// Errors are handled by the useHttpClient method
		}
	};

	/* Checks if a countryData object is set in the device storage. If found it updates the state with it. */
	useEffect(() => {
		let storedCountry;
		const getData = async () => {
			try {
				storedCountry = await AsyncStorage.getItem('countryData');
				storedCountry = JSON.parse(storedCountry);
				if (storedCountry) {
					setCountryData(storedCountry.countryData);
				}
			} catch (error) {
				console.log(error); // <- not yet handled ?
			}
		};
		getData();
		return () => {};
	}, []);

	const userData = {
		activeUser,
		countryData,
		setActiveUserHandler,
		updateUserHandler,
		updateUserImgHandler,
		isUpdating: isLoading,
		updatingError: error,
		clearError
	};

	return (
		<UserContext.Provider value={userData}>{children}</UserContext.Provider>
	);
};
