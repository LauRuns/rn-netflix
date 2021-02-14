import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { NFAppNavigator, AuthNavigator } from './NetflixNavigation';
import { useAuthState } from '../shared/context/auth-context';

/* Handles setting which navigation stack should be displayed based on the auth status */
export const AppNavigator = () => {
	const { isAuthenticated } = useAuthState();

	return (
		<NavigationContainer>
			{isAuthenticated && <NFAppNavigator />}
			{!isAuthenticated && <AuthNavigator />}
		</NavigationContainer>
	);
};
