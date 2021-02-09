import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';

export const DefaultText = (props) => {
	return (
		<Text
			style={{
				...styles.text,
				...{ color: props.color || Colors.nfWhite, fontSize: props.size },
				...props.style
			}}
		>
			{props.children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'roboto-regular'
	}
});
