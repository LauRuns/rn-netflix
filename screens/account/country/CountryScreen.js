import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
	StyleSheet,
	View,
	KeyboardAvoidingView,
	ScrollView,
	Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
import { useContextUser } from '../../../shared/context/user-context';
import {
	Header,
	IconButton,
	DefaultText
} from '../../../components/atoms/index';
import { Spinner } from '../../../components/molecules/index';
import Colors from '../../../constants/Colors';

import { DUMMY_COUNTRYLST } from '../../../data/DUMMY_DATA';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues
		};
	}
	return state;
};

export const CountryScreen = (props) => {
	const { isLoading, error, fetchNetflixData } = useNetflixClient();
	const {
		updateUser,
		isUpdating,
		updatingError,
		clearError
	} = useContextUser();
	const [loadedCountries, setLoadedCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const countryDropDownPlaceholder = {
		label: 'Select a country...',
		value: null,
		color: Colors.shadesGray40
	};

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			dropdown: ''
		},
		inputValidities: {
			dropdown: ''
		},
		formIsValid: false
	});

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[dispatchFormState]
	);

	const mapCountries = async (countryData) => {
		let mappedCountries = [];
		countryData.map(({ country, countryId, countrycode }) => {
			return mappedCountries.push({
				label: country,
				value: { country, countryId, countrycode },
				key: countryId
			});
		});
		return mappedCountries;
	};

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
				const dropdownReadyList = await mapCountries(countryList);
				setLoadedCountries(dropdownReadyList);
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};
		// fetchCountries(); // <-- uncomment to detch data and map countries into dropdownlist
	}, []);

	useEffect(() => {
		if (error || updatingError) {
			Alert.alert('Error', error || updatingError, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error, updatingError]);

	const updateUserCountryHandler = async (event) => {
		event.preventDefault();
		updateUser({ country: formState.inputValues.dropdown });
	};

	if (isLoading || isUpdating) {
		return (
			<Spinner
				spinnerText={
					isLoading ? 'Loading countries...' : 'Saving new country...'
				}
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}
	return (
		<View style={styles.screen}>
			<Header
				title="Set country"
				subHeader="Netflix data will be loaded based on your country settings"
				color={Colors.primary}
			/>
			<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
				<ScrollView>
					<View style={styles.picker}>
						{loadedCountries && (
							<RNPickerSelect
								onValueChange={(value) =>
									inputChangeHandler('dropdown', value, value ? true : false)
								}
								placeholder={countryDropDownPlaceholder}
								items={loadedCountries}
								style={{
									...pickerSelectStyles,
									iconContainer: {
										top: 10,
										right: 12
									}
								}}
								Icon={() => {
									return (
										<Ionicons name="md-arrow-down" size={24} color="gray" />
									);
								}}
							/>
						)}
					</View>
					<View>
						{selectedCountry && (
							<DefaultText color={Colors.primary} size={20}>
								Save {selectedCountry} as your country?
							</DefaultText>
						)}
					</View>
					<IconButton
						before
						onPress={updateUserCountryHandler}
						btnText="SAVE"
						textSize={18}
						iconName="md-save"
						color={Colors.primary}
						iconSize={22}
						disabled={!formState.formIsValid}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// alignItems: 'center',
		width: '100%',
		backgroundColor: Colors.backgroundDark
	},
	picker: {
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: Colors.shadesGray40,
		borderRadius: 4,
		color: Colors.nfWhite,
		paddingRight: 30,
		alignItems: 'center'
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30
	}
});
