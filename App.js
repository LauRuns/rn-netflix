import React, { useState } from 'react';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import ReduxThunk from 'redux-thunk';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { AuthProvider } from './shared/hooks/authentication-hook';
import { UserProvider } from './shared/context/user-context';

import { AppNavigator } from './navigation/AppNavigator';
// import { nfItemsReducer } from './store/reducers/nf-landing-data';

// const rootReducer = combineReducers({
// 	nfItems: nfItemsReducer
// });

// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
				<AppNavigator />
			</UserProvider>
		</AuthProvider>
		// <Provider store={store}>
		// </Provider>
	);
}
