import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NFHeaderButton, Header } from '../../components/atoms/index';
import { SearchForm } from '../../components/organisms/index';
import Colors from '../../constants/Colors';

export const SearchScreen = (props) => {
	const showResults = () => {
		props.navigation.navigate('SearchResult');
	};

	return (
		<View style={styles.screen}>
			<Header title="Search the unongsNG database!" color={Colors.primary} />
			<View style={styles.searchFormContainer}>
				<SearchForm />
			</View>
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
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	},
	searchFormContainer: {
		flex: 2,
		width: '100%',
		padding: 20
	}
});
