import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

/* Hooks and context */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
/* Components */
import { Spinner } from '../../components/molecules/index';
import { ExpNFContentList } from '../../components/organisms/index';

import Colors from '../../constants/Colors';
import { COUNTRY_IDS } from '../../data/DUMMY_DATA'; // <-- development

export const ExpContent = (props) => {
	const { countryId } = props.route.params.countryData;
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [idList, setIdList] = useState(null);

	const fetchIds = async () => {
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
		// fetchIds();
		setIdList(COUNTRY_IDS); // <-- for development only
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
