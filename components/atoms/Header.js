import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Header = (props) => {
	return (
		<View style={{ ...styles.screen, ...props.style }}>
			<Text style={{ ...styles.title, ...{ color: props.color } }}>
				{props.title}
			</Text>
			<Text style={{ ...styles.subHeader, ...{ color: props.color } }}>
				{props.subHeader}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		padding: 20,
		color: 'red'
	},
	title: {
		fontFamily: 'roboto-bold',
		fontSize: 22,
		marginBottom: 10
	},
	subHeader: {
		fontFamily: 'roboto-light',
		fontSize: 16
	}
});
