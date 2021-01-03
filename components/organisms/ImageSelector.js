import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { IconButton } from '../../components/atoms/index';
import Colors from '../../constants/Colors';

export const ImageSelector = (props) => {
	const [pickedImage, setPickedImage] = useState();

	const verifyPermissions = async () => {
		const permissionResult = await Permissions.getAsync(
			Permissions.CAMERA,
			Permissions.MEDIA_LIBRARY
		);
		if (permissionResult.status !== 'granted') {
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant camera and foto library permissions to use this app feature.',
				[{ text: 'OK' }]
			);
			return false;
		}
		return true;
	};

	const selectImageHandler = async () => {
		try {
			const hasPermission = await verifyPermissions();
			if (!hasPermission) {
				return;
			}
			const image = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1
			});
			setPickedImage(image.uri);
		} catch (error) {
			Alert.alert('Error:', error.message, [{ text: 'OK' }]);
		}
	};

	const takePhotoHandler = async () => {
		try {
			const hasPermission = await verifyPermissions();
			if (!hasPermission) {
				return;
			}
			const image = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5
			});
			setPickedImage(image.uri);
		} catch (error) {
			Alert.alert('Error:', error.message, [{ text: 'OK' }]);
		}
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Button
						title="Select photo"
						color={Colors.primary}
						onPress={selectImageHandler}
					/>
				) : (
					<Image
						style={styles.image}
						source={{ uri: pickedImage }}
						resizeMode="contain"
					/>
				)}
			</View>
			<View style={styles.imageActions}>
				<IconButton
					before
					iconName="camera"
					iconSize={23}
					btnText="Take photo"
					textSize={20}
					color={Colors.primary}
					onPress={takePhotoHandler}
				/>
				{pickedImage && (
					<IconButton
						before
						iconName="image"
						iconSize={23}
						btnText="Select other"
						textSize={20}
						color={Colors.primary}
						onPress={selectImageHandler}
					/>
				)}
				<IconButton
					before
					disabled={!pickedImage}
					iconName="save"
					iconSize={23}
					btnText="SAVE"
					textSize={20}
					color={Colors.primary}
					onPress={() => {
						props.onSaveAvatar(pickedImage);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center'
	},
	imagePreview: {
		width: 200,
		height: 200,
		borderRadius: 400 / 2,
		borderWidth: 1,
		borderColor: Colors.secondary,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	image: {
		width: 400,
		height: 400
	},
	imageActions: {
		height: '40%',
		flexDirection: 'column',
		justifyContent: 'space-evenly'
	}
});
