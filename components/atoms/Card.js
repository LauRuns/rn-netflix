import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';

export const Card = (props) => {
	// merge the style props in with the other styles => style={{...styles.card, ...props.style}}
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: Colors.nfBlack,
		shadowOpacity: 0.26,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: Colors.shadesGray40
	}
});
