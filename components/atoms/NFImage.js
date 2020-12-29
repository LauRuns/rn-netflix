import React from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	TouchableNativeFeedback,
	Platform
} from 'react-native';

export const NFImage = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.OS >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<TouchableCmp onPress={props.onSelectNFItem}>
			<View style={{ ...styles.imageContainer, ...props.style }}>
				<Image style={styles.image} source={{ uri: props.imageUrl }} />
			</View>
		</TouchableCmp>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		margin: 10,
		height: '100%',
		borderRadius: 10,
		overflow: 'hidden'
	},
	image: {
		width: 150,
		height: 200
		// aspectRatio: 3 / 2
	}
});
