import React, { useEffect, useReducer, useCallback } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
	ScrollView,
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { CONNECTION_STRING, TERMS } from '@env';

/* Hooks & context */
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthState } from '../../shared/context/auth-context';
import { useContextUser } from '../../shared/context/user-context';

/* UI elements */
import { DefaultText } from '../../components/atoms/index';
import { Spinner } from '../../components/molecules/index';
import { AuthInput, CountryDropDown } from '../../components/organisms/index';
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

export const SignUpScreen = ({ navigation }) => {
	const { login } = useAuthState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { setActiveUserHandler } = useContextUser();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			country: ''
		},
		inputValidities: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			country: ''
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

	const signupHandler = async () => {
		if (
			formState.inputValues.password !== formState.inputValues.confirmPassword
		) {
			return Alert.alert(
				"Passwords don't match!",
				'Make sure both password fields have the same input.',
				[{ text: 'OK' }]
			);
		}
		try {
			const formData = new FormData();
			formData.append('name', formState.inputValues.name);
			formData.append('country', JSON.stringify(formState.inputValues.country));
			formData.append('email', formState.inputValues.email);
			formData.append('password', formState.inputValues.password);
			const responseData = await sendRequest(
				`${CONNECTION_STRING}/auth/signup`,
				'POST',
				formData
			);
			const { userId, token, user } = responseData;
			await setActiveUserHandler(user);
			await login(userId, token);
		} catch (err) {
			// Error is handled by the useHttpClient hook
		}
	};

	if (isLoading) {
		return (
			<Spinner
				spinnerText="Signing up..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text_header}>Sign Up Now!</Text>
			</View>
			<Animatable.View animation="fadeInUpBig" style={styles.footer}>
				<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
					<ScrollView>
						<AuthInput
							id="name"
							label="Your username"
							keyboardType="default"
							required
							autoCapitalize="none"
							errorText="Please enter a name, min 5 characters"
							minLength={5}
							onInputChange={inputChangeHandler}
							initialValue=""
							iconName="person-outline"
							iconSize={30}
							labelStyle={{
								fontFamily: 'roboto-regular',
								color: Colors.nfWhite
							}}
						/>
						<AuthInput
							id="email"
							label="Email"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							autoCorrect={false}
							errorText="Please enter a valid email address"
							onInputChange={inputChangeHandler}
							initialValue=""
							iconName="at"
							iconSize={30}
							labelStyle={{
								fontFamily: 'roboto-regular',
								color: Colors.nfWhite
							}}
							style={{ marginTop: 20 }}
						/>
						<CountryDropDown
							id="country"
							label="Set your country"
							pickerStyle={picker}
							labelSize={20}
							labelStyle={{ marginTop: 20 }}
							color={Colors.nfWhite}
							onInputChange={inputChangeHandler}
							initiallyValid={false}
						/>
						<AuthInput
							id="password"
							label="Password"
							keyboardType="default"
							required
							autoCapitalize="none"
							errorText="Please enter your password"
							minLength={5}
							onInputChange={inputChangeHandler}
							initialValue=""
							afterIcon
							iconName="md-lock-closed"
							iconSize={30}
							labelStyle={{
								fontFamily: 'roboto-regular',
								color: Colors.nfWhite
							}}
							style={{ marginTop: 20 }}
							secureText={true}
						/>
						<AuthInput
							id="confirmPassword"
							label="Confirm Password"
							keyboardType="default"
							required
							autoCapitalize="none"
							errorText="Please enter confirm your password"
							minLength={5}
							onInputChange={inputChangeHandler}
							initialValue=""
							afterIcon
							iconName="md-lock-closed"
							iconSize={30}
							labelStyle={{
								fontFamily: 'roboto-regular',
								color: Colors.nfWhite
							}}
							style={{ marginTop: 20 }}
							secureText={true}
						/>
						<TouchableOpacity
							onPress={() => {
								Linking.openURL(`${TERMS}`);
							}} // -> redirect to terms and conditions page section
						>
							<View style={styles.textPrivate}>
								<DefaultText color={Colors.shadesGray20}>
									By signing up you agree to our
								</DefaultText>
								<DefaultText
									color={Colors.shadesGray20}
									style={{ fontFamily: 'roboto-bold' }}
								>
									{' '}
									Terms of service
								</DefaultText>
								<DefaultText color={Colors.shadesGray20}> and</DefaultText>
								<DefaultText
									color={Colors.shadesGray20}
									style={{ fontFamily: 'roboto-bold' }}
								>
									{' '}
									Privacy policy
								</DefaultText>
							</View>
						</TouchableOpacity>
						<View style={styles.button}>
							<TouchableOpacity style={styles.signIn} onPress={signupHandler}>
								<LinearGradient
									colors={[Colors.backgroundDark20, Colors.backgroundDark]}
									style={styles.signIn}
								>
									<DefaultText
										color={Colors.nfWhite}
										size={22}
										style={{ fontFamily: 'roboto-bold' }}
									>
										Sign Up
									</DefaultText>
								</LinearGradient>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => navigation.goBack()}
								style={[
									styles.signIn,
									{
										marginTop: 15
									}
								]}
							>
								<DefaultText color={Colors.nfWhite} size={22}>
									switch to Login
								</DefaultText>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Animatable.View>
		</View>
	);
};

export const signupScreenOptions = {
	headerTitle: 'Sign up'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.backgroundDark
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 50
	},
	footer: {
		backgroundColor: Colors.backgroundDark60,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	text_header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30
	},
	text_footer: {
		color: '#05375a',
		fontSize: 18
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a'
	},
	button: {
		alignItems: 'center',
		marginTop: 50
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20
	},
	color_textPrivate: {
		color: 'grey'
	}
});

const picker = StyleSheet.create({
	inputIOS: {
		fontSize: 20,
		paddingVertical: 12,
		color: Colors.nfWhite,
		paddingRight: 30,
		alignItems: 'center',
		fontFamily: 'roboto-regular'
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30,
		alignItems: 'center'
	}
});
