import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	Alert,
	ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
/* UI elements, components, hooks and styling */
import { useFavorites } from '../../shared/context/favorites-context';
import { NFItemDetails } from '../../components/molecules/index';
import Colors from '../../constants/Colors';

/* Displays the selected items details and has the option of adding the item to the users favorites */
export const ItemDetail = (props) => {
	const {
		favorites,
		addToFavoritesHandler,
		removeFromFavoritesHandler,
		isLoading,
		error,
		clearError
	} = useFavorites();
	const [isFavorite, setIsFavorite] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);
	const nfItem = props.route.params.item;
	const { nfid, title, year, synopsis, img, imdbrating } = nfItem;

	/* Adds/removes a favorite item - forwards the call to the backend via the favorite context */
	const toggleFavoriteHandler = () => {
		if (!isFavorite) {
			addToFavoritesHandler({ nfid, title, year, synopsis, img, imdbrating });
			setIsFavorite((prevState) => !prevState);
		} else if (isFavorite) {
			removeFromFavoritesHandler(currentItem._id);
			setIsFavorite((prevState) => !prevState);
		}
	};

	/*
    Adjusts the list of favorite items if the users adds or removes a favorite item.
    This method runs when the 'favorites' changes - favorites are set via the favorites coontext.
    */
	useEffect(() => {
		let foundItem;
		if (favorites && favorites.length !== 0) {
			foundItem = favorites.find((item) => +item.nfid === +nfid);
			setIsFavorite(foundItem ? true : false);
			setCurrentItem(foundItem ? foundItem : null);
		}
	}, [favorites]);

	/* If the error property is set, a pop-up showing the error message wil be opened */
	useEffect(() => {
		if (error) {
			Alert.alert('Error', error || 'An unexpected error occurred', [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	let TouchableCmp = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.OS >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}

	return (
		<ScrollView contentContainerStyle={styles.viewContainer}>
			<View style={styles.favHeart}>
				{isLoading ? (
					<ActivityIndicator size="small" color={Colors.primary} />
				) : (
					<TouchableCmp onPress={toggleFavoriteHandler}>
						<Ionicons
							name={isFavorite ? 'heart-sharp' : 'heart-outline'}
							size={30}
							color={Colors.primary}
						/>
					</TouchableCmp>
				)}
			</View>
			<NFItemDetails item={nfItem} />
		</ScrollView>
	);
};

export const detailScreenOptions = (navData) => {
	const { title } = navData.route.params.item;
	return {
		headerTitle: title
	};
};

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	},
	favHeart: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		paddingRight: 15,
		height: '5%'
	}
});
