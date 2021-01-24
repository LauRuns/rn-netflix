import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { useContextUser } from '../../../shared/context/user-context';
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

export const UserNameEmailScreen = (props) => {
	const {
		activeUser,
		updateUserHandler,
		isUpdating,
		updatingError,
		clearError
	} = useContextUser();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: activeUser.user.email,
			username: activeUser.user.userName
		},
		inputValidities: {
			email: true,
			username: true
		},
		formIsValid: true
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

	const submitHandler = async (event) => {
		event.preventDefault();
		const newValues = {
			username: formState.inputValues.username,
			email: formState.inputValues.email
		};
		await updateUserHandler(newValues);
		props.navigation.goBack();
	};

	if (isUpdating) {
		return (
			<Spinner
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerText="Saving..."
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Update username and email" color={Colors.primary} />
			<View style={styles.form}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Input
						id="email"
						label="Email"
						keyboardType="email-address"
						required
						email
						autoCapitalize="none"
						onInputChange={inputChangeHandler}
						errorText="Please enter a valid email address"
						initialValue={activeUser.user.email}
						initiallyValid={true}
					/>
					<Input
						id="username"
						label="Name"
						keyboardType="default"
						required
						autoCapitalize="none"
						errorText="Please enter a valid username, min 5 characters"
						minLength={5}
						onInputChange={inputChangeHandler}
						initialValue={activeUser.user.userName}
						initiallyValid={true}
					/>
					<View style={styles.formAction}>
						<IconButton
							before
							iconName="md-save-outline"
							iconSize={20}
							color={Colors.primary}
							btnText="SAVE"
							textSize={20}
							disabled={!formState.formIsValid}
							onPress={submitHandler}
							style={{ width: '40%' }}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export const emailnameScreenOptions = (navData) => {
	return {
		headerTitle: 'Account settings',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Save"
					iconName="checkmark-outline"
					onPress={() => {
						// navData.navigation.toggleDrawer();
						console.log('save new username and email');
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.backgroundDark,
		padding: 10
	},
	form: {
		height: '50%',
		width: '100%'
	},
	contentContainer: {},
	formAction: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
