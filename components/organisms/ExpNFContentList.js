import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Alert } from 'react-native';
/* Hooks and context */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
/* UI elements and components */
import { NavButtons, ExpNFItem, Spinner } from '../molecules/index';
import Colors from '../../constants/Colors';

/*
Returns Netflix expiring content presented as a list of images (Netflix item poster images)
*/
export const ExpNFContentList = (props) => {
	const { isLoading, error, clearError } = useNetflixClient();

	/* When the error property is set, a pop-up will be shown with the error message */
	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	if (isLoading) {
		return (
			<Spinner
				spinnerText="Loading content..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<NavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
			<SafeAreaView style={styles.list}>
				<FlatList
					data={props.listData}
					numColumns={2}
					keyExtractor={(item, index) => item.netflixid.toString()}
					renderItem={(itemData) => (
						<ExpNFItem item={itemData.item} navData={props.navData} />
					)}
				/>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.backgroundDark
	},
	list: {
		alignItems: 'center'
	}
});
