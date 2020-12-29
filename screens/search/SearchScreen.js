import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton } from '../../components/atoms/index';

export const SearchScreen = (props) => {
	const showResults = () => {
		props.navigation.navigate('SearchResult');
	};

	return (
		<View style={styles.screen}>
			<Text>SearchScreen works</Text>
			<Button title="Results" onPress={showResults} />
		</View>
	);
};

export const searchScreenOptions = (navData) => {
	return {
		headerTitle: 'Search',
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
