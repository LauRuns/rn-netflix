import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

/* Hooks and context */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
/* Components */
import { Spinner } from '../../components/molecules/index';
import { NewNFContentList } from '../../components/organisms/index';

import Colors from '../../constants/Colors';
import { DUMMY_ITEMS } from '../../data/DUMMY_DATA';

export const NewContent = (props) => {
	const { countryId } = props.route.params.countryData;

	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [newItems, setNewItems] = useState(0);

	let searchParams = {
		newdate: new Date('2015-01-01'),
		start_year: 2017,
		orderby: 'date',
		limit: 6,
		countrylist: countryId,
		audio: 'english',
		offset: offset,
		end_year: 2020
	};
	const fetchNewContent = async () => {
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'search',
				params: searchParams
			});
			setNewItems(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// fetchNewContent();
		setNewItems(DUMMY_ITEMS); // <-- for development only
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
				spinnerText="Loading new content..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<NewNFContentList
				listData={newItems}
				onNext={onLoadNext}
				onPrevious={onLoadPrevious}
				navData={props.navigation}
			/>
		</View>
	);
};

export const newcontentScreenOptions = (navData) => {
	const { country } = navData.route.params.countryData;
	return {
		headerTitle: `${country} new content`
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
