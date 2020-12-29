import React from 'react';
// import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { NFAppNavigator } from './NetflixNavigation';
// import { StartUpScreen } from '../screens/index';

export const AppNavigator = (props) => {
	// const isAuth = useSelector((state) => !!state.auth.token);
	// const tryAutoLogin = useSelector((state) => !!state.auth.tryAutoLogin);

	return (
		<NavigationContainer>
			<NFAppNavigator />
		</NavigationContainer>
	);
};
