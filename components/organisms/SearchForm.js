import React, {
	useState,
	useEffect,
	useReducer,
	useCallback,
	useContext
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	ScrollView,
	Alert,
	Button
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import { IconButton } from '../atoms/index';
import { Input } from '../organisms/Input';
import Colors from '../../constants/Colors';

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

export const SearchForm = (props) => {
	const [countries, setCountries] = useState([]);
	const { countryList } = props;

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			query: '',
			startyear: '',
			endyear: '',
			radio: '',
			dropdown: ''
		},
		inputValidities: {
			query: '',
			startyear: '',
			endyear: '',
			radio: '',
			dropdown: ''
		},
		formIsValid: false
	});

	const contentType = [
		{
			label: 'Movie'
		},
		{
			label: 'Serie'
		}
	];

	const countryDropDownPlaceholder = {
		label: 'Select a country...',
		value: null,
		color: Colors.shadesGray40
	};

	const mapCountries = () => {
		let mappedCountries = [];
		countryList.map(({ country, countryId }) => {
			return mappedCountries.push({
				label: country,
				value: countryId,
				key: countryId
			});
		});
		return setCountries(mappedCountries);
	};

	useEffect(() => {
		mapCountries();
	}, [countryList]);

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

	const submitFormHandler = () => {
		if (!formState.formIsValid) {
			console.log('form is not valid');
			Alert.alert('Form is not valid', [{ text: 'OK' }]);
		} else {
			console.log(
				'form is valid',
				formState.inputValues.query,
				formState.inputValues.startyear,
				formState.inputValues.endyear,
				formState.inputValues.radio,
				formState.inputValues.dropdown
			);
			props.navData.navigate('SearchResult', {
				queryParams: {
					query: formState.inputValues.query,
					startyear: formState.inputValues.startyear,
					endyear: formState.inputValues.endyear,
					contentType: formState.inputValues.radio,
					countryId: formState.inputValues.dropdown
				}
			});
		}
	};

	return (
		<View style={styles.screen}>
			<KeyboardAvoidingView
				behavior="padding"
				keyboardVerticalOffset={50}
				style={styles.screen}
			>
				<ScrollView>
					<Input
						id="query"
						label="Enter search query"
						keyboardType="default"
						required
						autoCapitalize="none"
						errorText="Please enter a search query"
						onInputChange={inputChangeHandler}
						initialValue=""
						returnKeyType="next"
					/>
					<Input
						id="startyear"
						label="Start year"
						keyboardType="decimal-pad"
						required
						errorText="Please enter a valid year"
						onInputChange={inputChangeHandler}
						min={1980}
						max={2019}
						initialValue=""
						returnKeyType="next"
					/>
					<Input
						id="endyear"
						label="End year"
						keyboardType="decimal-pad"
						required
						errorText="Please enter a valid year"
						onInputChange={inputChangeHandler}
						min={1981}
						max={2020}
						initialValue=""
						returnKeyType="next"
					/>
					<View style={styles.radionBtnGrp}>
						<RadioButtonRN
							data={contentType}
							selectedBtn={(e) =>
								inputChangeHandler('radio', e.label.toLowerCase(), true)
							}
							icon={
								<Ionicons
									name="checkmark-circle"
									size={25}
									color={Colors.primary}
								/>
							}
							activeColor={Colors.primary}
							textColor={Colors.primary}
							box={false}
							textStyle={{ fontSize: 18 }}
							initial={1}
						/>
					</View>
					<View style={styles.picker}>
						{countries && (
							<RNPickerSelect
								onValueChange={(value) =>
									inputChangeHandler('dropdown', value, value ? true : false)
								}
								placeholder={countryDropDownPlaceholder}
								items={countries}
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
					<IconButton
						before
						onPress={submitFormHandler}
						btnText="Search"
						textSize={18}
						iconName="search"
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
		width: '100%'
	},
	radionBtnGrp: {
		padding: 10,
		marginTop: 20
	},
	picker: {
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center'
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
		paddingRight: 30, // to ensure the text is never behind the icon
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
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});
