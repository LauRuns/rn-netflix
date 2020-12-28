import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const CountryScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text>Country screen works</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
