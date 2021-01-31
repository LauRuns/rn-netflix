import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
/* UI elements, components, hooks and styling */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { NFHeaderButton, Header } from '../../components/atoms/index';
import { Spinner } from '../../components/molecules/index';
import { CountryList } from '../../components/organisms/index';
import Colors from '../../constants/Colors';

/*
Displays a list of all available countries by the API.
Allows navigating to the new or expiring content for the country that the user selects from the list.
*/
export const CountriesScreen = (props) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [loadedCountries, setLoadedCountries] = useState();

	/* Loads all available countries from the API */
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

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	/* Navigates to the new country content */
	const onShowCountryNewContentHandler = (e) => {
		props.navigation.navigate('NewContent', { countryData: e });
	};
	/* Navigates to the expiring country content */
	const onShowCountryExpContentHandler = (e) => {
		props.navigation.navigate('ExpContent', { countryData: e });
	};

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
			{loadedCountries && (
				<Header
					title={`Data for ${loadedCountries.length} countries available`}
					color={Colors.primary}
					subHeader="Select a country to see its new and expiring content"
				/>
			)}
			<View style={styles.listContainer}>
				{loadedCountries && (
					<CountryList
						countries={loadedCountries}
						showCountryNewContent={onShowCountryNewContentHandler}
						showCountryExpContent={onShowCountryExpContentHandler}
					/>
				)}
			</View>
		</View>
	);
};

export const countriesScreenOptions = (navData) => {
	return {
		headerTitle: 'Available country data',
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
		backgroundColor: Colors.backgroundDark,
		width: '100%'
	},
	listContainer: {
		flex: 2,
		width: '100%'
	}
});
