import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

/* Context */
import { AuthContextProvider } from './src/shared/context/auth-context';
import { UserContextProvider } from './src/shared/context/user-context';
import { FavoritesContextProvider } from './src/shared/context/favorites-context';

/* App navigation stacks */
// import { AppNavigator } from '.src/navigation/AppNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';

/* Sets fonts for app */
const fetchFonts = () => {
	return Font.loadAsync({
		'roboto-regular': require('./src/assets/fonts/RobotoCondensed-Regular.ttf'),
		'roboto-light': require('./src/assets/fonts/RobotoCondensed-Light.ttf'),
		'roboto-bold': require('./src/assets/fonts/RobotoCondensed-Bold.ttf')
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<AuthContextProvider>
			<UserContextProvider>
				<FavoritesContextProvider>
					<AppNavigator />
				</FavoritesContextProvider>
			</UserContextProvider>
		</AuthContextProvider>
	);
}
