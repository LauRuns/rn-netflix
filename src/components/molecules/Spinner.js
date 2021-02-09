import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import Colors from '../../constants/Colors';
import { DefaultText } from '../atoms/index';
/*
Returns a loading spinner using the React Native ActivityIndicator.
Allows for setting size, color and additional text.
*/
export const Spinner = (props) => {
	return (
		<View style={styles.screen}>
			<ActivityIndicator size={props.spinnerSize} color={props.spinnerColor} />
			<View style={{ marginTop: 10 }}>
				<DefaultText color={props.spinnerTextColor}>
					{props.spinnerText}
				</DefaultText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	}
});
