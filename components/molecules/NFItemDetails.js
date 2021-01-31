import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { DefaultText } from '../atoms/index';
import Colors from '../../constants/Colors';

/*
Returns the details for a Netflix item provided via props.
*/
export const NFItemDetails = (props) => {
	const { title, year, synopsis, img, imdbrating } = props.item;

	return (
		<View style={styles.screen}>
			<Image
				source={{ uri: img }}
				style={{ width: 300, height: 370 }}
				resizeMode="contain"
			/>
			<View style={styles.detailInfo}>
				<View style={styles.center}>
					<DefaultText
						color={Colors.primary}
						size={24}
						style={{
							fontFamily: 'roboto-bold'
						}}
					>
						{title}
					</DefaultText>
				</View>
				<View style={styles.center}>
					<DefaultText size={20} color={Colors.primary}>
						{year}
					</DefaultText>
				</View>
				<View style={styles.story}>
					<DefaultText size={20} color={Colors.primary}>
						{synopsis}
					</DefaultText>
				</View>
				<DefaultText size={18} color={Colors.primary}>
					IMDB rating: {imdbrating}
				</DefaultText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: 'center'
	},
	viewContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	},
	detailInfo: {
		padding: 10
	},
	center: {
		alignItems: 'center'
	},
	story: {
		paddingVertical: 20
	}
});
