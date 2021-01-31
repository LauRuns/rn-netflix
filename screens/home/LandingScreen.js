import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AsyncStorage from '@react-native-community/async-storage';
/* UI elements, components, hooks and styling */
import { useContextUser } from '../../shared/context/user-context';
import { NFHeaderButton, Header } from '../../components/atoms/index';
import { CardToContent } from '../../components/molecules/CardToContent';
import Colors from '../../constants/Colors';

/*
This is the screen shown when the user logs in or signs up.
It shows the content card for the set country by the user and Default for the Netherlands (because the app is intended for a Dutch audience)
*/
export const LandingScreen = (props) => {
	const [storedCountry, setStoredCountry] = useState(null);
	const { activeUser, countryData } = useContextUser();

	/* Sets country from AynscStorage - this country has been set on sign-up or in the users account settings */
	useEffect(() => {
		let getStoredCountry;
		const getData = async () => {
			getStoredCountry = await AsyncStorage.getItem('countryData');
			getStoredCountry = JSON.parse(getStoredCountry);
			if (getStoredCountry) {
				setStoredCountry(getStoredCountry);
			}
		};
		getData();
		return () => {};
	}, []);

	return (
		<View style={styles.screen}>
			<Header
				color={Colors.nfWhite}
				title={`Welcome!`}
				subHeader={`New & Expiring content for ${countryData.country}`}
			/>

			<ScrollView style={styles.cardContainer}>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('NewContent', {
							countryData: countryData
						});
					}}
					countryInfo={`New content for ${countryData.country}`}
					contentIcon="trending-up"
					iconColor={Colors.succes}
				/>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('NewContent', {
							countryData: { country: 'Netherlands', countryId: 67 }
						});
					}}
					countryInfo="New content for Netherlands"
					contentIcon="trending-up"
					iconColor={Colors.succes}
				/>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('ExpContent', {
							countryData: countryData
						});
					}}
					countryInfo={`Expiring content for ${countryData.country}`}
					contentIcon="trending-down"
					iconColor={Colors.secondary}
				/>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('ExpContent', {
							countryData: { country: 'Netherlands', countryId: 67 }
						});
					}}
					countryInfo="Expiring content for Netherlands"
					contentIcon="trending-down"
					iconColor={Colors.secondary}
				/>
			</ScrollView>
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
		backgroundColor: Colors.backgroundDark
	},
	cardContainer: {
		flex: 1
	}
});
