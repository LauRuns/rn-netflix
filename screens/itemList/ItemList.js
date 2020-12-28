import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const ItemList = (props) => {
	const selectItemHandler = () => {
		props.navigation.navigate('ItemDetail');
	};

	return (
		<View style={styles.screen}>
			<Text>List items screen works!</Text>
			<Button title="Itemdetail" onPress={selectItemHandler} />
		</View>
	);
};

export const itemListScreenOptions = (navData) => {
	return {
		// headerTitle: navData.route.params.itemTitle,
		headerTitle: 'Items List'
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
