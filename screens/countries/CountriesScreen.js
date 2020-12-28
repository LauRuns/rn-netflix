import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton } from '../../components/atoms/index';

export const CountriesScreen = (props) => {
	const selectedCountryHandler = () => {
		props.navigation.navigate('CountryContent');
	};
	return (
		<View style={styles.screen}>
			<Text>Countries screen works</Text>
			<Button title="CountryData" onPress={selectedCountryHandler} />
		</View>
	);
};

export const countriesScreenOptions = (navData) => {
	return {
		headerTitle: 'Countries available',
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
