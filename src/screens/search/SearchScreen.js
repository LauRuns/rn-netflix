import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
/* UI elements, components, hooks and styling */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { NFHeaderButton, Header } from '../../components/atoms/index';
import { Spinner } from '../../components/molecules/index';
import { SearchForm } from '../../components/organisms/index';
import Colors from '../../constants/Colors';

/* Returns the screen that containes the searchform that allows the user to search Netflix content within a country */
export const SearchScreen = (props) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [loadedCountries, setLoadedCountries] = useState();

	/* Loads all available countries from the API and passes them on to the SearchForm */
	useEffect(() => {
		const fetchCountries = async () => {
			try {
				let countryList = [];
				const response = await fetchNetflixData({
					urlEndpoint: 'countries'
				});
				response.forEach((element) => {
					const newEl = {
						country: element.country.trim(),
						countryId: element.id,
						countrycode: element.countrycode
					};
					countryList.push(newEl);
				});
				setLoadedCountries(countryList);
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};
		fetchCountries();
	}, []);

	/* If the error property is set, a pop-up showing the error message wil be opened */
	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	if (isLoading) {
		return (
			<Spinner
				spinnerText="Loading countrydata..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Search the unongsNG database!" color={Colors.primary} />
			<View style={styles.searchFormContainer}>
				{loadedCountries && (
					<SearchForm
						countryList={loadedCountries}
						navData={props.navigation}
					/>
				)}
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
