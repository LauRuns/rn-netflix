import React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '../atoms/index';
import Colors from '../../constants/Colors';

export const NavButtons = (props) => {
	return (
		<View style={styles.screen}>
			<IconButton
				onPress={props.onPreviousHandler}
				btnText="Previous"
				textSize={20}
				iconName="arrow-back-circle-outline"
				iconSize={30}
				before
				color={Colors.primary}
			/>

			<IconButton
				onPress={props.onNextHandler}
				btnText="Next"
				textSize={20}
				iconName="arrow-forward-circle-outline"
				iconSize={30}
				color={Colors.primary}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'row',
		height: 100
	}
});
