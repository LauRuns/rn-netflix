import React, { useReducer, useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Platform
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

/*
Checks the input value and returns the state of the input field and value.
*/
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

/*
Returns a input field used in the Login and Signupscreen.
Checks the input values and returns the value or an error is the value is incorrect.
*/
export const AuthInput = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initiallyValid,
		touched: false
	});

	const [visible, setVisible] = useState(false);

	const changeSecureTextEntry = () => {
		setVisible((prevState) => !prevState);
	};

	const { onInputChange, id, secureText } = props;

	useEffect(() => {
		setVisible(secureText);
		if (inputState.touched) {
			onInputChange(id, inputState.value, inputState.isValid);
		}
	}, [inputState, onInputChange, id, secureText]);

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

	/* Checks if the input field has focus */
	const lostFocusHandler = () => {
		dispatch({ type: INPUT_BLUR });
	};

	return (
		<View style={{ ...styles.formControl, ...props.style }}>
			<Text style={{ ...styles.label, ...props.labelStyle }}>
				{props.label}
			</Text>
			<View style={styles.actions}>
				<View style={{ flexDirection: 'row' }}>
					<Ionicons
						name={props.iconName}
						size={24 || props.iconSize}
						color={props.iconColor || Colors.nfWhite}
					/>
					<TextInput
						{...props}
						secureTextEntry={visible ? true : false}
						style={styles.input}
						value={inputState.value}
						onChangeText={textChangeHandler}
						onBlur={lostFocusHandler}
					/>
					{inputState.isValid ? (
						<Ionicons
							name="checkmark-sharp"
							size={24 || props.iconSize}
							color={Colors.succes}
						/>
					) : null}
				</View>
				{props.afterIcon && (
					<TouchableOpacity onPress={changeSecureTextEntry}>
						{visible ? (
							<Ionicons
								name="md-eye-off"
								size={props.iconSize}
								color={Colors.nfWhite}
							/>
						) : (
							<Ionicons
								name="md-eye-outline"
								size={24 || props.iconSize}
								color={Colors.nfWhite}
							/>
						)}
					</TouchableOpacity>
				)}
			</View>
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
		fontSize: 20,
		color: Colors.primary
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.nfWhite,
		paddingBottom: 5
	},
	input: {
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		fontFamily: 'roboto-regular',
		color: Colors.nfWhite,
		fontSize: 20,
		width: '75%'
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
