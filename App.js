import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

/* Context */
import { AuthContextProvider } from './shared/context/auth-context';
import { UserContextProvider } from './shared/context/user-context';
import { FavoritesContextProvider } from './shared/context/favorites-context';

/* App navigation stacks */
import { AppNavigator } from './navigation/AppNavigator';

/* Sets fonts for app */
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
		<AuthContextProvider>
			<UserContextProvider>
				<FavoritesContextProvider>
					<AppNavigator />
				</FavoritesContextProvider>
			</UserContextProvider>
		</AuthContextProvider>
	);
}
