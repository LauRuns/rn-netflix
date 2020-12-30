import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { DefaultText } from '../atoms/index';

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
		alignItems: 'center'
	}
});
