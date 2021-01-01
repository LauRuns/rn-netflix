import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	createDrawerNavigator,
	DrawerItemList
} from '@react-navigation/drawer';

/* Screens */
import {
	LandingScreen,
	landingScreenOptions,
	ItemDetail,
	detailScreenOptions,
	CountriesScreen,
	countriesScreenOptions,
	CountryContentScreen,
	countryContentScreenOptions,
	AccountScreen,
	accountScreenOptions,
	AvatarScreen,
	CountryScreen,
	PasswordScreen,
	UserNameEmailScreen,
	SearchScreen,
	searchScreenOptions,
	SearchResultScreen,
	searchResultScreenOptions,
	AuthScreen,
	authScreenOptions,
	NewContent,
	newcontentScreenOptions,
	ExpContent,
	expcontentScreenOptions
} from '../screens/index';

import { useAuthentication } from '../shared/hooks/authentication-hook';

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
				name="NewContent"
				component={NewContent}
				options={newcontentScreenOptions}
			/>
			<LandingStackNavigator.Screen
				name="ExpContent"
				component={ExpContent}
				options={expcontentScreenOptions}
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
				name="NewContent"
				component={NewContent}
				options={newcontentScreenOptions}
			/>
			<CountriesStackNavigator.Screen
				name="ExpContent"
				component={ExpContent}
				options={expcontentScreenOptions}
			/>
			<CountriesStackNavigator.Screen
				name="ItemDetail"
				component={ItemDetail}
				options={detailScreenOptions}
			/>
		</CountriesStackNavigator.Navigator>
	);
};

const SearchStackNavigator = createStackNavigator();
export const SearchNavigator = () => {
	return (
		<SearchStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<SearchStackNavigator.Screen
				name="Search"
				component={SearchScreen}
				options={searchScreenOptions}
			/>
			<SearchStackNavigator.Screen
				name="SearchResult"
				component={SearchResultScreen}
				options={searchResultScreenOptions}
			/>
			<SearchStackNavigator.Screen
				name="ItemDetail"
				component={ItemDetail}
				options={detailScreenOptions}
			/>
		</SearchStackNavigator.Navigator>
	);
};

const AccountStackNavigator = createStackNavigator();
export const AccountNavigator = () => {
	return (
		<AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AccountStackNavigator.Screen
				name="Account"
				component={AccountScreen}
				options={accountScreenOptions}
			/>
			<AccountStackNavigator.Screen
				name="AccountSettings"
				component={AccountTabNavigator}
			/>
		</AccountStackNavigator.Navigator>
	);
};

const AccountTabsNavigator = createBottomTabNavigator();
export const AccountTabNavigator = () => {
	return (
		<AccountTabsNavigator.Navigator>
			<AccountTabsNavigator.Screen
				name="UsernameEmail"
				component={UserNameEmailScreen}
			/>
			<AccountTabsNavigator.Screen name="Country" component={CountryScreen} />
			<AccountTabsNavigator.Screen name="Avatar" component={AvatarScreen} />
			<AccountTabsNavigator.Screen name="Password" component={PasswordScreen} />
		</AccountTabsNavigator.Navigator>
	);
};

const NFAppDrawerNavigator = createDrawerNavigator();
export const NFAppNavigator = () => {
	const { logout } = useAuthentication();

	return (
		<NFAppDrawerNavigator.Navigator
			drawerContent={(props) => {
				return (
					<View
						style={{
							flex: 1,
							paddingTop: 20,
							backgroundColor: Colors.backgroundDark
						}}
					>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'space-between',
									height: '100%'
								}}
							>
								<View>
									<DrawerItemList {...props} />
								</View>
								<Button
									title="Logout"
									color={Colors.primary}
									onPress={() => logout()}
								/>
							</View>
						</SafeAreaView>
					</View>
				);
			}}
			drawerContentOptions={{
				activeTintColor: Colors.primary,
				inactiveTintColor: Colors.nfWhite
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
						<Ionicons name="compass-outline" size={23} color={props.color} />
					)
				}}
			/>
			<NFAppDrawerNavigator.Screen
				name="Search"
				component={SearchNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons name="search" size={23} color={props.color} />
					)
				}}
			/>
			<NFAppDrawerNavigator.Screen
				name="Account"
				component={AccountNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons name="person-circle" size={23} color={props.color} />
					)
				}}
			/>
		</NFAppDrawerNavigator.Navigator>
	);
};

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.backgroundDark
				},
				headerTitleStyle: {
					fontFamily: 'roboto-bold',
					fontSize: 22
				},
				headerBackTitleStyle: {
					fontFamily: 'roboto-light'
				},
				headerTintColor: Colors.primary
			}}
		>
			<AuthStackNavigator.Screen
				name="Auth"
				component={AuthScreen}
				options={authScreenOptions}
			/>
		</AuthStackNavigator.Navigator>
	);
};
