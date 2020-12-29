import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

/* Hooks and context */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
/* Components */
import { NewNFContentList } from '../../components/organisms/index';

import { DUMMY_ITEMS } from '../../data/DUMMY_DATA';

export const NewContent = (props) => {
	const { country, countryId, countrycode } = props.route.params.countryData;

	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [newItems, setNewItems] = useState(0);

	const onLoadNext = () => {
		console.log('onNext');
	};

	const onLoadPrevious = () => {
		console.log('onPrevious');
	};

	return (
		<View style={styles.screen}>
			<NewNFContentList
				listData={DUMMY_ITEMS}
				onNext={onLoadNext}
				onPrevious={onLoadPrevious}
				navData={props.navigation}
			/>
		</View>
	);
};

export const newcontentScreenOptions = (navData) => {
	return {
		headerTitle: 'New content'
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
