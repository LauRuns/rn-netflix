import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton } from '../../components/atoms/index';
import Colors from '../../constants/Colors';

export const LandingScreen = (props) => {
	const selectItemHandler = () => {
		props.navigation.navigate('ItemList');
	};

	return (
		<View style={styles.screen}>
			<Text>Landing screen works!</Text>
			<Button title="ItemList" onPress={selectItemHandler} />
		</View>
	);
};

export const landingScreenOptions = (navData) => {
	return {
		headerTitle: 'New & Exp. data',
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
