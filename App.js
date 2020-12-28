import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

// const rootReducer = combineReducers({});

// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		'roboto-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
		'roboto-light': require('./assets/fonts/RobotoCondensed-Light'),
		'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold')
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
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
