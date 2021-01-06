import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

/* Hooks and context */
import { useFavorites } from '../../shared/context/favorites-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

/* UI elements and components */
import {
	NFImage,
	NFHeaderButton,
	DefaultText
} from '../../components/atoms/index';
import Colors from '../../constants/Colors';

export const FavoritesScreen = (props) => {
	const { favorites } = useFavorites();
	const { error, clearError } = useHttpClient();

	const onItemSelectedHandler = (item) => {
		props.navigation.navigate('ItemDetail', { item: item });
	};

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error || 'An unexpected error occurred', [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

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
