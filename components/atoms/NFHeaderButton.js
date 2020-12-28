import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

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

const styles = StyleSheet.create({
	container: {}
});
