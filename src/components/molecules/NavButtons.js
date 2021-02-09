import React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '../atoms/index';
import Colors from '../../constants/Colors';

/*
Returns two navigation buttons used in the new and expiring Netflix content screens. OnPress will load the next or previous set of items.
The onPress events are returned to the parent component.
*/
export const NavButtons = (props) => {
	return (
		<View style={styles.screen}>
			<IconButton
				onPress={props.onPrevious}
				btnText="Previous"
				textSize={20}
				iconName="arrow-back-circle-outline"
				iconSize={30}
				before
				color={Colors.primary}
			/>

			<IconButton
				onPress={props.onNext}
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
		justifyContent: 'center'
	}
});
