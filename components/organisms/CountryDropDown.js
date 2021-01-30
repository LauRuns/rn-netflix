import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { useNetflixClient } from '../../shared/hooks/netflix-hook';

import { DefaultText } from '../atoms/index';
import { Spinner } from '../molecules/index';
import Colors from '../../constants/Colors';

export const CountryDropDown = (props) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [loadedCountries, setLoadedCountries] = useState();
	const [inputState, setInputState] = useState({
		value: null,
		isValid: props.initiallyValid
	});

	/* Corrects the list of returned countries - maps the countries to a object to be used in the <RNPickerSelect /> */
	const mapCountries = (list) => {
		let mappedCountries = [];
		list.map(({ country, countryId }) => {
			return mappedCountries.push({
				label: country,
				value: { country, countryId },
				key: countryId
			});
		});
		return setLoadedCountries(mappedCountries);
	};

	/* Fetches the countries used in the country dropdown list - return a up to date list of available countries */
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
				mapCountries(countryList);
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};
		fetchCountries();
	}, []);

	const countryDropDownPlaceholder = {
		label: 'Select a country...',
		value: null,
		color: Colors.shadesGray40
	};

	const { onInputChange, id } = props;
	/* Passes the input value to the parent component when changed */
	useEffect(() => {
		if (inputState.value) {
			onInputChange(id, inputState.value, inputState.isValid);
		}
	}, [inputState, onInputChange, id]);

	/* Show error when the error property is set */
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
				spinnerText="Loading..."
				spinnerSize="small"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<DefaultText
				color={props.color}
				size={props.labelSize}
				style={props.labelStyle}
			>
				{props.label}
			</DefaultText>
			<View style={styles.picker}>
				{loadedCountries && (
					<RNPickerSelect
						onValueChange={(value) =>
							setInputState({
								value: value,
								isValid: true
							})
						}
						placeholder={countryDropDownPlaceholder}
						items={loadedCountries}
						style={{
							...pickerSelectStyles,
							...props.pickerStyle,
							iconContainer: {
								top: 10,
								right: 5
							}
						}}
						Icon={() => {
							return (
								<Ionicons
									name="md-arrow-down"
									size={24}
									color={props.color || Colors.shadesGray40}
								/>
							);
						}}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: Colors.nfWhite
	},
	picker: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	pickerContainer: {
		flexDirection: 'row',
		width: '100%'
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
