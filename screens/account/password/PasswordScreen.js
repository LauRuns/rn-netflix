import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const PasswordScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text>PasswordScreen works</Text>
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
