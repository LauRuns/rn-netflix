import React, { useEffect, useReducer, useCallback } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Alert
} from 'react-native';
import { CONNECTION_STRING } from '@env';

/* Hooks and context */
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useContextUser } from '../../../shared/context/user-context';
import { useAuthState } from '../../../shared/context/auth-context';

/* Components */
import { Header, IconButton } from '../../../components/atoms/index';
import { Spinner } from '../../../components/molecules/index';
import { Input } from '../../../components/organisms/index';
import Colors from '../../../constants/Colors';

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

export const PasswordScreen = (props) => {
	const { activeUser } = useContextUser();
	const { token, userId } = useAuthState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		inputValidities: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
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

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	const updatePasswordHandler = async () => {
		// event.preventDefault();

		if (
			formState.inputValues.newPassword !==
			formState.inputValues.confirmPassword
		) {
			formState.isValid = false;
			return Alert.alert(
				'...oops!',
				'The new and confirm password do not match...',
				[{ text: 'OK', onPress: () => clearError() }]
			);
		}
		console.log(formState.inputValues.newPassword);

		try {
			const responseData = await sendRequest(
				`${CONNECTION_STRING}/auth/update/${userId}`,
				'PATCH',
				JSON.stringify({
					email: activeUser.user.email,
					oldPassword: formState.inputValues.currentPassword,
					newPassword: formState.inputValues.newPassword,
					confirmNewPassword: formState.inputValues.confirmPassword
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			if (responseData) {
				Alert.alert('Succes!', responseData.message, [{ text: 'OK' }]);
				props.navigation.navigate('Account');
			}
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	if (isLoading) {
		return (
			<Spinner
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerText="Saving new password..."
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<Header
				title="Update password"
				subHeader="Set a new password, minimum length of 5 characters"
				color={Colors.primary}
			/>
			<View style={styles.pwdForm}>
				<ScrollView contentContainerStyle={styles.formContainer}>
					<Input
						id="currentPassword"
						label="Current password"
						keyboardType="default"
						required
						secureTextEntry
						autoCapitalize="none"
						onInputChange={inputChangeHandler}
						errorText="Enter your current password"
						initiallyValid={false}
						minLength={5}
					/>
					<Input
						id="newPassword"
						label="New password"
						keyboardType="default"
						required
						secureTextEntry
						autoCapitalize="none"
						onInputChange={inputChangeHandler}
						errorText="Enter your new password, min 5"
						initiallyValid={false}
						minLength={5}
					/>
					<Input
						id="confirmPassword"
						label="Confirm new password"
						keyboardType="default"
						required
						secureTextEntry
						autoCapitalize="none"
						onInputChange={inputChangeHandler}
						errorText="Confirm your new password, min 5"
						initiallyValid={false}
						minLength={5}
					/>
					<IconButton
						before
						iconName="save"
						iconSize={23}
						color={Colors.primary}
						btnText="SAVE"
						textSize={20}
						disabled={!formState.formIsValid}
						onPress={updatePasswordHandler}
					/>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	},
	pwdForm: {
		width: '100%',
		padding: 20
	},
	formContainer: {}
});
