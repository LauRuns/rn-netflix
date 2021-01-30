import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

/*
Returns a header which is used on the top section in the various screens.
*/
export const NFHeaderButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Ionicons}
			iconSize={23}
			color={Platform.OS === 'android' ? '#fff' : Colors.primary}
		/>
	);
};
