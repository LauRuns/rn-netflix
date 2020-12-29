import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton, DefaultText } from '../../components/atoms/index';
import { NFItemDetails } from '../../components/molecules/index';
import Colors from '../../constants/Colors';

export const ItemDetail = (props) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const nfItem = props.route.params.item;

	const toggleFavoriteHandler = () => {
		// dispatch(toggleFavorite(mealId));
		setIsFavorite((prevState) => !prevState);
	};

	return (
		<ScrollView contentContainerStyle={styles.viewContainer}>
			<Image source={{ uri: nfItem.img }} style={{ width: 300, height: 370 }} />
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
	return {
		headerTitle: navData.route.params.item.title,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Add as fav"
					// iconName={isFavorite ? 'heart-sharp' : 'heart-outline'}
					iconName={
						Platform.OS === 'android' ? 'heart-outline' : 'heart-outline'
					}
					onPress={() => {
						console.log('Add item to favorites');
						// toggleFavoriteHandler();
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	viewContainer: {
		height: '100%',
		alignItems: 'center',
		paddingTop: 50,
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
	}
});
