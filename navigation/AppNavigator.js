import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { NFAppNavigator, AuthNavigator } from './NetflixNavigation';
import { useAuthentication } from '../shared/hooks/authentication-hook';

export const AppNavigator = (props) => {
	const { isAuthenticated } = useAuthentication();

	return (
		<NavigationContainer>
			{isAuthenticated && <NFAppNavigator />}
			{!isAuthenticated && <AuthNavigator />}
		</NavigationContainer>
	);
};
