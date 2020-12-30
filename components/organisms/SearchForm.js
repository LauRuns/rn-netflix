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
			console.log('formReducer____', key, updatedFormIsValid);
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
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			query: '',
			startyear: '',
			endyear: ''
		},
		inputValidities: {
			query: '',
			startyear: '',
			endyear: ''
		},
		formIsValid: false
	});

	const data = [
		{
			label: 'Movie'
		},
		{
			label: 'Serie'
		}
	];

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
		console.log('formstate___:', formState.formIsValid);
		if (!formState.formIsValid) {
			console.log('form is not valid');
		} else {
			console.log(
				formState.inputValues.query,
				formState.inputValues.startyear,
				formState.inputValues.endyear
			);
			console.log('form is valid');
		}
	};

	const selectedBtn = (e) => {
		console.log('selectedBtn', e);
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
						label="Search query"
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
							data={data}
							selectedBtn={(e) => console.log(e)}
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
							selectedBtn={selectedBtn}
						/>
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
		padding: 10
	}
});
