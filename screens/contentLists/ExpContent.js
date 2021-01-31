import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
/* UI elements, components, hooks and styling */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { Spinner } from '../../components/molecules/index';
import { ExpNFContentList } from '../../components/organisms/index';
import Colors from '../../constants/Colors';

/*
Fetches all the expiring content for a specific country for which the country ID is paased in as props on the route.
The list of expiring ID's is passed to the <ExpNFContentList /> which return a list of items.
For each ID a separate call to the API has to be made to fetch it's data. For new content this is easier, because a list of complete items is already returned.
*/
export const ExpContent = (props) => {
	const { countryId } = props.route.params.countryData;
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [idList, setIdList] = useState(null);

	const fetchExpiringContent = async () => {
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'expiring',
				params: {
					countrylist: countryId,
					offset: offset,
					limit: 6
				}
			});
			setIdList(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchExpiringContent();
	}, [offset]);

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	const onLoadNext = () => {
		console.log('onNext');
		setOffset(offset + 6);
	};

	const onLoadPrevious = () => {
		console.log('onPrevious');
		if (offset !== 0) setOffset(offset - 6);
	};

	if (isLoading) {
		return (
			<Spinner
				spinnerText="Loading expiring content..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<ExpNFContentList
				listData={idList}
				onNext={onLoadNext}
				onPrevious={onLoadPrevious}
				navData={props.navigation}
			/>
		</View>
	);
};

export const expcontentScreenOptions = (navData) => {
	const { country } = navData.route.params.countryData;
	return {
		headerTitle: `${country} expiring content`
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
