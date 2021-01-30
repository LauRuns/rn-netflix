import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';

import { DefaultText } from '../atoms/index';
/*
Return the users details provided via props. Used on the account screen.
*/
export const UserDetails = (props) => {
	const { email, updatedAt, country, _id } = props;
	return (
		<View style={{ ...styles.screen, ...props.style }}>
			<DefaultText
				color={Colors.primary}
				size={20}
				style={{ marginBottom: 8, fontFamily: 'roboto-bold' }}
			>
				Email:{' '}
				<DefaultText color={Colors.secondary} size={20}>
					{email}
				</DefaultText>
			</DefaultText>
			<DefaultText
				color={Colors.primary}
				size={20}
				style={{ marginBottom: 8, fontFamily: 'roboto-bold' }}
			>
				Set country:{' '}
				<DefaultText color={Colors.secondary} size={20}>
					{country}
				</DefaultText>
			</DefaultText>
			<DefaultText
				color={Colors.primary}
				size={20}
				style={{ marginBottom: 8, fontFamily: 'roboto-bold' }}
			>
				User ID:{' '}
				<DefaultText color={Colors.secondary} size={20}>
					{_id}
				</DefaultText>
			</DefaultText>
			<DefaultText
				color={Colors.primary}
				size={20}
				style={{ marginBottom: 8, fontFamily: 'roboto-bold' }}
			>
				Last changes at:{' '}
				<DefaultText color={Colors.secondary} size={20}>
					{new Date(updatedAt).toDateString()}
				</DefaultText>
			</DefaultText>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'column'
	}
});
