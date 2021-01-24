import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { ASSET_URL } from '@env';
import { useContextUser } from '../../shared/context/user-context';
import { NFHeaderButton, Header } from '../../components/atoms/index';
import { UserDetails } from '../../components/molecules/index';
import defaultAvatar from '../../assets/default-profile-avatar.png';
import Colors from '../../constants/Colors';

export const AccountScreen = (props) => {
	const { activeUser } = useContextUser();
	console.log(activeUser);

	const onChangeSettings = () => {
		props.navigation.navigate('AccountSettings');
	};

	return (
		<View style={styles.screen}>
			<Header
				title={`Account for ${activeUser.user.userName}`}
				color={Colors.primary}
				subHeader="Change your user settings"
			/>
			<View style={styles.avatarContainer}>
				<Image
					style={styles.avatarStyle}
					source={{ uri: `${ASSET_URL}/${activeUser.user.avatar}` }}
					resizeMode="contain"
				/>
			</View>
			<View style={styles.userDetails}>
				<UserDetails
					email={activeUser.user.email}
					_id={activeUser.user.userId}
					country={
						activeUser.user.country
							? activeUser.user.country.country
							: 'Country data unavailable'
					}
					updatedAt={activeUser.user.updatedAt}
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
