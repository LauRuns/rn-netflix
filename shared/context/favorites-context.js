import React, { useState, createContext, useCallback } from 'react';
import { useContext } from 'react';
import { CONNECTION_STRING } from '@env';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';

export const FavoritesContext = createContext();

export const useFavorites = () => {
	return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);
	const { token } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const loadFavoriteItems = useCallback((favItems) => {
		setFavorites(favItems);
	}, []);

	const addToFavoritesHandler = async ({
		nfid,
		title,
		year,
		synopsis,
		img,
		imdbrating
	}) => {
		try {
			const response = await sendRequest(
				`${CONNECTION_STRING}/favorites`,
				'POST',
				JSON.stringify({
					nfid,
					title,
					year,
					synopsis,
					img,
					imdbrating
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			const { favorite } = response;
			const newFavs = [...favorites, favorite];
			setFavorites(newFavs);
		} catch (error) {
			// Error is handled by the useHttpClient
		}
	};

	const removeFromFavoritesHandler = async (fid) => {
		try {
			const response = await sendRequest(
				`${CONNECTION_STRING}/favorites/${fid}`,
				'DELETE',
				null,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			const { netflixid } = response.result;
			let currentFavs = [...favorites];
			const newFavs = currentFavs.filter((item) => +item.nfid !== +netflixid);
			setFavorites(newFavs);
		} catch (error) {
			// Error is handled by the useHttpClient
		}
	};

	const favoritesData = {
		favorites,
		loadFavoriteItems,
		addToFavoritesHandler,
		removeFromFavoritesHandler,
		isLoading,
		error,
		clearError
	};

	return (
		<FavoritesContext.Provider value={favoritesData}>
			{children}
		</FavoritesContext.Provider>
	);
};
