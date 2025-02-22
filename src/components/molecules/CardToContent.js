import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card, DefaultText } from '../atoms/index';
import Colors from '../../constants/Colors';

/*
Returns a touchable card that is used on the landing screen after login.
*/
export const CardToContent = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.OS >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}

	return (
		<View style={styles.contentCardContainer}>
			<TouchableCmp style={styles.cardContainer} onPress={props.onSelect}>
				<Card
					style={{
						...styles.card,
						...{ backgroundColor: props.color || Colors.shadesGray40 }
					}}
				>
					<DefaultText size={props.size || 20}>{props.countryInfo}</DefaultText>

					<View style={styles.iconContainer}>
						<Ionicons
							name={props.contentIcon}
							size={30}
							color={props.iconColor}
						/>
					</View>
				</Card>
			</TouchableCmp>
		</View>
	);
};

const styles = StyleSheet.create({
	contentCardContainer: {
		flex: 1,
		margin: 15,
		height: 100,
		borderRadius: 10,
		overflow:
			Platform.OS === 'android' && Platform.Version >= 21
				? 'hidden'
				: 'visible',
		elevation: 3
	},
	cardContainer: {
		flex: 1
	},
	iconContainer: {
		marginLeft: 20
	},
	card: {
		flex: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
