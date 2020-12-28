import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {
	NFHeaderButton,
	Header,
	DefaultText
} from '../../components/atoms/index';
import { CardToContent } from '../../components/molecules/CardToContent';
import Colors from '../../constants/Colors';

export const LandingScreen = (props) => {
	const selectionHandler = () => {
		props.navigation.navigate('ItemList');
	};

	return (
		<View style={styles.screen}>
			<Header
				color={Colors.nfWhite}
				title="LandingScreen works!"
				subHeader="New &amp; Expiring content"
			/>
			<ScrollView style={styles.cardContainer}>
				<CardToContent onSelect={selectionHandler}>
					<DefaultText size={20}>
						New content for [insert-country-here]
					</DefaultText>
				</CardToContent>
				<CardToContent onSelect={selectionHandler}>
					<DefaultText size={20}>New content for Netherlands</DefaultText>
				</CardToContent>
				<CardToContent onSelect={selectionHandler}>
					<DefaultText size={20}>
						Expiring content for [insert-country-here]
					</DefaultText>
				</CardToContent>
				<CardToContent onSelect={selectionHandler}>
					<DefaultText size={20}>Expiring content for Netherlands</DefaultText>
				</CardToContent>
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
	cardContainer: {}
});
