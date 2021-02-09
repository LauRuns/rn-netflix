import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
/* UI elements, components, hooks and styling */
import { useFavorites } from '../../shared/context/favorites-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
	NFImage,
	NFHeaderButton,
	DefaultText
} from '../../components/atoms/index';
import Colors from '../../constants/Colors';

/* Loads and displays all the favorite items for the logged in user */
export const FavoritesScreen = (props) => {
	const { favorites } = useFavorites();
	const { error, clearError } = useHttpClient();

	/*
    Navigates to the details screen when a favorite item is pressed.
    The selected item is passed as 'props'.
    In the details screen, the user has the option of removing the item from the favorites.
    */
	const onItemSelectedHandler = (item) => {
		props.navigation.navigate('ItemDetail', { item: item });
	};

	/* If the error property is set, a pop-up showing the error message wil be opened */
	useEffect(() => {
		if (error) {
			Alert.alert('Error', error || 'An unexpected error occurred', [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	/* Returns a <NFImage /> component displayed in the FlatList of favorite Netflix items */
	const renderNFItemImage = (itemData) => {
		return (
			<NFImage
				imageUrl={itemData.item.img}
				onSelectNFItem={() => {
					onItemSelectedHandler(itemData.item);
				}}
			/>
		);
	};

	/* If the user does not have any favorite items, then the JSX below will be returned, informing the user about not having set any favorite items yet */
	if (!favorites || favorites.length === 0) {
		return (
			<View style={styles.screenNoItems}>
				<DefaultText size={22}>You have no favorite items yet.</DefaultText>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<SafeAreaView style={styles.list}>
				{favorites && (
					<FlatList
						data={favorites}
						numColumns={2}
						keyExtractor={(item) => item.nfid}
						renderItem={renderNFItemImage}
						contentContainerStyle={{
							paddingBottom: 50
						}}
					/>
				)}
			</SafeAreaView>
		</View>
	);
};

export const favoritesScreenOptions = (navData) => {
	return {
		headerTitle: 'Favorites',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.backgroundDark
	},
	screenNoItems: {
		flex: 1,
		backgroundColor: Colors.backgroundDark,
		justifyContent: 'center',
		alignItems: 'center'
	},
	list: {
		alignItems: 'center',
		flex: 2
	}
});
