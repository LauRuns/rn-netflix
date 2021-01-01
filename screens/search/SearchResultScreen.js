import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SearchResultScreen = (props) => {
	const {
		query,
		contentType,
		startyear,
		endyear,
		countryId
	} = props.route.params.queryParams;
	console.log(query, contentType, startyear, endyear, countryId);

	return (
		<View style={styles.screen}>
			<Text>SearchResultScreen works</Text>
			<Text>
				Search query: {query} for country ID: {countryId}
			</Text>
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
