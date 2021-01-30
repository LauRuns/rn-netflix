import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { DefaultText } from '../atoms/index';
import Colors from '../../constants/Colors';

/*
Returns the details for a Netflix item provided via props.
*/
export const NFItemDetails = (props) => {
	return (
		<View style={styles.screen}>
			<Image source={{ uri: props.imageUrl }} />
			<DefaultText size={20} color={Colors.primary}>
				{props.title}
			</DefaultText>
			<DefaultText size={20} color={Colors.primary}>
				{props.year}
			</DefaultText>
			<DefaultText size={20} color={Colors.primary}>
				{props.synopsis}
			</DefaultText>
			<DefaultText size={20} color={Colors.primary}>
				IMDB rating: {props.imdbrating}
			</DefaultText>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 10,
		width: '50%',
		height: 10
	}
});
