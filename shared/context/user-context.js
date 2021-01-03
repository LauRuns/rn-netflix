import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useContext } from 'react';
import { CONNECTION_STRING } from '@env';
import AsyncStorage from '@react-native-community/async-storage';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';

export const UserContext = createContext();

export const useContextUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const { token, userId } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const setNewCurrentUser = useCallback((user) => {
		setCurrentUser(user);

		if (user.country) {
			setCountryData(user.country);
			AsyncStorage.setItem(
				'countryData',
				JSON.stringify({
					countryData: user.country
				})
			);
		}
	}, []);

	const updateUser = async (data) => {
		console.log('updating_____>>', data);

		const { country, username, email } = data;
		try {
			const responseData = await sendRequest(
				`${CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				JSON.stringify({
					username: username || currentUser.name,
					email: email || currentUser.email,
					country: country ? { ...country } : currentUser.country
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			setNewCurrentUser(responseData.updatedUser);
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	const updateUserImg = async (data) => {
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
				setNewCurrentUser(responseData.updatedUser);
			}
		} catch (err) {
			// Errors are handled by the useHttpClient method
		}
	};

	useEffect(() => {
		let storedCountry;
		const getData = async () => {
			try {
				storedCountry = await AsyncStorage.getItem('countryData');
				storedCountry = JSON.parse(storedCountry);
				if (storedCountry) {
					console.log('Setting the stored country in the context');
					setCountryData(storedCountry.countryData);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getData();
		return () => {};
	}, []);

	const userData = {
		currentUser,
		countryData,
		setNewCurrentUser,
		updateUser,
		updateUserImg,
		isUpdating: isLoading,
		updatingError: error,
		clearError
	};

	return (
		<UserContext.Provider value={userData}>{children}</UserContext.Provider>
	);
};
