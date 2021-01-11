import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { Card, DefaultText } from '../atoms/index';
import Colors from '../../constants/Colors';

export const CountryCard = (props) => {
	return (
		<Card style={styles.cCard}>
			<DefaultText size={20}>{props.country}</DefaultText>
			<View style={styles.btnContainer}>
				<Button
					title="New"
					color={Colors.accent}
					onPress={props.showNewContent}
				/>
				<Button
					title="Expiring"
					color={Colors.warn}
					onPress={props.showExpContent}
				/>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	cCard: {
		flex: 1,
		padding: 20,
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	btnContainer: {
		flexDirection: 'row',
		width: '50%',
		justifyContent: 'space-between'
	}
});
