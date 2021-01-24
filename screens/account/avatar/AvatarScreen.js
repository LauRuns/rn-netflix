import React, { useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
/* Context */
import { useContextUser } from '../../../shared/context/user-context';
/* UI elements and components */
import { Header } from '../../../components/atoms/index';
import { Spinner } from '../../../components/molecules/index';
import { ImageSelector } from '../../../components/organisms/index';
/* Styling */
import Colors from '../../../constants/Colors';

/* Allows for updating the users image */
export const AvatarScreen = (props) => {
	const {
		updateUserImgHandler,
		isUpdating,
		updatingError,
		clearError
	} = useContextUser();

	const updateAvatarHandler = async (newAvatar) => {
		const splitImage = newAvatar.split('ImagePicker/')[1];
		const formData = new FormData();
		formData.append('image', {
			uri: newAvatar,
			type: 'image/jpeg',
			name: splitImage
		});
		await updateUserImgHandler(formData);
		props.navigation.navigate('Account');
	};

	useEffect(() => {
		if (updatingError) {
			Alert.alert('Error', updatingError, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [updatingError]);

	if (isUpdating) {
		return (
			<Spinner
				spinnerText="Updating your avatar..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			{isUpdating && <Text>loading</Text>}
			<Header
				title="Set profile avatar"
				color={Colors.primary}
				subHeader="Select or take a photo"
			/>
			<ImageSelector onSaveAvatar={updateAvatarHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	}
});
