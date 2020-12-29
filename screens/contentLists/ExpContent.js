import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ExpContent = (props) => {
	return (
		<View style={styles.screen}>
			<Text></Text>
		</View>
	);
};

export const expcontentScreenOptions = (navData) => {
	return {
		headerTitle: 'Exp content'
	};
};

const styles = StyleSheet.create({
	screen: {}
});
