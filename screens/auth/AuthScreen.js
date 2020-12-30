import React, {
	useState,
	useEffect,
	useReducer,
	useCallback,
	useContext
} from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Button,
	KeyboardAvoidingView,
	ActivityIndicator,
	Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CONNECTION_STRING } from '@env';

/* Hooks & context */
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';
import { UserContext } from '../../shared/context/user-context';

/* UI elements */
import { Card } from '../../components/atoms/index';
import { Input } from '../../components/organisms/index';
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

export const AuthScreen = (props) => {
	const { login } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { setNewCurrentUser } = useContext(UserContext);

	const [isLoginMode, setIsLoginMode] = useState(true);

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: ''
		},
		inputValidities: {
			email: '',
			password: ''
		},
		formIsValid: false
	});

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	const authSubmitHandler = async () => {
		if (isLoginMode) {
			try {
				// console.log(
				// 	formState.inputValues.email,
				// 	formState.inputValues.password
				// );
				const responseData = await sendRequest(
					`${CONNECTION_STRING}/users/login`,
					'POST',
					JSON.stringify({
						email: formState.inputValues.email,
						password: formState.inputValues.password
					}),
					{
						'Content-Type': 'application/json'
					}
				);

				const { userId, token, user } = responseData;
				// console.log(responseData);
				await setNewCurrentUser(user);
				await login(userId, token);
			} catch (error) {
				// Error is handled by the useHttpClient hook
				console.log(error);
			}
		} else {
			// action = authActions.signup(
			// 	formState.inputValues.email,
			// 	formState.inputValues.password
			// );
		}
	};

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

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<LinearGradient
				colors={[Colors.backgroundDark, Colors.nfRed]}
				style={styles.gradient}
			>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input
							id="email"
							label="Email"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter a valid email address"
							onInputChange={inputChangeHandler}
							initialValue=""
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							required
							autoCapitalize="none"
							errorText="Please enter your password"
							minLength={5}
							onInputChange={inputChangeHandler}
							initialValue=""
						/>

						<View style={styles.buttonContainer}>
							{isLoading ? (
								<ActivityIndicator size="small" color={Colors.primary} />
							) : (
								<Button
									title={isLoginMode ? 'Login' : 'Sign Up'}
									color={Colors.primary}
									onPress={authSubmitHandler}
								/>
							)}
							<Button
								title={isLoginMode ? 'switch to Sign Up' : 'switch to Login'}
								color={Colors.accent}
								onPress={() => {
									setIsLoginMode((prevMode) => !prevMode);
								}}
							/>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

export const authScreenOptions = {
	headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
		backgroundColor: Colors.backgroundDark
	},
	buttonContainer: {
		marginTop: 10
	}
});
