import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

/* Checks input value and returns state for the input field */
const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true
			};
		default:
			return state;
	}
};

/* Returns a input field that handles checking the input value */
export const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initiallyValid,
		touched: false
	});

	const { onInputChange, id } = props;
	/* Returns the input value to the parent component */
	useEffect(() => {
		if (inputState.touched) {
			onInputChange(id, inputState.value, inputState.isValid);
		}
	}, [inputState, onInputChange, id]);

	/* Checks the input value depending on the set props */
	const textChangeHandler = (text) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.max != null && +text > props.max) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}
		dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
	};

	/* Checks if the input field still has focus */
	const lostFocusHandler = () => {
		dispatch({ type: INPUT_BLUR });
	};

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				{...props}
				style={styles.input}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
			/>
			{!inputState.isValid && inputState.touched && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{props.errorText}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		width: '100%'
	},
	label: {
		fontFamily: 'roboto-bold',
		fontSize: 18,
		marginVertical: 12,
		color: Colors.primary
	},
	input: {
		paddingHorizontal: 2,
		paddingHorizontal: 5,
		borderBottomColor: Colors.shadesGray40,
		borderBottomWidth: 1,
		color: Colors.nfWhite,
		fontSize: 16
	},
	errorContainer: {
		marginVertical: 5
	},
	errorText: {
		fontFamily: 'roboto-regular',
		color: Colors.secondary,
		fontSize: 14
	}
});
