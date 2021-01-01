import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { ASSET_URL } from '@env';
import { useContextUser } from '../../shared/context/user-context';
import { NFHeaderButton, Header } from '../../components/atoms/index';
import { UserDetails } from '../../components/molecules/index';
import Colors from '../../constants/Colors';

export const AccountScreen = (props) => {
	const { currentUser } = useContextUser();
	console.log(currentUser);

	const onChangeSettings = () => {
		props.navigation.navigate('AccountSettings');
	};

	return (
		<View style={styles.screen}>
			<Header
				title={`Account for ${currentUser.name}`}
				color={Colors.primary}
				subHeader="Change your user settings"
			/>
			<View style={styles.avatarContainer}>
				<Image
					style={styles.avatarStyle}
					source={{ uri: `${ASSET_URL}/${currentUser.image}` }}
					resizeMode="contain"
				/>
			</View>
			<View style={styles.userDetails}>
				<UserDetails
					email={currentUser.email}
					_id={currentUser._id}
					country={currentUser.country.country}
					updatedAt={currentUser.updatedAt}
					style={{
						height: '20%',
						padding: 10
					}}
				/>
			</View>
		</View>
	);
};

export const accountScreenOptions = (navData) => {
	return {
		headerTitle: 'Account',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={NFHeaderButton}>
				<Item
					title="Change"
					iconName="create-outline"
					onPress={() => navData.navigation.navigate('AccountSettings')}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	},
	userDetails: {
		height: '40%',
		marginTop: 20
	},
	avatarContainer: {
		width: 200,
		height: 200,
		borderRadius: 400 / 2,
		backgroundColor: 'green',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	avatarStyle: {
		width: 400,
		height: 400
	}
});
