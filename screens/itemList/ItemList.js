import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NewNFContentList } from '../../components/organisms/NewNFContentList';

export const ItemList = (props) => {
	return (
		<View style={styles.screen}>
			<NewNFContentList navData={props.navigation} />
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
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
});
