import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SearchResultScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text>SearchResultScreen works</Text>
		</View>
	);
};

export const searchResultScreenOptions = (navData) => {
	return {
		headerTitle: 'SearchResult'
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
