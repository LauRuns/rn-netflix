import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerItemList
} from '@react-navigation/drawer';

import {
	LandingScreen,
	landingScreenOptions,
	ItemDetail,
	detailScreenOptions,
	ItemList,
	itemListScreenOptions,
	CountriesScreen,
	countriesScreenOptions,
	CountryContentScreen,
	countryContentScreenOptions
} from '../screens/index';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor:
			Platform.OS === 'android' ? Colors.backgroundDark : Colors.backgroundDark
	},
	headerTitleStyle: {
		fontFamily: 'roboto-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'roboto-light'
	},
	headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary
};

const LandingStackNavigator = createStackNavigator();
export const LandingNavigator = () => {
	return (
		<LandingStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<LandingStackNavigator.Screen
				name="Home"
				component={LandingScreen}
				options={landingScreenOptions}
			/>
			<LandingStackNavigator.Screen
				name="ItemList"
				component={ItemList}
				options={itemListScreenOptions}
			/>
			<LandingStackNavigator.Screen
				name="ItemDetail"
				component={ItemDetail}
				options={detailScreenOptions}
			/>
		</LandingStackNavigator.Navigator>
	);
};

const CountriesStackNavigator = createStackNavigator();
export const CountriesNavigator = () => {
	return (
		<CountriesStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<CountriesStackNavigator.Screen
				name="Countries"
				component={CountriesScreen}
				options={countriesScreenOptions}
			/>
			<CountriesStackNavigator.Screen
				name="CountryContent"
				component={CountryContentScreen}
				options={countryContentScreenOptions}
			/>
			<CountriesStackNavigator.Screen
				name="ItemList"
				component={ItemList}
				options={itemListScreenOptions}
			/>
			<CountriesStackNavigator.Screen
				name="ItemDetail"
				component={ItemDetail}
				options={detailScreenOptions}
			/>
		</CountriesStackNavigator.Navigator>
	);
};

const NFAppDrawerNavigator = createDrawerNavigator();
export const NFAppNavigator = () => {
	const dispatch = useDispatch();
	return (
		<NFAppDrawerNavigator.Navigator
			drawerContent={(props) => {
				return (
					<View style={{ flex: 1, paddingTop: 20 }}>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<DrawerItemList {...props} />
							<Button
								title="Logout"
								color={Colors.primary}
								onPress={() => {}}
							/>
						</SafeAreaView>
					</View>
				);
			}}
			drawerContentOptions={{
				activeTintColor: Colors.primary
			}}
		>
			<NFAppDrawerNavigator.Screen
				name="Home"
				component={LandingNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons name="apps" size={23} color={props.color} />
					)
				}}
			/>
			<NFAppDrawerNavigator.Screen
				name="Countries"
				component={CountriesNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={
								Platform.OS === 'android'
									? 'compass-outline'
									: 'compass-outline'
							}
							size={23}
							color={props.color}
						/>
					)
				}}
			/>
		</NFAppDrawerNavigator.Navigator>
	);
};
