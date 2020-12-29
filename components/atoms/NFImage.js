import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

export const NFImage = (props) => {
	return (
		<TouchableOpacity onPress={props.onSelectNFItem}>
			<View style={{ ...styles.imageContainer, ...props.style }}>
				<Image style={styles.image} source={{ uri: props.imageUrl }} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		margin: 15,
		height: 150,
		borderRadius: 10,
		overflow:
			Platform.OS === 'android' && Platform.Version >= 21
				? 'hidden'
				: 'visible',
		elevation: 3
	},
	image: {
		width: '100%',
		height: '100%'
		// width: 200,
		// height: 300
	}
});
