import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { NFAppNavigator, AuthNavigator } from './NetflixNavigation';
import { useAuthState } from '../shared/context/auth-context';

export const AppNavigator = () => {
	const { isAuthenticated } = useAuthState();

	return (
		<NavigationContainer>
			{isAuthenticated && <NFAppNavigator />}
			{!isAuthenticated && <AuthNavigator />}
		</NavigationContainer>
	);
};
