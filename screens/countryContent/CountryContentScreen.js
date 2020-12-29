import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const CountryContentScreen = (props) => {
	const onSelectListHandler = () => {
		props.navigation.navigate('ItemList');
	};
	return (
		<View style={styles.screen}>
			<Text>CountryContentScreen works</Text>
			<Button title="Go to list" onPress={onSelectListHandler} />
		</View>
	);
};

export const countryContentScreenOptions = (navData) => {
	return {
		headerTitle: 'Content for country'
	};
};

const styles = StyleSheet.create({
	screen: {}
});
