import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { DefaultText } from '../components/atoms/index';
import Colors from '../constants/Colors';

export const SplashScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Animatable.Image
					animation="bounceIn"
					duraton="1500"
					source={require('../assets/netflix_hexagon.png')}
					style={styles.logo}
					resizeMode="stretch"
				/>
			</View>
			<Animatable.View
				style={[
					styles.footer,
					{
						backgroundColor: Colors.backgroundDark60
					}
				]}
				animation="fadeInUpBig"
			>
				<DefaultText size={30}>
					Find and save your favorite Netflix content!
				</DefaultText>
				<DefaultText
					style={{ marginTop: 5 }}
					size={16}
					color={Colors.shadesGray20}
				>
					Sign up or login
				</DefaultText>
				<View style={styles.button}>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<LinearGradient
							colors={[Colors.backgroundDark20, Colors.backgroundDark]}
							style={styles.signIn}
						>
							<DefaultText size={22}>Get Started</DefaultText>
							<Ionicons name="arrow-forward" size={30} color={Colors.nfWhite} />
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};

export const splashScreenOptions = {
	headerTitle: 'Welcome!'
};

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.backgroundDark
	},
	header: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		flex: 1,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingVertical: 50,
		paddingHorizontal: 30
	},
	logo: {
		width: height_logo,
		height: height_logo
	},
	button: {
		alignItems: 'flex-end',
		marginTop: 30
	},
	signIn: {
		width: 200,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40 / 2,
		flexDirection: 'row'
	}
});
