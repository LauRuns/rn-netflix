import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback
} from 'react-native';

import { Card } from '../atoms/index';

export const CardToContent = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.OS >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<View style={styles.screen}>
			<Text></Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {}
});
