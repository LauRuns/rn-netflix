import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useContext } from 'react';
import { CONNECTION_STRING } from '@env';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';
import { useContextUser } from '../../shared/context/user-context';

export const FavoritesContext = createContext();

export const useFavorites = () => {
	return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState(null);
	const { token, userId } = useAuthentication();
	const { currentUser } = useContextUser();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const setUpdatedFavorites = useCallback((favItems) => {
		// console.log('favitems', [...favorites, favItems]);
		console.log('setting the favitems', favItems);
		setFavorites(favItems);
	}, []);

	useEffect(() => {
		console.log('should be fetching favorites now');
		const fetchFavorites = async () => {
			console.log('FETCHING FAVORITES', userId, token);
			try {
				const responseData = await sendRequest(
					`${CONNECTION_STRING}/favorites/user/${userId}`,
					'GET',
					null,
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				);
				console.log('useEffect favorites:', responseData.result);
				setFavorites(responseData.result);
			} catch (error) {}
		};
		fetchFavorites();
	}, []);

	useEffect(() => {
		console.log('FAVOS BEING LOGGED______::', favorites);
	}, [favorites]);

	const addToFavoritesHandler = async ({
		nfid,
		title,
		year,
		synopsis,
		img,
		imdbrating
	}) => {
		console.log(`Add ${title} with ID: ${nfid} to the favorites`);
		console.log(
			'FAV CONTEXT___>',
			nfid,
			title,
			year,
			synopsis,
			img,
			imdbrating
		);

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
			console.log(error);
			// Error is handled by the useHttpClient
		}
	};

	const removeFromFavoritesHandler = async (id) => {
		console.log(`Remove ID: ${id} from favorites`);
		try {
			const response = await sendRequest(
				`${CONNECTION_STRING}/favorites/${id}`,
				'DELETE',
				null,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			const { netflixid, _id } = response.result;
			let currentFavs = [...favorites];
			const newFavs = currentFavs.filter(
				(item) => +item.netflixid !== +netflixid
			);
			setFavorites(newFavs);
		} catch (error) {
			// Error is handled by the useHttpClient
		}
	};

	const favoritesData = {
		favorites,
		setUpdatedFavorites,
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
