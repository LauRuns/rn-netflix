import React, { useEffect, useReducer, useCallback } from 'react';
import {
	View,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { CONNECTION_STRING, FORGOT_PWD } from '@env';

/* Hooks & context */
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthState } from '../../shared/context/auth-context';
import { useContextUser } from '../../shared/context/user-context';
import { useFavorites } from '../../shared/context/favorites-context';

/* UI elements */
import { Header, DefaultText } from '../../components/atoms/index';
import { Spinner } from '../../components/molecules/index';
import { AuthInput } from '../../components/organisms/index';
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

export const LoginScreen = ({ navigation }) => {
	const { login } = useAuthState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { setActiveUserHandler } = useContextUser();
	const { loadFavoriteItemsHandler } = useFavorites();

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

	/* Shows an error message when the error state changes */
	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	/*
    Submits the login data (email & password).
    Calls the context in methods and sets the returned data.
    */
	const authSubmitHandler = async () => {
		try {
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

			const { userId, token, user, favorites } = responseData;
			await setActiveUserHandler(user);
			await login(userId, token);
			await loadFavoriteItemsHandler(favorites);
		} catch (error) {
			// Error is handled by the useHttpClient hook
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

	if (isLoading) {
		return (
			<Spinner
				spinnerText="In progress..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header
					title="Login"
					color={Colors.nfWhite}
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
						padding: 0
					}}
					headerStyle={{
						fontFamily: 'roboto-bold',
						fontSize: 35
					}}
				/>
			</View>
			<Animatable.View
				animation="fadeInUpBig"
				style={[
					styles.footer,
					{
						backgroundColor: Colors.backgroundDark60
					}
				]}
			>
				<AuthInput
					id="email"
					label="Email"
					keyboardType="email-address"
					required
					email
					autoCapitalize="none"
					errorText="Please enter a valid email address"
					onInputChange={inputChangeHandler}
					initialValue=""
					iconName="at"
					iconSize={30}
					labelStyle={{ fontFamily: 'roboto-regular', color: Colors.nfWhite }}
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
					labelStyle={{ fontFamily: 'roboto-regular', color: Colors.nfWhite }}
					style={{ marginTop: 20 }}
					secureText={true}
				/>

				<TouchableOpacity
					onPress={() => {
						Linking.openURL(`${FORGOT_PWD}`);
					}}
				>
					<DefaultText style={{ marginTop: 20 }} color={Colors.nfWhite}>
						Forgot password?
					</DefaultText>
				</TouchableOpacity>
				<View style={styles.button}>
					<TouchableOpacity style={styles.signIn} onPress={authSubmitHandler}>
						<LinearGradient
							colors={[Colors.backgroundDark20, Colors.backgroundDark]}
							style={styles.signIn}
						>
							<DefaultText
								color={Colors.nfWhite}
								size={22}
								style={{ fontFamily: 'roboto-bold' }}
							>
								Login
							</DefaultText>
						</LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('Signup')}
						style={[
							styles.signIn,
							{
								marginTop: 15
							}
						]}
					>
						<DefaultText color={Colors.nfWhite} size={22}>
							switch to Sign Up
						</DefaultText>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};
export const loginScreenOptions = {
	headerTitle: 'Login'
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
		flex: 3,
		backgroundColor: '#fff',
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
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		fontFamily: 'roboto-regular',
		fontSize: 20
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14
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
	}
});
