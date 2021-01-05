import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { AuthProvider } from './shared/hooks/authentication-hook';
import { UserProvider } from './shared/context/user-context';
import { FavoritesProvider } from './shared/context/favorites-context';

import { AppNavigator } from './navigation/AppNavigator';

const fetchFonts = () => {
	return Font.loadAsync({
		'roboto-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
		'roboto-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
		'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf')
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
		<AuthProvider>
			<UserProvider>
				<FavoritesProvider>
					<AppNavigator />
				</FavoritesProvider>
			</UserProvider>
		</AuthProvider>
	);
}
