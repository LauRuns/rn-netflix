import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	Alert,
	ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useFavorites } from '../../shared/context/favorites-context';
import { DefaultText } from '../../components/atoms/index';
import Colors from '../../constants/Colors';

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

	const toggleFavoriteHandler = () => {
		if (!isFavorite) {
			addToFavoritesHandler({ nfid, title, year, synopsis, img, imdbrating });
			setIsFavorite((prevState) => !prevState);
		} else if (isFavorite) {
			removeFromFavoritesHandler(currentItem._id);
			setIsFavorite((prevState) => !prevState);
		}
	};

	useEffect(() => {
		let foundItem;
		if (favorites && favorites.length !== 0) {
			foundItem = favorites.find((item) => +item.nfid === +nfid);
			setIsFavorite(foundItem ? true : false);
			setCurrentItem(foundItem ? foundItem : null);
		}
	}, [favorites]);

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
			<Image
				source={{ uri: img }}
				style={{ width: 300, height: 370 }}
				resizeMode="contain"
			/>
			<View style={styles.detailInfo}>
				<View style={styles.center}>
					<DefaultText
						color={Colors.primary}
						size={24}
						style={{
							fontFamily: 'roboto-bold'
						}}
					>
						{nfItem.title}
					</DefaultText>
				</View>
				<View style={styles.center}>
					<DefaultText size={20} color={Colors.primary}>
						{nfItem.year}
					</DefaultText>
				</View>
				<View style={styles.story}>
					<DefaultText size={20} color={Colors.primary}>
						{nfItem.synopsis}
					</DefaultText>
				</View>
				<DefaultText size={18} color={Colors.primary}>
					IMDB rating: {nfItem.imdbrating}
				</DefaultText>
			</View>
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
	detailInfo: {
		padding: 10
	},
	center: {
		alignItems: 'center'
	},
	story: {
		paddingVertical: 20
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
