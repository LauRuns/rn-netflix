import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DefaultText } from '../atoms/DefaultText';
import Colors from '../../constants/Colors';

/*
Returns a button with an icon inside it.
By passing the prop 'before' the icon is set in fornt of the button text.
If prop 'before' is not pased, the icon is set after the button text, which is default.
*/
export const IconButton = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.OS >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}

	if (props.before) {
		return (
			<TouchableCmp
				style={{ ...styles.screen, ...props.style }}
				onPress={props.onPress}
				disabled={props.disabled}
			>
				<View style={styles.iconContainer}>
					<Ionicons
						name={props.iconName}
						size={props.iconSize}
						color={
							props.disabled
								? Colors.shadesGray40
								: props.color || Colors.nfWhite
						}
					/>
				</View>
				<DefaultText
					size={props.textSize}
					color={props.disabled ? Colors.shadesGray40 : props.color}
				>
					{props.btnText}
				</DefaultText>
			</TouchableCmp>
		);
	}

	return (
		<TouchableCmp
			style={{ ...styles.screen, ...props.style }}
			onPress={props.onPress}
			disabled={props.disabled}
		>
			<DefaultText size={props.textSize} color={props.color}>
				{props.btnText}
			</DefaultText>
			<View style={styles.iconContainer}>
				<Ionicons
					name={props.iconName}
					size={props.iconSize}
					color={props.color || Colors.nfWhite}
				/>
			</View>
		</TouchableCmp>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconContainer: {
		padding: 10
	}
});
