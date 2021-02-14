import React, { useState, createContext, useCallback, useContext } from 'react';
import { CONNECTION_STRING } from '@env';

/* Context and hooks */
import { useHttpClient } from '../hooks/http-hook';
import { useAuthState } from './auth-context';

export const FavoritesContext = createContext();
export const useFavorites = () => {
	return useContext(FavoritesContext);
};

/* Allows for setting and updating the users favorite Netflix items */
export const FavoritesContextProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);
	const { token } = useAuthState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	/* Set the users favorite items after login in state */
	const loadFavoriteItemsHandler = useCallback((favItems) => {
		setFavorites(favItems);
	}, []);

	/* Adds a new faorite item to the list of favorites and updates the state. */
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
			loadFavoriteItemsHandler(newFavs);
		} catch (error) {
			// Error is handled by the useHttpClient
		}
	};

	/* Removes a favorite item from the list and updates the state. */
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
			const currentFavs = [...favorites];
			const newFavs = currentFavs.filter((item) => +item.nfid !== +netflixid);
			loadFavoriteItemsHandler(newFavs);
		} catch (error) {
			// Error is handled by the useHttpClient
		}
	};

	const favoritesData = {
		favorites,
		loadFavoriteItemsHandler,
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
