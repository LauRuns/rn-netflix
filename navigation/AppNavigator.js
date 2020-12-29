import React from 'react';
// import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { NFAppNavigator, AuthNavigator } from './NetflixNavigation';
import { useAuthentication } from '../shared/hooks/authentication-hook';
// import { StartUpScreen } from '../screens/index';

export const AppNavigator = (props) => {
	const { isAuthenticated } = useAuthentication();
	// const isAuth = useSelector((state) => !!state.auth.token);
	// const tryAutoLogin = useSelector((state) => !!state.auth.tryAutoLogin);
	console.log('isAuthenticated', isAuthenticated);

	return (
		<NavigationContainer>
			{isAuthenticated && <NFAppNavigator />}
			{!isAuthenticated && <AuthNavigator />}
		</NavigationContainer>
	);
};
