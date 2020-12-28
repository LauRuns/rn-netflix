import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton } from '../../components/atoms/index';

export const AccountScreen = (props) => {
	const onChangeSettings = () => {
		props.navigation.navigate('AccountSettings');
	};

	return (
		<View style={styles.screen}>
			<Text>Account screen works</Text>
			<Button title="Change settings" onPress={onChangeSettings} />
		</View>
	);
};

export const accountScreenOptions = (navData) => {
	return {
		headerTitle: 'Account',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
