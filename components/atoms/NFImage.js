import React from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	TouchableNativeFeedback,
	Platform
} from 'react-native';

/*
Returns a touchable image. Is used to diplay the different Netflix items that have image property within a FlatList or Scrollview.
*/
export const NFImage = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.OS >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<TouchableCmp onPress={props.onSelectNFItem}>
			<View style={{ ...styles.imageContainer, ...props.style }}>
				<Image
					style={{ ...styles.image, ...props.imageStyle }}
					source={{ uri: props.imageUrl }}
					resizeMode={props.resizeMode}
				/>
			</View>
		</TouchableCmp>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		margin: 10,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: 150,
		height: 200
	}
});
