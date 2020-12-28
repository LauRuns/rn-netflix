import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton } from '../../components/atoms/index';

export const ItemDetail = (props) => {
	return (
		<View style={styles.screen}>
			<Text>ItemDetail works!</Text>
		</View>
	);
};

export const detailScreenOptions = (navData) => {
	return {
		// headerTitle: navData.route.params.itemTitle,
		headerTitle: 'Item details',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Add as fav"
					iconName={
						Platform.OS === 'android' ? 'heart-outline' : 'heart-outline'
					}
					onPress={() => {
						console.log('Add item to favorites');
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
