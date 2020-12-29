import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DefaultText } from '../atoms/index';

export const NewNFItem = (props) => {
	return (
		<View style={styles.screen}>
			<Text>New item works</Text>
			<DefaultText>{props.title}</DefaultText>
			<DefaultText>{props.year}</DefaultText>
			<DefaultText>{props.synopsis}</DefaultText>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'column'
	}
});
