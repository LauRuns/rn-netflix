import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import {
	NFHeaderButton,
	Header,
	DefaultText
} from '../../components/atoms/index';
import { Spinner } from '../../components/molecules/index';
import { CountryList } from '../../components/organisms/index';
import Colors from '../../constants/Colors';

import { DUMMY_COUNTRYLST } from '../../data/DUMMY_DATA';

export const CountriesScreen = (props) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [loadedCountries, setLoadedCountries] = useState();

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
		// fetchCountries();
		setLoadedCountries(DUMMY_COUNTRYLST);
	}, []);

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	const onShowCountryNewContentHandler = (e) => {
		console.log('onShowCountryNewContentHandler', e);
		props.navigation.navigate('NewContent', { countryData: e });
	};
	const onShowCountryExpContentHandler = (e) => {
		console.log('onShowCountryExpContentHandler', e);
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

	if (!isLoading && !loadedCountries) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: Colors.backgroundDark
				}}
			>
				<DefaultText color={Colors.primary} size={22}>
					...oops! No data available
				</DefaultText>
			</View>
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
						// countries={DUMMY_COUNTRYLST} // <-- development
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
