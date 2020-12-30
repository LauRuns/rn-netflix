import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AsyncStorage from '@react-native-community/async-storage';

/* Hooks and context */
import { useContextUser } from '../../shared/context/user-context';

/* UI elements */
import {
	NFHeaderButton,
	Header,
	DefaultText
} from '../../components/atoms/index';
import { CardToContent } from '../../components/molecules/CardToContent';
import Colors from '../../constants/Colors';

export const LandingScreen = (props) => {
	const [storedCountry, setStoredCountry] = useState(null);
	const { currentUser, countryData } = useContextUser();

	useEffect(() => {
		let getStoredCountry;
		const getData = async () => {
			try {
				getStoredCountry = await AsyncStorage.getItem('countryData');
				getStoredCountry = JSON.parse(getStoredCountry);
				if (getStoredCountry) {
					setStoredCountry(getStoredCountry);
				}
			} catch (error) {
				console.log(error);
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
				/>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('NewContent', {
							countryData: { country: 'Netherlands', countryId: 67 }
						});
					}}
					countryInfo="New content for Netherlands"
				/>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('ExpContent', {
							countryData: countryData
						});
					}}
					countryInfo={`Expiring content for ${countryData.country}`}
				/>
				<CardToContent
					onSelect={() => {
						props.navigation.navigate('ExpContent', {
							countryData: { country: 'Netherlands', countryId: 67 }
						});
					}}
					countryInfo="Expiring content for Netherlands"
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
